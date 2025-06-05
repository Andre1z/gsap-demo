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
     Se separa el texto en palabras y se anima cada una, pasando de opacidad 0 y desenfoque a una visualización nítida.
  ============================================ */
  const textoElem = document.getElementById("animacion-texto");
  const palabras = textoElem.innerText.split(" ");
  textoElem.innerHTML = "";
  palabras.forEach(word => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.innerText = word + " "; // Añadimos un espacio para separar visualmente
    // Estado inicial: baja opacidad y desenfoque
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
     Se crea un timeline para animar tres cuadrados en el siguiente orden:
       1. Cuadrado Violeta (id "cuadrado-rojo"): se mueve de izquierda a derecha.
       2. Cuadrado Verde (id "cuadrado-verde"): se mueve verticalmente con efecto yoyo.
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
     Con ScrollTrigger, el elemento #scroll-box se anima al alcanzar la vista.
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
        start: "top 80%", // Inicia cuando la parte superior llegue al 80% de la ventana
        toggleActions: "play none none reverse"
      }
    }
  );

  /* ============================================
     Animación con Hover
     Al pasar el mouse sobre el elemento #hover-box, se escala y cambia de color.
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
     Se crea un timeline controlable para el elemento #control-box.
     Los botones permiten reproducir, pausar o invertir la animación.
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
});