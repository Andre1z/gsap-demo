// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     Animación de Objetos
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
  ============================================ */
  const textoElem = document.getElementById("animacion-texto");
  const palabras = textoElem.innerText.split(" ");
  textoElem.innerHTML = "";
  palabras.forEach(word => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.innerText = word + " ";
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
  ============================================ */
  gsap.to("#gradient-animation", {
    duration: 5,
    backgroundPosition: "200% 0%",
    ease: "none",
    repeat: -1
  });

  /* ============================================
     Efecto Parallax (Horizontal)
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
  ============================================ */
  gsap.to("#pulsate-btn", {
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 0.8
  });

  /* ============================================
     Funciones Adicionales
  ============================================ */
  
  // Reset Animaciones: recarga la página
  document.getElementById("reset-btn").addEventListener("click", function () {
    location.reload();
  });

  // Alternar Modo Oscuro: alterna la clase "dark-mode" en el body
  document.getElementById("darkmode-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  // Pausa todas las animaciones (globalTimeline)
  document.getElementById("pause-all-btn").addEventListener("click", function () {
    gsap.globalTimeline.pause();
  });

  // Reanuda todas las animaciones (globalTimeline)
  document.getElementById("resume-all-btn").addEventListener("click", function () {
    gsap.globalTimeline.resume();
  });
});