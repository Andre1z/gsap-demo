# GSAP Demo - Animaciones Combinadas

## Descripción

Este proyecto es una demostración completa de animaciones web creadas con GSAP (GreenSock Animation Platform). El proyecto muestra una diversidad de efectos, entre ellos:

- **Animación de Objetos:** Un cuadrado se mueve y cambia de color.
- **Animación de Texto:** El texto se separa en palabras y cada una aparece de manera suave con un efecto de desenfoque.
- **Animación de Cuadrados:** Tres cuadrados se animan orquestadamente mediante un timeline (uno se mueve horizontalmente, otro verticalmente con efecto *yoyo* y el tercero en diagonal).
- **Animación al Hacer Scroll:** Un elemento se anima al entrar en la vista utilizando ScrollTrigger.
- **Animación con Hover:** Un elemento reacciona al pasar el ratón sobre él, escalando y cambiando de color.
- **Control de Timeline:** Un elemento se anima y puede controlarse (play, pause y reverse) mediante botones.
- **Animación de SVG (Dibujo de Línea):** Se anima el trazo de un SVG para simular que se dibuja progresivamente.
- **Animación con Click:** Una imagen reacciona con un efecto de rebote al hacerle click.
- **Animación de Carousel:** Un conjunto de imágenes se muestran y ocultan secuencialmente para formar un carrusel.
- **Animación de Fondo Gradiente:** El fondo de una sección cambia de gradiente de manera continua.
- **Efecto Parallax:** Un bloque se mueve de izquierda a derecha al hacer scroll para crear un efecto parallax.
- **Animación de Botón Pulsante:** Un botón que pulsa continuamente.
- **Funciones Adicionales:** Controles globales para resetear animaciones, alternar entre modo claro/oscuro, y pausar o reanudar todas las animaciones.
- **Modal de Información:** Cada sección (excepto la de Teoría) incluye un botón de información (📗) que, al pulsarse, abre un modal mostrando información teórica y ejemplos de código para dicha sección. El modal se cierra con el botón (❌).

## Características

- **Animación Avanzada:** Utiliza GSAP y ScrollTrigger para crear animaciones fluidas y de alto rendimiento.
- **Modo Oscuro:** Se puede alternar entre un esquema de colores claro y oscuro.
- **Interactividad:** Los elementos responden a eventos como click, hover y scroll.
- **Modal Informativo:** Cada sección dispone de un botón info que abre un modal con información teórica y fragmentos de código.
- **Funciones Globales:** Botones para resetear el proyecto, pausar y reanudar animaciones globalmente.

## Estructura de Archivos

La estructura del proyecto es la siguiente:

```
GSAP-Demo/
├── index.html        # Página principal HTML que contiene la estructura y secciones del proyecto.
├── css/
│   └── style.css     # Archivo de estilos que define la apariencia de todos los elementos, incluidos los modales y el modo oscuro.
├── js/
│   └── main.js       # Lógica y animaciones implementadas con GSAP y ScrollTrigger, además de funciones adicionales y modal informativo.
└── assets/           # Carpeta para recursos (imágenes)
    ├── image1.jpg    # Imagen utilizada en la sección "Animación con Click"
    ├── image2.png    # Imagen utilizada en la sección "Animación de Carousel"
    ├── image3.png    # Imagen utilizada en la sección "Animación de Carousel"
    └── image4.jpg    # Imagen utilizada en la sección "Animación de Carousel"
```

## Instalación y Uso

1. **Clonar o descargar el repositorio:**  
   Descarga o clona este proyecto en tu máquina local.

2. **Organización de Archivos:**  
   Asegúrate de mantener la estructura de directorios descrita anteriormente.

3. **Abrir el Proyecto:**  
   Abre el archivo `index.html` en tu navegador favorito.  
   Asegúrate de contar con conexión a Internet para cargar las dependencias (GSAP y ScrollTrigger) vía CDN.

4. **Interacción:**  
   - Cada sección (excepto la de Teoría) muestra un botón info (📗) en la esquina inferior derecha. Al pulsarlo se abre un modal con información teórica y ejemplos de código para esa sección.  
   - El modal se cierra con el botón (❌).  
   - Los controles adicionales (Reset, Modo Oscuro, Pausar Todo, Reanudar Todo) se encuentran en la sección "Funciones Adicionales".

## Ejemplos de Código

A continuación se muestran algunos fragmentos representativos utilizados en el proyecto:

### Animación de Cuadrados

```js
const timelineSquares = gsap.timeline({ delay: 1 });
timelineSquares.fromTo(
  "#cuadrado-rojo",
  { x: -150 },
  { duration: 1, x: 150, ease: "power2.out" }
);
timelineSquares.fromTo(
  "#cuadrado-verde",
  { y: -150 },
  { duration: 1, y: 150, ease: "power2.inOut", repeat: 1, yoyo: true }
);
timelineSquares.fromTo(
  "#cuadrado-azul",
  { x: -100, y: -100 },
  { duration: 1, x: 100, y: 100, ease: "power2.inOut" }
);
```

### Animación al Hacer Scroll

```js
gsap.registerPlugin(ScrollTrigger);
gsap.fromTo(
  "#scroll-box",
  { opacity: 0, y: 50 },
  {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#scroll-box",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
);
```

### Animación con Click

```js
const clickBox = document.getElementById("click-box");
if (clickBox) {
  clickBox.addEventListener("click", function () {
    gsap.fromTo(
      clickBox,
      { scale: 1 },
      {
        scale: 1.2,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
          gsap.to(clickBox, { scale: 1, duration: 0.5, ease: "elastic.in(1, 0.3)" });
        }
      }
    );
  });
}
```

### Funciones Adicionales

```js
document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});
document.getElementById("darkmode-btn").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
document.getElementById("pause-all-btn").addEventListener("click", function () {
  gsap.globalTimeline.pause();
});
document.getElementById("resume-all-btn").addEventListener("click", function () {
  gsap.globalTimeline.resume();
});
```

## Personalización

Puedes modificar los parámetros de GSAP (duraciones, easing, desplazamientos, etc.) en el archivo ```js/main.js``` para adaptar los efectos a tus necesidades. Asimismo, los estilos en ```css/style.css``` pueden ajustarse para cambiar la apariencia visual (colores, tipografía, etc.) y la presentación de los modales y otros elementos.

## Dependencias

El proyecto utiliza las siguientes bibliotecas a través de CDN:

- ```GSAP 3.11.5 https://greensock.com/gsap/```
- ```ScrollTrigger https://greensock.com/scrolltrigger/```

## Licencia

Este proyecto se ofrece con fines educativos. Puedes modificar y utilizar el código según tus necesidades.