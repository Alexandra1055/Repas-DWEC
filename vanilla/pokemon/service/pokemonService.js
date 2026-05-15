import { PokemonModel } from "../model/pokemon.js";
export class PokemonService {
    static MAX_TEAM = 6;
    getPokemonNumber(pokemonEntry) {
        //return pokemonEntry.substring(1, 4).replace(/^0+(?=\d)/, "");// en lugar de replace, paseInt
        return parseInt(pokemonEntry.substring(1, 4));
    }

    async findPokemonByNumber(pokemonNumber) {
        const pokemonFetch = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber);
        const pokemon = await pokemonFetch.json();
        console.log("Pokemon data:", pokemon);
        return this.#clienToPokemon(pokemon);
    }

    findByNameorType(pokemons, txt) {
        const textClean = txt.trim().toLowerCase();
        return pokemons.filter(pokemon =>
            pokemon.nom.toLowerCase().includes(textClean) ||
            pokemon.tipus.filter(t => t.includes(textClean)).length > 0
        );
    }

    afegirPokemon(pokemon) {
        //si esta vacio el localStorage, se inicializa con un array vacio
        if (localStorage.getItem("pokemon") === null) {
            localStorage.setItem("pokemon", JSON.stringify([]));
        }
        const pokemons = JSON.parse(localStorage.getItem("pokemon"));

        if (pokemons.length === PokemonService.MAX_TEAM || pokemons.find(p => p.nom === pokemon.nom)) {
            return false;
        }
        pokemons.push(pokemon);
        localStorage.setItem("pokemon", JSON.stringify(pokemons));
        return true;
    }

    eliminarPokemon(pokemon) {
        const pokemons = JSON.parse(localStorage.getItem("pokemon"));
        const pokemonsActuals = pokemons.filter(p => p.nom !== pokemon.nom);
        localStorage.setItem("pokemon", JSON.stringify(pokemonsActuals));
    }

    getEquipo() {
        const pokemons = JSON.parse(localStorage.getItem("pokemon")) || [];
        return pokemons;
    }


    #clienToPokemon(json) {
        const img = json.sprites.front_default;
        const nom = json.name;
        const tipus = json.types.map(t => t.type.name);
        const hp = json.stats.find(s => s.stat.name === "hp").base_stat;
        const atac = json.stats.find(s => s.stat.name === "attack").base_stat;
        const defensa = json.stats.find(s => s.stat.name === "defense").base_stat;
        const velocitat = json.stats.find(s => s.stat.name === "speed").base_stat;
        const alcada = json.height;
        const pes = json.weight;
        const numero = json.id;

        return new PokemonModel(
            img, nom, tipus, hp, atac, defensa, velocitat, alcada, pes, numero
        );


    }

}