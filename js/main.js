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

  // Por cada palabra, creamos un span y lo agregamos al elemento
  words.forEach((word) => {
    let span = document.createElement("span");
    span.className = "word";
    // Se añade la palabra seguida de un espacio para mantener la separación
    span.innerText = word + " ";
    // Condición inicial: baja opacidad y desenfoque (esto también se podría definir en CSS)
    span.style.opacity = 0;
    span.style.filter = "blur(4px)";
    texto.appendChild(span);
  });

  // Seleccionamos todos los spans creados
  const wordSpans = texto.querySelectorAll(".word");

  // Animamos cada palabra de forma escalonada para que aparezca palabra por palabra
  gsap.to(wordSpans, {
    duration: 1,
    opacity: 1,
    filter: "blur(0px)",
    ease: "power2.out",
    stagger: 0.2, // Descanso entre cada palabra
    delay: 1      // Demora para iniciar la animación de texto
  });
});