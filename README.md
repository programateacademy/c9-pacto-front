# pact fronted - Documentation

## Description
Este es el frontend de un foro construido utilizando Angular . El frontend interactúa con el backend implementado en Express con una base de datos basada en MongoDB para proporcionar una experiencia completa de la aplicación. Este programa esta diseñado para personas con alguna discapacidad.

Este proyecto esta generado con[Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

# Versión 1.0
![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/542efd44-ed20-408c-b15b-bcb8a4b53bbe)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/db3830da-a01f-48f0-92b2-7e0d7d42ca30)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/117e2c30-047a-4600-a550-bce70478911b)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/1f38b173-7cbb-4cfd-88c6-80aa60a751c9)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/e11baaff-1ec2-4dc5-a5b4-c24de78e42a2)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/7d1c0021-1e52-4ce4-a2bf-700586ff9deb)

![image](https://github.com/programateacademy/c9-pacto-front/assets/88947344/f4e78ed2-afae-48e6-a40d-ad2d38c2fd5e)


## Funcionalidades
- Inicio de sesión de usuario, distinguiendo entre usuarios y administradores.
- Registro de usuarios, con enlaces de video para personas sordas.
- Foro que incluye publicaciones con texto e imágenes, comentarios y me gusta.
- Perfil de usuario, donde los usuarios pueden modificar su información.
- Accesibilidad para diferentes tipos de usuarios y sus discapacidades.
- admin: permite gestionar los usuarios.
- email: permite enviar un correo para recuperar la contraseña
- password: permite cambiar la contraseña

## Tecnologias
- NodeJs
- Angular
- TypeScript
- tailwind.css

## Uso
- Tener instado NodeJs en tu equipo.
- Clonar este repositorio en tu equipo.
- Navega a la carpeta del proyecto y ejecuta `npm install` para instalar las dependencias.
- Utiliza el comando `ng serve` para iniciar el servidor de desarrollo,para usar el envoriment.dev.ts.
- Utilizar el envoriments.prod.ts de produción `ng serve -o --configuration production`
- Abre tu navegador y ve a `http://localhost:4200` para acceder a la aplicación en desarrollo.
- para usar tailwind copia este link en el html que necesites` <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">`

## Componentes

- `home`: Página de inicio que muestra publicaciones y actividades recientes.
- `login`: Página de inicio de sesión para usuarios registrados.
- `profile`: Página de perfil de usuario con información personal y actividades.
- `register`: Página de registro para nuevos usuarios.
- `admin` : vista para administradores para gestionar usuarios
- `email` : Envios de correos electronicos para cambios de contraseña.
- `password` : Para cambiar la contraseña.

## Reutilizables
- header: se cuenta con dos headers uno
- footer: se utiliza solo el login y register contiene contactos
- modals: Se cuentan con diferentes modales

## Instalacion

1 Clona el repositorio en tu maquina local
```bash
$ git clone git@github.com:programateacademy/c9-pacto-front.git
```

2 Navega en el directorio del proyecto 
```bash
$ cd c9-pacto-front
```

3 Puedes cambiar el origen del proyecto con los siguientes comando

```bash
$ git remote -v
$ git remote remove origin
$ git remote add origin <nueva_url_del_repositorio>
```

4 Instalar las dependecias necesarias
- Recuerda tener el package.json y el package-lock.json en el root de la carpeta y ejecutas

```bash
$ npm i
```

## Instalación tailwind
1 En una términal copia `npm install -D tailwindcss`

2 Verifica si esta instalado el archivo `tailwind.config.js` 

3 Inicializa con  si`npx tailwindcss init`

4 En el style.css principal verifica que tenga los siguiente `@tailwind base, @tailwind components, @tailwind utilities;`


## Contribuciones

Si deseas contribuir a este proyecto, ¡estamos abiertos a pull requests! Asegúrate de seguir las mejores prácticas de desarrollo de Angular y TypeScript.

## Contacto

Si tienes preguntas o sugerencias, no dudes en ponerte en contacto con el equipo de desarrollo enviando un correo electrónico a alguno de los siguientes miembros:

- [jmcardenas1807@gmail.com](mailto:jmcardenas1807@gmail.com )
- [Maribelaristizabal079@gmail.com](mailto:maribelaristizabal079@gmail.com)
- [Sebastiantincon834@gmail.com](mailto:sebastiantincon834@gmail.com)
- [Jaljordan77@gmail.com](mailto:jaljordan77@gmail.com)
- [Palacioalexander5@gmail.com](mailto:palacioalexander5@gmail.com)
- [Ruizvalencia78@gmail.com](mailto:ruizvalencia78@gmail.com)
- [Brayantandap@gmail.com](mailto:brayantandap@gmail.com)

## Autors

- [@nicolas paez](https://github.com/nikolaspaez06)
- [@JMCardenass](https://github.com/JMCardenass)
- [@john palacios ](https://github.com/John9135)
- [@juan andres  Ruiz](https://github.com/juan0941)
- [@brayan Triana](https://github.com/Vincent10-o)
- [@maribel aristizabal](https://github.com/maribelaristizabal).
- [@Sebastian Beltran](https://github.com/Sebastian-Beltran-rincon-22)
- [@julian gaitan](https://github.com/Julian9373)
