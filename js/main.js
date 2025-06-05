// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     Animación de Objetos
     Se anima el cuadrado (div #animacion) cambiando posición y color.
  ============================================ */
  gsap.to("#animacion", {
    duration: 2,
    x: 300,
    backgroundColor: "#e74c3c",
    ease: "power2.inOut"
  });

  gsap.from("#animacion", {
    duration: 2,
    x: -300,
    delay: 2,
    ease: "power2.out"
  });

  /* ============================================
     Animación de Texto
     Se separa el contenido de #animacion-texto en palabras y se envuelve cada una en <span> 
     para luego animarlas de manera escalonada (stagger) desde baja opacidad y desenfoque a su estado natural.
  ============================================ */
  const textoElem = document.getElementById("animacion-texto");
  const palabras = textoElem.innerText.split(" ");
  textoElem.innerHTML = "";
  palabras.forEach(word => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.innerText = word + " "; // Se añade un espacio extra para separación visual
    // Estado inicial: opacidad baja y desenfoque
    span.style.opacity = 0;
    span.style.filter = "blur(4px)";
    textoElem.appendChild(span);
  });
  gsap.to(".word", {
    duration: 1,
    opacity: 1,
    filter: "blur(0px)",
    ease: "power2.out",
    stagger: 0.2,
    delay: 1
  });

  /* ============================================
     Animación de Cuadrados
     Se crea un timeline para animar tres cuadrados en un orden definido:
       1. Cuadrado Violeta (id "cuadrado-rojo"): se mueve de izquierda a derecha.
       2. Cuadrado Verde (id "cuadrado-verde"): se mueve verticalmente, aplicándose un efecto yoyo.
       3. Cuadrado Azul (id "cuadrado-azul"): se desliza en diagonal.
  ============================================ */
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

  /* ============================================
     Animación al Hacer Scroll
     Usando ScrollTrigger, el elemento #scroll-box se animará (incrementará su opacidad y se desplazará) 
     cuando entre en la vista (cuando su parte superior alcance el 80% de la ventana).
  ============================================ */
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

  /* ============================================
     Animación con Hover
     Cuando el usuario pasa el mouse sobre #hover-box, se escala y cambia de color, y al retirarlo vuelve a su estado original.
  ============================================ */
  const hoverBox = document.getElementById("hover-box");
  hoverBox.addEventListener("mouseenter", function () {
    gsap.to(hoverBox, { duration: 0.5, scale: 1.2, backgroundColor: "#e67e22" });
  });
  hoverBox.addEventListener("mouseleave", function () {
    gsap.to(hoverBox, { duration: 0.5, scale: 1, backgroundColor: "#f1c40f" });
  });

  /* ============================================
     Control de Timeline con Botones
     Se crea un timeline (pausado por defecto) para el elemento #control-box, 
     que se mueve y rota, y se controla mediante botones para reproducir, pausar o invertir la animación.
  ============================================ */
  let controlTimeline = gsap.timeline({ paused: true });
  controlTimeline
    .to("#control-box", { duration: 1, x: 200, ease: "power2.inOut" })
    .to("#control-box", { duration: 1, rotation: 360, ease: "power2.inOut" }, "-=0.5");

  document.getElementById("play-btn").addEventListener("click", () => {
    controlTimeline.play();
  });
  document.getElementById("pause-btn").addEventListener("click", () => {
    controlTimeline.pause();
  });
  document.getElementById("reverse-btn").addEventListener("click", () => {
    controlTimeline.reverse();
  });

  /* ============================================
     Animación de SVG: Dibujo de Línea
     Se anima el trazo de un <path> para simular un dibujo progresivo.
  ============================================ */
  const svgPath = document.querySelector("#svg-dibujo path");
  if (svgPath) {
    const pathLength = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = pathLength;
    svgPath.style.strokeDashoffset = pathLength;
    gsap.to(svgPath, { duration: 2, strokeDashoffset: 0, ease: "power1.inOut", delay: 1 });
  }

  /* ============================================
     Animación con Click
     Al hacer click sobre #click-box, se anima una escala (efecto rebote) para crear un efecto interactivo.
  ============================================ */
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

  /* ============================================
     Animación de Carousel
     Se crea un timeline en bucle que muestra y oculta secuencialmente cada ítem del carousel.
  ============================================ */
  const carouselItems = document.querySelectorAll(".carousel-item");
  if (carouselItems.length > 0) {
    gsap.set(carouselItems, { opacity: 0 });
    const carouselTimeline = gsap.timeline({ repeat: -1 });
    carouselItems.forEach((item) => {
      carouselTimeline
        .to(item, { duration: 1, opacity: 1, ease: "power2.inOut" })
        .to(item, { duration: 1, opacity: 0, ease: "power2.inOut" }, "+=1");
    });
  }

  /* ============================================
     Animación de Fondo Gradiente
     Se anima el fondo de la sección #gradient-animation para crear una transición continua en el gradiente.
  ============================================ */
  gsap.to("#gradient-animation", {
    duration: 5,
    backgroundPosition: "200% 0%",
    ease: "none",
    repeat: -1
  });

  /* ============================================
     Efecto Parallax (Horizontal)
     Con ScrollTrigger, el elemento #parallax-box se mueve de izquierda a derecha en función del scroll.
  ============================================ */
  gsap.to("#parallax-box", {
    x: 50,
    ease: "none",
    scrollTrigger: {
      trigger: "#parallax-effect",
      scrub: true
    }
  });

  /* ============================================
     Animación de Botón Pulsante
     El botón con id #pulsate-btn pulsa de forma continua.
  ============================================ */
  gsap.to("#pulsate-btn", {
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 0.8
  });
});