## Descripción

<-- Agregar una descripción concisa de lo que hace el pull request !-->

## Resumen de cambios

<-- Enlistar los commits hechos del pull request !-->

## Notas (opcional)

<-- Agregar notas para explicar aspectos adicionales del pull request !-->

## General

- [ ] No hay errores gramaticales en los comentarios
- [ ] La descripción es clara y concisa. Explica los cambios que implica aceptar el pull request
- [ ] El resumen de los cambios pertenece a los commits que abarca el pull request
- [ ] Las notas son claras, concisas y aportan información adicional
- [ ] "Siguen los formatos de los pull request (
      -formato inicial de pull request
      )"
- [ ] El código de una rama está seccionado por varios commits que segmentan el propósito del código
- [ ] Los commits completan la oración "If applied this commit, will..."
- [ ] La rama main solo contiene la versión estable y actualizada de las iteraciones
- [ ] El nombre de las ramas sigue el estándar propuesto por el Manual de arquitectura en la página 7

## Revisa los siguientes puntos si el pull request es a develop

- [ ] Las variables están escritas en "camelCase" y tienen un nombre representativo de su uso
- [ ] Las funciones están escritas en "camelCase" y tienen un nombre representativo de su uso
- [ ] Los modelos están escritas en "PascalCase" y tienen un nombre representativo de su uso
- [ ] Todas las variables declaradas en el código se utilizan
- [ ] Todos los parámetros de las funciones se utilizan (a excepción del req, res, next en los controladores)
- [ ] Las clases están escritas en "PascalCase" y tienen un nombre representativo de su uso
- [ ] "Las variables de entorno están nombradas en mayúsculas y separadas por guiones bajo por cada palabra nueva:
VARIABLE_ENTORNO"
- [ ] "Las variables de entorno son llamadas con:
process.env.VARIABLE_ENTORNO"
- [ ] Todos los imports se utilizan (no hay imports que no se estén usando dentro de un mismo archivo de código)
- [ ] Todos los imports de archivos tienen su extensión .js
- [ ] Todas las funciones que son importadas, tienen la palabra reservada "export" o "export default"
- [ ] Cada bloque abierto de .then() tiene su catch
- [ ] Cada bloque abierto de try tiene su catch
- [ ] Dentro de todos los catch existe un manejo del error
- [ ] Todas las funciones que requieran el uso de "await" deben de tener su palabra reservada "async" en la función
- [ ] Ninguna línea o bloque de código supera la complejidad temporal de O(n^2)
- [ ] No debe de existir una función con la palabra "async" si no tiene el uso de "await"
- [ ] Para recorrer un arreglo se utiliza el método map() sobre el mismo.
- [ ] No se usan ciclos for para iterar arreglos
- [ ] Todas las líneas de código que no representan bloques terminan en ";"
- [ ] Todas las variables están en inglés
- [ ] Todos los comentarios hechos en JavaDoc tienen un espacio antes del primer @param o @return
- [ ] Todos los atributos y variables están en inglés.
- [ ] "Todos los bloques de código que necesiten de parentesis y llaves están espaciados y con un salto de línea: 
() {

}"
- [ ] "Las variables encerradas en llaves deben estar con un espacio después de la llave que abre y antes de la llave que cierra; cada variable debe estar separada por "","" y un espacio:
{ variable1, variable2, variable3 }"
- [ ] "Los bloques de código que requieran continuación después de una llave deberán de estar separadas con un espacio seguido del otro bloque de código: 

palabraReservada o ""()"" { 

} palabraReservada {

}"
- [ ] Todos los loggeos "console.log()" deben de estar comentados u omitirse
- [ ] Los archivos de los modelos están nombrados como nombre.model.js
- [ ] Los archivos de las rutas están nombrados como nombre.routes.js
- [ ] Los archivos de los controladores están nombrados como nombre.controllers.js
- [ ] Los archivos y código de la carpeta de controladores sólo cumplen con la funcionalidad descrita de un controlador
- [ ] Los archivos y código de la carpeta de modelos sólo cumplen con la funcionalidad descrita de los modelos
- [ ] Todos los controladores regresan el estatus como respuesta de la petición atendiendo el estándar de HTTP Status Codes
- [ ] No tiene métodos deprecados
- [ ] No tiene métodos que no sean recomendados por la documentación de Mongoose
- [ ] Las consultas no tienen una complejidad mayor a cuadrática
- [ ] Los comentarios del código carecen de errores gramaticales
- [ ] Los comentarios explican el propósito de una función o sección de código
- [ ] Los comentarios son colocados al inicio de cada función o sección
- [ ] Los comentarios están actualizados
- [ ] Los comentarios para funciones siguen el estándar "Javadoc"

## Revisa los siguientes puntos si el pull request es de develop a testing

- [ ] En caso de aplicar, ¿Ya pasó las pruebas unitarias?

- [ ] En caso de no aplicar con pruebas unitarias, ¿Ya probaste las funciones de forma manual?

- [ ] ¿Se apega al estándar de código?

- [ ] ¿Contiene JAVADOC en las funciones correspondientes?

- [ ] En caso de instalar una nueva dependencia o agregar algún archivo que todos deban agregar de forma local (por estar en gitignore) ¿Ya lo comunicaste al equipo?

- [ ] En caso de aplicar, ¿Ya corriste las pruebas unitarias de forma local en la rama?

## Revisa los siguientes puntos si el pull request es de testing a main

- [ ] Ya se hicieron pruebas de desempeño en ambiente de testing.

- [ ] Ya se hicieron pruebas de seguridad en ambiente de testing.

- [ ] Ya se hicieron pruebas de seguridad en ambiente de testing.

- [ ] Ya se ejecutaron pruebas Black Box en ambiente de testing.

- [ ] En caso de aplicar, ya se hicieron correcciones.
