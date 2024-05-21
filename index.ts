const form = document.querySelector("#search-form > form");

const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("precisa ter mais que 3 letras");
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=fb207054c06509abfebd463d838b3e42&lang=pt_br&units=metric`
  );

  const data = await response.json();

  console.log(data);

  const infos = {
    temperatura: Math.round(data.main.temp),
    cidade: data.name,
    icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };

  sectionTempoInfo.innerHTML = `
  <div class="tempo-data">
          <h2>${infos.cidade}</h2>
          <span>${infos.temperatura} °C</span>
        </div>
        <img src="${infos.icone}" />
      `;
});
