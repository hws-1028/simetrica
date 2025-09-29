# SIMETRICA
Proyecto web desarrollado en **React + TypeScript**. 

## 🚀 Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/hws-1028/simetrica.git
cd simetrica

```
Instala la dependencias
```bash
npm install
```

## ▶️ Ejecución en desarrollo
Para correr el proyecto en modo desarrollo:
```bash
npm run dev
```
El servidor se abrirá normalmente en:
```bash
http://localhost:5173/
```

--------------------------------------------------------------------------------------------------------------------------
# 📝 Avance realizado - 29/09/2025

En esta entrega implementé la página principal (Home) del proyecto junto con sus estilos y un layout de cabecera (Header).

## Home Page
- Creé el componente HomePages.tsx en la carpeta src/pages/.
- Le asigné un fondo con imagen que cubre toda la vista (100vw x 100vh).
- Integré el header y preparé el espacio para futuras secciones (ej: "Nuestros proyectos").
- Apliqué estilos en HomeStyle.css para ajustar el fondo y la estructura general.

## Header Layout

- Desarrollé el componente HeaderLayout.tsx en src/layouts/.
- Incluye el logo de Simétrica y el título de la aplicación.
- Implementé un menú de navegación con enlaces a las principales secciones del sitio: Inicio, Asociados, Proyectos, Diseños, Trabaja con nosotros y Contacto.
- Definí estilos en HeaderStyle.css para que el header sea fijo, transparente con fondo difuminado y con navegación alineada a la derecha.
