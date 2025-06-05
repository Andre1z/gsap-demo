// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  /* ================================
     Animación de Objetos
  ================================ */
  const animacionElement = document.getElementById("animacion");

  // Animación 1: Movimiento hacia la derecha y cambio de color
  gsap.to(animacionElement, {
    duration: 2,
    x: 300,
    backgroundColor: "#e74c3c",
    ease: "power1.inOut",
    onComplete: function() {
      console.log("Animación simple completada.");
    }
  });

  // Animación 2: Movimiento inverso con rebote
  gsap.from(animacionElement, {
    duration: 2,
    x: -300,
    delay: 2,
    ease: "bounce.out",
    onComplete: function() {
      console.log("Animación 'from' completada.");
    }
  });

  // Animación 3: Timeline secuencial con rotación y escalado
  const timeline = gsap.timeline({
    repeat: -1, // Repetir indefinidamente
    yoyo: true, // Invertir la animación en cada ciclo
    delay: 4    // Iniciar el timeline después de 4 segundos
  });
  timeline
    .to(animacionElement, {
      duration: 1,
      rotation: 360,
      ease: "power2.inOut",
      onStart: function() {
        console.log("Animación de rotación iniciada.");
      }
    })
    .to(animacionElement, {
      duration: 1,
      scale: 1.5,
      ease: "elastic.out(1, 0.3)",
      onComplete: function() {
        console.log("Animación de escalado completada.");
      }
    })
    .to(animacionElement, {
      duration: 1,
      scale: 1,
      ease: "back.out(1.7)",
      onComplete: function() {
        console.log("Animación de retorno completada.");
      }
    });

  /* ================================
     Animación de Texto
  ================================ */
  const texto = document.getElementById("animacion-texto");
  
  // Separamos el contenido en palabras
  const words = texto.innerText.split(" ");
  
  // Limpiamos el contenido original
  texto.innerHTML = "";

  // Por cada palabra, creamos un span con clase "word" y lo agregamos al párrafo
  words.forEach((word) => {
    let span = document.createElement("span");
    span.className = "word";
    span.innerText = word; // El espacio entre palabras lo manejamos con CSS (margin-right)
    // Estado inicial: baja opacidad y efecto de desenfoque
    span.style.opacity = 0;
    span.style.filter = "blur(4px)";
    texto.appendChild(span);
  });

  // Seleccionamos todos los spans de palabras
  const wordSpans = texto.querySelectorAll(".word");

  // Animación de aparición de texto, palabra por palabra
  gsap.to(wordSpans, {
    duration: 1,
    opacity: 1,
    filter: "blur(0px)",
    ease: "power2.out",
    stagger: 0.2, // Intervalo entre cada palabra
    delay: 1      // Demora para iniciar la animación del texto
  });

  /* ================================
     Animación de Cuadrados
  ================================ */
  // Obtenemos cada uno de los cuadrados según su ID
  const cuadradoRojo = document.getElementById("cuadrado-rojo");
  const cuadradoVerde = document.getElementById("cuadrado-verde");
  const cuadradoAzul = document.getElementById("cuadrado-azul");

  // Creamos un timeline específico para los cuadrados
  const squaresTimeline = gsap.timeline({
    delay: 2  // Demora inicial para visualizar el efecto en secuencia
  });

  squaresTimeline
    // 1. Cuadrado Rojo: Se mueve de izquierda a derecha.
    .fromTo(
      cuadradoRojo,
      { x: -150 },
      { duration: 1, x: 150, ease: "power2.out" }
    )
    // 2. Cuadrado Verde: Se desplaza de arriba hacia abajo con efecto yoyo.
    .fromTo(
      cuadradoVerde,
      { y: -150 },
      { duration: 1, y: 150, ease: "power2.inOut", repeat: 1, yoyo: true }
    )
    // 3. Cuadrado Azul: Se desliza en diagonal (de la esquina superior izquierda a la inferior derecha).
    .fromTo(
      cuadradoAzul,
      { x: -100, y: -100 },
      { duration: 1, x: 100, y: 100, ease: "power2.inOut" }
    );
});