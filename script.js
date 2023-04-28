const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 50;

async function getPokemonList(offset) {
	try {
		const response = await fetch(`${BASE_URL}/pokemon?limit=${LIMIT}&offset=${offset}`);
		const data = await response.json();
        return data.results;
	} catch (error) {
		console.log(error);
	}
}

async function getPokemonDetails(pokemonUrl) {
	try {
		const response = await fetch(pokemonUrl);
		const data = await response.json();
        console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");


function displayPokemonList(pokemonList) {
	const pokemonContainer = document.getElementById("pokemon-container");
	pokemonContainer.innerHTML = "";
	pokemonList.forEach(async (pokemon) => {
		const pokemonDetails = await getPokemonDetails(pokemon.url);
		const pokemonDiv = document.createElement("div");
		pokemonDiv.classList.add("pokemon-card");
        
		pokemonDiv.innerHTML = `
			<div class="pokemon-img-container">
            <img src="${pokemonDetails.sprites.other["official-artwork"].front_default}" alt="${pokemonDetails.name}" crossorigin="anonymous" class="card-img-top">
			</div>
			<div class="pokemon-info-container">
				<h2 class="pokemon-name card-title">${pokemonDetails.name}</h2>
				<p class="card-text"><strong>Abilities:</strong> ${pokemonDetails.abilities.map((ability) => ability.ability.name).join(", ")}</p>
				<p class="card-text"><strong>Moves:</strong> ${pokemonDetails.moves.map((move) => move.move.name).join(", ")}</p>
				<p class="card-text"><strong>Weight:</strong> ${pokemonDetails.weight}</p>
			</div>
		`;
		pokemonContainer.appendChild(pokemonDiv);
	});
}


function displayPaginationButtons() {
	const paginationContainer = document.getElementById("pagination-container");
	paginationContainer.innerHTML = "";
	for (let i = 0; i < 20; i++) {
		const button = document.createElement("button");
		button.innerText = i + 1;
		button.addEventListener("click", () => {
			getPokemonList(i * LIMIT).then((pokemonList) => {
				displayPokemonList(pokemonList);
			});
		});
		paginationContainer.appendChild(button);
	}
}

getPokemonList(0).then((pokemonList) => {
	displayPokemonList(pokemonList);
	displayPaginationButtons();
});
