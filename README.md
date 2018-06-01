# API PROYECTO DELBARRIO.PROVIDENCIA.CL

Versión 1.0.0

Template considerando buenas prácticas en el desarrollo de una API, las tecnología usadas son:

* [Express 4](http://expressjs.com/es/)
* Node 8x
* Cors
* Logger
* PostgreSQL
* Morgan (Logs diarios en archivos planos)
* Pg [Repositorio](https://github.com/brianc/node-postgres)
* [Knex](http://knexjs.org) (SQL query builder)
* [Bookshelf.js](http://bookshelfjs.org) (Mapeo objeto-relacional)
* jsonwebtoken [Repositorio](https://github.com/auth0/node-jsonwebtoken)
* [Passport](http://www.passportjs.org/) (Sistema de autenticación basado en estrategias)
* Passport-jwt [Repositorio](https://github.com/themikenicholson/passport-jwt) (Estrategia de Passport para jsonwebtoken)
* bcrypt.js [Repositorio](https://github.com/dcodeIO/bcrypt.js)
* Checkit.js [Repositorio](https://github.com/tgriesser/checkit) (Librería de validación de modelos)

* Test [mochajs](https://mochajs.org/#timeouts)

### Caracteristicas consideradas:
* Estructura de carpeta independiente por Ruta
* Metodos Autodocumentados

___________________________________________________________________________
## INSTALACION  ##

1.- Instalar NodeJS y NPM:

* Para sistemas operativos Linux y Windows [Ingrese Aqui](http://www.w3resource.com/node.js/installing-node.js-windows-and-linux.php)
* Para sistemas operativos OSX [Ingrese Aqui](https://coolestguidesontheplanet.com/installing-node-js-on-macos/). 
* Si necesita utilizar varias versiones de node puede usar [nvm](https://github.com/creationix/nvm)

2.- Instalar dependencias:
```
$ yarn install o npm install
```

3.- Instalar Docker-Composer:
```
[Resumen instalación](https://gist.github.com/mortegac/db6a824fcc94b900672326eabe44464b)
```

4.- Correr migraciones y seed de base de datos:
```
$ npm run-script migrate:run
$ npm run-script seed
```

___________________________________________________________________________
## EJECUCION ENTORNO DE DESARROLLO ##

Para ejecutar el entorno de Desarrollo fue considerado el uso de contenedores en Docker, actualmente fue solamente considerado una instancia de PostgreSQl para gestionar la base de datos.

1.- Instalación y Pre-Requisitos para instalar Docker-Compose`: 
	* [Procedimeinto de instalación](https://docs.docker.com/compose/install/#prerequisites)  

2.- Estructura de carpetas`:  Se considero el uso de la siguiente estructura 
	
```
│   ├── app
│       ├── auth
│       ├── middlewares
│       ├── models
│       ├── specific
│       ├── connection.js
│       ├── private.routes.js
│       ├── public.routes.js
│   ├── log
│   ├── migrations
│   ├── node_modules
│   ├── public
│       ├── img
│   ├── seeds
│   ├── test
├── config.js
├── knexfile.js
├── main.js
├── package.json
```
Donde:

* app\auth :	Carpeta que contiene la lógica de autenticación a través de JWT

* app\middlewares :	 carpeta que contiene intermediarios en requests para realizar diversas acciones, como inyección de datos o validación de permisos

* app\models :	Carpeta que contiene todos los modelos del sistema, separados por carpeta

* app\specific :	Carpeta que contiene lógicas ajenas a los modelos

* app\connection.js :	Inicializa el Query Builder y ORM

* app\private.routes.js :	Posee el ruteo privado de la API

* app\public.routes.js :	Posee el ruteo público de la API

* log :	Carpeta que contiene registros diarios de requests a la API

* migrations :	Carpeta que contiene migraciones a correr con Knex

* public\img :	Carpeta que contiene las imágenes subidas al servidor

* seeds :	Carpeta que contiene datos a cargar en la base de datos

* config.js :	Posee la inicialización/obtención de variables de entorno

* knexfile.js :	Archivo de configuración del Query Builder

* main.js :	Inicializa Express con sus dependencias

___________________________________________________________________________
## DEFINICION DE METODOS HTTP UTILIZADOS EN LA API ##
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso

___________________________________________________________________________
## TEST  ##
Se considera test a las rutas expuestas, para esto se utilizan los módulos 'mocha', 'chai' y 'axios'. Los test deben ser generados en la carpeta test como se muestra a continuación
```
│   └── test
│       ├── persona.js
```
* Los test se ejecutan con el comando npm test / yarn test

___________________________________________________________________________
## INFORMACION GENERAL  ##

* [Código de Estado de HTTP](http://librosweb.es/tutorial/los-codigos-de-estado-de-http/)  
