const image = document.getElementById("pokemon-image");
const name = document.getElementById("pokemon-name");
const type = {
  container: document.getElementById("type-container"),
  text: document.getElementById("type-text"),
};

const percentages = {
  ps: document.getElementById("ps-percent"),
  atk: document.getElementById("atk-percent"),
  def: document.getElementById("def-percent"),
  spa: document.getElementById("spa-percent"),
  spd: document.getElementById("spd-percent"),
  spe: document.getElementById("spe-percent"),
};

const submit = document.getElementById("submit");
const pokedexInfo = document.getElementById("pokedex-info");

submit.addEventListener(
  "input",
  debounce(function (event) {
    fetchPokemon(event.target.value).then((data) => {
      if (data) {
        name.textContent = data.name;
        image.setAttribute("href", data.sprites.front_default);
        type.text.textContent = data.type;

        function getTotalPercentage(stat) {
          return (134 * stat) / 100;
        }

        function getPosY(totalPercentage) {
          return 1207 - totalPercentage;
        }

        function setPercentage(prop, stat) {
          const total = getTotalPercentage(stat);
          prop.setAttribute("height", total);
          prop.setAttribute("y", getPosY(total));
        }

        setPercentage(percentages.ps, data.stats[0].base_stat);
        setPercentage(percentages.atk, data.stats[1].base_stat);
        setPercentage(percentages.def, data.stats[2].base_stat);
        setPercentage(percentages.spa, data.stats[3].base_stat);
        setPercentage(percentages.spd, data.stats[4].base_stat);
        setPercentage(percentages.spe, data.stats[5].base_stat);
      } else {
        name.textContent = "Pokemon has not been found";
      }
    });
  }, 500)
);

const fetchPokemon = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
      } else {
        return res.json();
      }
    })

    .then((data) => {
      if (data) {
        return {
          name: data.name,
          type: data.types[0].type.name,
          stats: data.stats,
          sprites: data.sprites,
          id: data.id,
        };
      }
    });
};

function debounce(fn, wait = 1) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, ...args), wait);
  };
}
