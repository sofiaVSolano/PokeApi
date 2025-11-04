Proyecto PokeApi — README 
Integrantes

Sofía Valencia Solano – 30000119284

Kevin Alexis López Camacho – 30000117437

Johan Camilo Balanta Santacruz – 30000115778

Visión general / Propósito y alcance

Este proyecto corresponde a una aplicación web que muestra una Pokédex interactiva en 3D mediante transformaciones CSS y tarjetas Pokémon renderizadas con WebGL. Sirve como demostración tanto de diseño visual avanzado como de buenas prácticas arquitectónicas. 
DeepWiki

El documento original describe los objetivos del proyecto, la pila tecnológica, la arquitectura del sistema y las características principales. 
DeepWiki

¿Qué es PokeApi?

Es una aplicación que representa un dispositivo Pokédex en 3D, con tapa articulada, controles de navegación, indicadores LED y dos pantallas, todo construido con transformaciones 3D en CSS sin depender de JavaScript para la estructura del dispositivo. 
DeepWiki

Las tarjetas individuales de Pokémon se renderizan usando Three.js (y la librería de React para Three.js, react-three-fiber) para lograr geometrías dinámicas y efectos visuales. 
DeepWiki

Los datos de los Pokémon se obtienen desde la API REST de PokeAPI, incluyendo paginación para listas y solicitudes de detalle (sprites, tipos, estadísticas). 
DeepWiki

Tiene controles interactivos: navegación con ratón para inclinación 3D, botones para moverse entre Pokémon, abrir/cerrar la tapa, etc. 
DeepWiki

Pila tecnológica
Categoría	Herramientas / tecnologías usadas
Herramientas de construcción	Vite (versión 7.1.7) — para desarrollo con recarga rápida y módulos ES optimizados. 
DeepWiki

Framework de UI	React (versión ~19.1.1), aprovechando arquitectura basada en componentes. 
DeepWiki

Gestión del estado	API de contexto de React combinada con patrón reducer (sin librerías externas como Redux). 
DeepWiki

Gráficos 3D	Three.js (versión ~0.181.0) para renderizado 3D de las tarjetas. 
DeepWiki

Renderizado en React	react-three-fiber (versión ~9.4.0) para integrar Three.js en componentes de React. 
DeepWiki

Utilidades de gráficos 3D	Librería @react-three/drei (versión ~10.7.6) para componentes y utilidades preconstruidas de Three.js. 
DeepWiki

Cliente HTTP	axios (versión ~1.13.1) para hacer solicitudes a la API REST. 
DeepWiki

Estilos 3D	Transformaciones CSS 3D para la estructura general de la Pokédex. 
DeepWiki

Calidad de código	ESLint (versión ~9.36.0) con reglas para React + Hooks. 
DeepWiki
Arquitectura principal (componentes clave)

Punto de entrada: src/main.jsx, donde se inicializa la app y se envuelve con el proveedor de contexto global. 
DeepWiki

Componente raíz: src/App.jsx, administra el layout y renderización condicional en función del estado global. 
DeepWiki

Gestión de estado global: en src/context/PokemonContext.jsx, con hooks personalizados para leer y despachar acciones. 
DeepWiki

Interfaz Pokédex: en src/pages/pokeDex.jsx, donde se renderiza el dispositivo 3D completo (estructura, navegación, pantalla de Pokémon). 
DeepWiki

Tarjetas 3D de Pokémon: en src/components/Pokemon3DCard.jsx, usando Three.js para renderizar cada tarjeta con geométría y estilos dinámicos según tipo. 
DeepWiki

Cliente de API: src/api/pokeService.js contiene lógica para hacer peticiones paginadas y solicitudes de detalles de Pokémon. 
DeepWiki

Lógica de interacción: src/scripts/PokedexLogic.js maneja manipulaciones del DOM directo para efectos de inclinación 3D, botones, animaciones, etc. Esto permite interacciones suaves sin depender del virtual DOM. 
DeepWiki

Estilos: varios archivos CSS:

styles.css contiene las transformaciones 3D para la estructura de la Pokédex. 
DeepWiki

App.css, index.css, main.css y otros estilos globales o de componente para layout y temas. 
DeepWiki

Características clave

Gestión de estado basada en contexto

Se utiliza el Context API con un patrón reducer para manejar los estados como carga (loading), error, selección de Pokémon, lista de Pokémon, etc. 
DeepWiki

Hooks personalizados permiten operaciones de lectura (usePokemonState()) y acciones (usePokemonActions()). 
DeepWiki

Renderizado híbrido en 3D

La estructura principal del dispositivo Pokédex se renderiza únicamente con CSS 3D (transformaciones rotateX/Y/Z, translateZ, etc.), sin JavaScript, lo cual reduce la carga y mejora la performance. 
DeepWiki

Las tarjetas de Pokémon usan Three.js + react-three-fiber para geometrías detalladas, luces, animaciones y propiedades dinámicas según tipo del Pokémon. 
DeepWiki

Obtención de datos en dos etapas

Primero se solicita una lista paginada de nombres y URLs de Pokémon (limit / offset). 
DeepWiki

Luego, para cada Pokémon de la lista se hacen solicitudes de detalles (sprites, estadísticas, tipo, etc.). Se incluye un pequeño retraso entre solicitudes detalladas para evitar limitaciones de la API. 
DeepWiki

Interacciones optimizadas para rendimiento

Las interacciones de inclinación 3D (tilt) con el ratón y la navegación se manejan directamente via DOM en el archivo PokedexLogic.js en lugar de actualizar el estado React, evitando renderizados frecuentes y logrando interacciones suaves a ~60 fps. 
DeepWiki

También incluye botones para abrir / cerrar la tapa, indicadores LED, navegación con flechas, pulsar para seleccionar Pokémon, etc. 
DeepWiki

Renderizado condicional

El componente principal siempre renderiza la Pokédex, pero la tarjeta 3D de Pokémon se muestra solo cuando hay un Pokémon seleccionado (ejemplo: {selected && <Pokemon3DCard ... />}). 
DeepWiki

Estructura de archivos del proyecto
src/
├── main.jsx           # Punto de entrada de la app, envoltorio de contexto
├── App.jsx            # Componente raíz, decide qué renderizar
├── pages/
│   └── pokeDex.jsx    # Interfaz principal de la Pokédex 3D
├── components/
│   └── Pokemon3DCard.jsx  # Componente que renderiza las tarjetas de Pokémon en 3D
├── context/
│   └── PokemonContext.jsx # Estado global usando Context + reducer
├── api/
│   └── pokeService.js     # Cliente HTTP para obtener datos de PokeAPI
├── scripts/
│   └── PokedexLogic.js    # Lógica de interacción (DOM directo, animaciones)
└── styles/
    ├── styles.css       # Estilos principales con transformaciones 3D
    ├── App.css          # Layout y estilos específicos de App
    ├── index.css        # Estilos globales / resets
    └── main.css         # Estilos por componentes / temas


(Según la documentación del proyecto). 
DeepWiki

Próximos pasos sugeridos

Ver la sección Getting Started para instrucciones de instalación, configuración del servidor de desarrollo, etc. 
DeepWiki

Explorar la sección Architecture Overview para más detalles sobre decisiones de diseño del sistema. 
DeepWiki

Revisar los componentes para entender la lógica de componentes individuales. 
DeepWiki

Ver los estilos de transformaciones 3D para saber cómo están construidas las geometrías sin JavaScript. 
DeepWiki

Revisar la capa de datos (API + gestión de estado) y las interacciones (tilt, navegación, selección). 
DeepWiki
