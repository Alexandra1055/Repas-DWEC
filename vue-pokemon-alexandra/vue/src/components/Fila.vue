<script setup>
import { defineProps, defineEmits } from "vue";
import Swal from 'sweetalert2';

const emit = defineEmits(['afegir', 'ver']);

const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    }
});

function mostrarGrafico() {
const pokemon = props.pokemon;
    Swal.fire({
        imageUrl: pokemon.imatge,
        title: pokemon.nom,
        html: `
                    <ul style="list-style-type: none;">
                        <li>Tipus: ${pokemon.tipus.join(", ")}</li>
                        <li>HP: ${pokemon.hp}</li>
                        <li>Atac: ${pokemon.atac}</li>
                        <li>Defensa: ${pokemon.defensa}</li>
                        <li>Velocitat: ${pokemon.velocitat}</li>
                        <li>Alçada: ${pokemon.alcada}</li>
                        <li>Pes: ${pokemon.pes}</li>
                    </ul>
                    `,
    });
}

</script>
<template>
    <tr>
        <td><img :src="pokemon.imatge" /></td>
        <td @click="mostrarGrafico">{{ pokemon.nom }}</td>
        <td>{{ pokemon.tipus.join(', ') }}</td>
        <td>{{ pokemon.hp }}</td>
        <td>{{ pokemon.atac }}</td>
        <td>{{ pokemon.defensa }}</td>
        <td>{{ pokemon.velocitat }}</td>
        <td>{{ pokemon.alcada }}</td>
        <td>{{ pokemon.pes }}</td>
        <td>
            <button @click="emit('afegir', pokemon)">Afegir a l'equip</button>
            <button @click="emit('ver', pokemon)">Veure imatge</button>
        </td>
    </tr>
</template>
<style scoped></style>