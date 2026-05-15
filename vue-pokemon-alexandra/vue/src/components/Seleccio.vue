<script setup>
import { PokemonService } from '@/service/pokemonService.js';
import { ref } from 'vue';
const pokemonService = new PokemonService();
const pokemonList = pokemonService.getPokedexEntries();
const selectedPokemons = ref([]);

/*
Joan: es lo mismo pero traducimos lo que hicimos
const pokemonsEntries = ref([]);
(()=> {
    const pokemonService = new PokemonService();
    
    for(const pokemonEntry of getPokedexEntries()) {
        const pokemonNumber = pokemonService.getPokemonNumber(pokemonEntry);
        pokemonsEntries.value.push({entry:pokemonEntry,value:pokemonNumber});
    }
})();
y en el template similar: <options v-for="pokemon in pokemonsEntries" :key="pokemon.value" :value="pokemon.value">{{pokemon.entry}}</option>
*/
</script>
<template>
    <select v-model="selectedPokemons" id="selector" multiple size="15">
        <!-- Exercici 1: Omplir amb les opcions de getPokedexEntries() -->
        <option v-for="pokemon in pokemonList" :key="pokemon" :value="pokemon">
            {{ pokemon }}
        </option>
    </select>
</template>
<style scoped></style>