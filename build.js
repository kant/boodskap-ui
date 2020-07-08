const async = require('async');
const PropertiesReader = require('properties-reader');
const fs = require('fs');
const replace = require('replace-in-file');
const lineReplace = require('line-replace')
;

var prop=null;
try {
    prop = PropertiesReader(process.env.HOME + '/config/boodskapui.properties');
    console.log('* Fetching from config file => '+process.env.HOME + '/config/boodskapui.properties')
}
catch(e){
    prop = PropertiesReader('boodskapui.properties');
    console.log('* Fetching from default config file => boodskapui.properties')
}

//Get the property value
getProperty = (pty) => {
    return prop.get(pty);
}

var args = process.argv.slice(2);
var PORT_NO = args[0] ? args[0] : null;
var BASE_PATH =  args[1] ? args[1] : (getProperty('server.basepath') ? getProperty('server.basepath') : '')

console.log("***************************************" +
    "\nBoodskap IoT Platform\n" +
    "***************************************")
async.series({
    'serverConfig': function (scbk) {

        /****************************
         1] Configuring Server Properties
         ****************************/

        let server_config = {
            web: {
                port: PORT_NO ? PORT_NO : Number(getProperty('server.port'))
            },
            basepath : BASE_PATH,
        };

        let txt = 'module.exports = ' + JSON.stringify(server_config);
        fs.writeFile('conf.js', txt, (err) => {
            if (err) {
                console.error('Error in configuring server properties')
                scbk(null, null);
            } else {
                console.error('1] Setting server properties success')
                scbk(null, null);
            }
        });

    },
    'webConfig': function (wcbk) {

        /****************************
         2] Configuring Web Properties
         ****************************/

        let platform_config = {
            web: getProperty('web.domain'),
            basepath : BASE_PATH,
            api: getProperty('boodskap.api'),
            development : getProperty("env.development"),
            debug : getProperty("web.debug"),
            mqtt: {
                hostName: getProperty('mqtt.host'),
                portNo: Number(getProperty('mqtt.port')),
                ssl: getProperty('mqtt.ssl')
            },
            googleAnalytics: getProperty('google.analytics.id') ? getProperty('google.analytics.id') : '',
            cdnPath: getProperty('boodskap.cdnPath'),
        }

        let txt = 'var CONFIG=' + JSON.stringify(platform_config);
        fs.writeFile('./webapps/platform-config.js', txt, (err) => {
            if (err) {
                console.error('Error in configuring web properties')
                wcbk(null, null);
            } else {
                console.error('2] Setting web properties success')
                wcbk(null, null);
            }
        });

    },
    swagger : function (sbk) {

        var protocol = getProperty('mqtt.ssl') ? 'https' : 'http';

        lineReplace({
            file: './yaml/api.yml',
            line: 4,
            text: '  - '+protocol,
            addNewLine: true,
            callback: ({file, line, text, replacedText}) => {
                console.error('3] Setting protocol in the swagger api.yml')

                sbk(null,null)
            }
        })


    }
}, function (err, result) {
    console.log(new Date() + ' | Boodskap UI Build Success');
    console.log('Now execute > npm start');
})



