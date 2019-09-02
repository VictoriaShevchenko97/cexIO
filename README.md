Task for CEX.IO
=============================

INSTALLATION
------------
For caching of information you need redis server.
For Windows - https://github.com/rgl/redis/downloads
Before start server - run redis server


CONFIGURATION
------------
Redis must be running on port 6379
All configuration info in config file in root of project and called config.json


QUICK START
-----------

node start.js
(Waiting for "Done" message)

If you will get mistakes, jump to 2 folders (server, client) and follow this step:

```
npm install
npm run build
```

Run this module with command "node <module>"

EXPLOITATION
-----------
![EXPLOITATION](https://github.com/VictoriaShevchenko97/cexIO/blob/master/exploitation.gif)



TREE OF PROJECT
-----------
```
├───client
│   ├───dist
│   │   ├───lib
│   │   │   └───read-config
│   │   └───src
│   │       ├───BaseClient
│   │       ├───clientA
│   │       │   └───lib
│   │       │       └───fileUpload
│   │       ├───clientB
│   │       └───lib
│   │           └───read-config
│   ├───lib
│   │   └───read-config
│   ├───node_modules
│   │   ├───.....
│   └───src
│       ├───BaseClient
│       ├───clientA
│       │   └───lib
│       │       └───fileUpload
│       └───clientB
└───server
    ├───dist
    │   ├───src
    │   │   ├───helpers
    │   │   ├───http-api
    │   │   ├───middlewares
    │   │   ├───read-config
    │   │   ├───redis-client
    │   │   └───ws-api
    │   └───tests
    │       └───unit
    ├───files
    ├───node_modules
    │   ├───....
    ├───src
    │   ├───helpers
    │   ├───http-api
    │   ├───middlewares
    │   ├───read-config
    │   └───ws-api
    └───tests
        └───unit

```

![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

