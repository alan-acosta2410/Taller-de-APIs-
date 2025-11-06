const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");
const btn = document.getElementById("btn");

function obtenerChiste() {
  setup.textContent = "Cargando...";
  punchline.textContent = "";

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      // Traducir el setup
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.setup)}&langpair=en|es`)
        .then(res => res.json())
        .then(traducido1 => {
          setup.textContent = traducido1.responseData.translatedText;

          // Traducir el punchline
          fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.punchline)}&langpair=en|es`)
            .then(res => res.json())
            .then(traducido2 => {
              punchline.textContent = traducido2.responseData.translatedText;
            });
        });
    })
    .catch(() => {
      setup.textContent = "Error al obtener el chiste 😅";
    });
}

btn.addEventListener("click", obtenerChiste);
