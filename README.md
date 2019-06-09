# Thatmov

_Consumo de la API de **The Movie DB**, desarrollado con Webpack y Javascript_


### Configurando... :dart:

Antes de correr la aplicación, debe obtener una [_api key_](https://developers.themoviedb.org/3/getting-started/introduction) en The Movie DB.

Luego, en el archivo `src/js/tmdb.js`, deberá colocar su _api key_ generada previamente:

`constructor(){`

`...`

`this.api = '<TU_API_KEY>'`

`...`


### Development server :walking:

Ejecute `npm run server` para correr el _dev server_ de _webpack_. Navegue a `http://localhost:9000/`. La aplicación recargará automáticamente al modificar los archivos fuentes.


### Modo Producción :running:

Ejecute `npm run prod` para correr _webpack_ en modo producción. Esto generará el directorio `dist` con los archivos de distribución.