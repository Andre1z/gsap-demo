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
    gsap.to(svgPath, {
      duration: 2,
      strokeDashoffset: 0,
      ease: "power1.inOut",
      delay: 1
    });
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
     Funcionalidad de Información (Modal)
  ============================================ */
  const sectionInfo = {
    "objetos": {
      title: "Animación de Objetos",
      content: `<p>Se anima un elemento cambiando su posición y color.</p>
<pre><code>gsap.to("#animacion", {duration:2, x:300, backgroundColor:"#e74c3c"});</code></pre>`
    },
    "texto-animado": {
      title: "Animación de Texto",
      content: `<p>El contenido se separa en palabras y se animan individualmente.</p>
<pre><code>const palabras = texto.split(" ");
gsap.to(".word", {stagger:0.2, opacity:1});</code></pre>`
    },
    "animacion-cuadrados": {
      title: "Animación de Cuadrados",
      content: `<p>Se utiliza un timeline para orquestar los movimientos de los cuadrados.</p>
<pre><code>gsap.timeline()
  .to("#cuadrado-rojo", {duration:1, x:150})
  .to("#cuadrado-verde", {duration:1, y:150, repeat:1, yoyo:true})
  .to("#cuadrado-azul", {duration:1, x:100, y:100});</code></pre>`
    },
    "scroll-animation": {
      title: "Animación al Hacer Scroll",
      content: `<p>El elemento se anima al entrar en la vista gracias a ScrollTrigger.</p>
<pre><code>gsap.fromTo("#scroll-box", {opacity:0, y:50}, {opacity:1, y:0, scrollTrigger:{start:"top 80%"}});</code></pre>`
    },
    "hover-animation": {
      title: "Animación con Hover",
      content: `<p>Al pasar el ratón, se activa una animación de escala y cambio de color.</p>
<pre><code>hoverBox.addEventListener("mouseenter", () => {
  gsap.to(hoverBox, {scale:1.2});
});</code></pre>`
    },
    "timeline-controls": {
      title: "Control de Timeline",
      content: `<p>Se controlan las animaciones mediante botones para reproducir, pausar o invertir el timeline.</p>
<pre><code>timeline.play();
timeline.pause();
timeline.reverse();</code></pre>`
    },
    "svg-animation": {
      title: "Animación de SVG: Dibujo de Línea",
      content: `<p>Se simula el trazo progresivo de un SVG.</p>
<pre><code>gsap.to(svgPath, {strokeDashoffset:0});</code></pre>`
    },
    "click-animation": {
      title: "Animación con Click",
      content: `<p>La imagen se anima con un efecto de rebote al hacer click.</p>
<pre><code>clickBox.addEventListener("click", () => {
  gsap.fromTo(clickBox, {scale:1}, {scale:1.2, duration:0.5});
});</code></pre>`
    },
    "carousel": {
      title: "Animación de Carousel",
      content: `<p>Los elementos del carousel se muestran y ocultan secuencialmente en un loop infinito.</p>
<pre><code>gsap.timeline({repeat:-1})
  .to(item, {duration:1, opacity:1})
  .to(item, {duration:1, opacity:0}, "+=1");</code></pre>`
    },
    "gradient-animation": {
      title: "Animación de Fondo Gradiente",
      content: `<p>El fondo cambia gradualmente mediante movimientos en la posición del gradiente.</p>
<pre><code>gsap.to("#gradient-animation", {backgroundPosition:"200% 0%", repeat:-1});</code></pre>`
    },
    "parallax-effect": {
      title: "Efecto Parallax",
      content: `<p>El bloque se mueve de izquierda a derecha al hacer scroll para crear un efecto parallax.</p>
<pre><code>gsap.to("#parallax-box", {x:50, scrollTrigger:{scrub:true}});</code></pre>`
    },
    "pulsate-button": {
      title: "Animación de Botón Pulsante",
      content: `<p>El botón pulsa de forma continua para llamar la atención.</p>
<pre><code>gsap.to("#pulsate-btn", {scale:1.1, repeat:-1, yoyo:true});</code></pre>`
    },
    "extras": {
      title: "Funciones Adicionales",
      content: `<p>Incluye controles globales para resetear animaciones, alternar modo oscuro y pausar/reanudar todas las animaciones.</p>
<pre><code>document.getElementById("darkmode-btn").addEventListener("click", ...);</code></pre>`
    }
  };

  const infoButtons = document.querySelectorAll(".info-btn");
  const modal = document.getElementById("info-modal");
  const modalBody = modal.querySelector(".modal-body");
  const closeModalBtn = modal.querySelector(".close-modal");

  infoButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section");
      const info = sectionInfo[sectionId];
      if (info) {
        modalBody.innerHTML = `<h2>${info.title}</h2>${info.content}`;
        modal.style.display = "flex";
      } else {
        modalBody.innerHTML = `<p>No hay información disponible para esta sección.</p>`;
        modal.style.display = "flex";
      }
    });
  });
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  /* ============================================
     Funciones Adicionales (Reset, Modo Oscuro, Pausa/Reanuda)
  ============================================ */
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
});