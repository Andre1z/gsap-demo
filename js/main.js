// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionamos el elemento que se animará
  const animacionElement = document.getElementById("animacion");

  console.log("Documento cargado, iniciando animaciones con GSAP.");

  /* 
    Ejemplo 1: Animación sencilla con gsap.to
    Se mueve el elemento 300 píxeles a la derecha, 
    cambia su color de fondo a rojo y utiliza una función de easing.
  */
  gsap.to(animacionElement, {
    duration: 2,
    x: 300,
    backgroundColor: "#e74c3c",
    ease: "power1.inOut",
    onComplete: function() {
      console.log("Animación simple completada.");
    }
  });

  /* 
    Ejemplo 2: Animación desde un estado inicial con gsap.from
    Después de una demora de 2 segundos, el elemento inicia desde 300 píxeles
    a la izquierda y se posiciona en su ubicación original con efecto de rebote.
  */
  gsap.from(animacionElement, {
    duration: 2,
    x: -300,
    delay: 2,
    ease: "bounce.out",
    onComplete: function() {
      console.log("Animación 'from' completada.");
    }
  });

  /* 
    Ejemplo 3: Animación compleja usando un timeline
    Se encadenan varias animaciones: rotación completa, escalado hacia arriba y
    luego un retorno a la escala normal. El timeline se repite indefinidamente y
    se invierte en cada ciclo (efecto yoyo).
  */
  const timeline = gsap.timeline({
    repeat: -1,   // Repetir infinitamente
    yoyo: true,   // Invertir el timeline en cada repetición
    delay: 4      // Inicia el timeline después de 4 segundos
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
});