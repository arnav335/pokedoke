const fetchPokemon = async (pokemon, cb) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const pokemonData = await response.json();
  cb(pokemonData);
};

const renderPokemon = () => {
  const pokemon = document.querySelector(".search").value;
  fetchPokemon(pokemon, (data) => {
    const title = document.querySelector(".title");
    title.innerHTML = data.name[0].toUpperCase()+data.name.slice(1);
    const image = document.querySelector(".image")
    image.src = data.sprites.other.home.front_default
    console.log(data);
    console.log(data.sprites.other.home.front_default);
  });
};
