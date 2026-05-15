<script setup>

import { ref, onMounted } from 'vue';
import { PokemonService } from '@/service/pokemonService.js';
const pokemonService = new PokemonService();
const pokemon = ref(null)
const props = defineProps({
    numero: {
        type: String,
        required: true
    }
});
onMounted(async () => {
    pokemon.value = await pokemonService.findPokemonByNumber(props.numero);
})
</script>
<template>
    <div v-if="pokemon">
        <h1>{{ pokemon.nom }}</h1>
        <img :src="pokemon.imatge" />
    </div>
</template>
<style scoped></style>