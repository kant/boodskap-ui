# How to start the Boodskap IoT Platform UI?

### Getting Started
This plugin requires node `>= 6.0.0` and npm `>= 1.4.15` (latest stable is recommended).

```shell
> git clone https://github.com/BoodskapPlatform/boodskap-base-template 
```

Once the repository has been cloned:
```shell
> cd boodskap-ui
```

### NPM Module Installation

```shell
> npm install
```

## Configuration

### Properties
In `boodskap.properties` file,
```shell
#default property

[server]
port=4201

[boodskap]
api=https://api.boodskap.io
cdnPath=https://cdn.jsdelivr.net/gh/BoodskapPlatform/cdn

[mqtt]
host=gw.boodskap.io
port=443
ssl=true

[web]
domain=https://platform.boodskap.io
debug=true
version=2.0.5

[branding]
logo=/images/boodskap-logo.png
loginLogo=/images/bdskap-logo.png
poweredBy=/images/powered-by-boodskap.png

[google]
analytics.id=

[fitbit]
clientId=
clientSecret=
callbackUrl=https://platform.boodskap.io/callback/thirdparty/fitbit
```
To change the UI port, update the server property

#### Note
If you are downloading the platform (or) running in our own dedicated server.You may have to change the `boodskap` and `mqtt` property

### Build Properties
Once all the changes done in property file. Execute a command
```shell
> npm run-script build
```
or
```shell
> node build.js
```
#### Output

```shell
***************************************
Boodskap IoT Platform
***************************************
1] Setting server properties success
2] Setting web properties success
Thu Jan 10 2019 14:09:22 GMT+0530 (IST) | Boodskap UI Build Success
Now execute > npm start
```

### How to start the UI node server?

```shell
> npm start
```
or
```shell
> node server.js
```
#### Output

```shell
************************************************************************************
Thu Jan 10 2019 14:11:51 GMT+0530 (IST) | Boodskap IoT Platform UI Listening on 4201
************************************************************************************
```
Open the Brower with this URL: http://0.0.0.0:4201
