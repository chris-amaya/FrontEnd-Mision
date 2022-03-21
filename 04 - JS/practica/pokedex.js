const submit = document.getElementById("submit");
const pokedexInfo = document.getElementById("pokedex-info");

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        const templateString = getTemplateString(data);
        pokedexInfo.innerHTML = templateString;
      }
    });
};

function getTemplateString(data) {
  const { name } = data;
  const img = data.sprites.front_default;
  const tipo = data.types[0].type.name;

  let string = "";

  data.stats.forEach((stat) => {
    string += `
    <div class="stat">
    <div class="header">
      <p>${stat.stat.name}</p>
      <p>${stat.base_stat}</p>
    </div>
    <div class="percentage">
      <div class="percentage-bar" style='width: ${stat.base_stat}%'></div>
    </div>
  </div>`;
  });

  return `
    <div class="main-info">
          <p>Nombre: ${name}</p>
          <img
            src="${img}"
            alt=""
          />
          <p>Tipo de pokemon: ${tipo}</p>
        </div>
        <div>
          <h3>Stats</h3>
          <div class="stats">
            ${string}
          </div>
        </div>`;
}

submit.addEventListener("click", fetchPokemon);
