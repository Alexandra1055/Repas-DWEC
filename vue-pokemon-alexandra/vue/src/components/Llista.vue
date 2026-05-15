<script setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(['eliminar']);
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
});


</script>
<template>
    <ol>
        <li><img :src="pokemon.imatge" /></li>
        <li>{{ pokemon.nom }}</li>
        <li>{{ pokemon.tipus.join(', ') }}</li>
        <li>
            <button @click="emit('eliminar', pokemon)">Eliminar</button>
        </li>
    </ol>
</template>
<style scoped>
ol {
    list-style: none;
}
</style>