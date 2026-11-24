# Agencia de viajes

Aplicación web para explorar destinos y consultar hoteles y vuelos disponibles para cada lugar. Desarrollada con React y Vite.

## Características

- Página de inicio y navegación entre destinos y viajes.
- Catálogo de destinos con detalles e imágenes.
- Selección de un destino para consultar hoteles y vuelos.
- Estados de carga, mensajes de error y opción para reintentar solicitudes.
- Validación de formato y campos de los datos mock.

## API simulada

La aplicación usa **Mock Service Worker (MSW)** en el navegador; no requiere un backend para funcionar en desarrollo.

- **REST:** `GET /api/destinos` obtiene destinos y `POST /api/destinos` permite agregar uno.
- **GraphQL:** consultas para obtener hoteles por destino y vuelos por ciudad y país.
- Los datos de prueba se encuentran en `src/mocks/agencia/` y los handlers en `src/mocks/handlers.js`.

## Tecnologías

React, Vite, React Router, Apollo Client, GraphQL, MSW y Tailwind CSS.

## Inicio rápido

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Ejecuta ESLint. |
