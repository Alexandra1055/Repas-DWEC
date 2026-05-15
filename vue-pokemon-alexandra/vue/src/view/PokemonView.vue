<script setup>
import Button from '@/components/Button.vue';
import Seleccio from '@/components/Seleccio.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PokemonService } from '@/service/pokemonService.js';
import Input from '@/components/Input.vue';
import Fila from '@/components/Fila.vue';
import Llista from '@/components/Llista.vue';
import Swal from 'sweetalert2';
const pokemonService = new PokemonService();
const pokemonsActuals = ref([]);
const selectedPokemons = ref([]);
const equip = ref([]);

onMounted(() => {
    equip.value = pokemonService.getEquipo();
});
const pokemonsMostrats = computed(() => {
    if (!inputCerca.value) {
        return pokemonsActuals.value;
    }
    return pokemonService.findByNameorType(pokemonsActuals.value, inputCerca.value);
});
const router = useRouter();
const consultarPokemon = async () => {
    pokemonsActuals.value = [];

    for (const pokemonEntry of selectedPokemons.value) {
        const pokemonNumber = pokemonService.getPokemonNumber(pokemonEntry);
        const pokemon = await pokemonService.findPokemonByNumber(pokemonNumber);
        pokemonsActuals.value.push(pokemon);
    }

    console.log(pokemonsActuals.value);
};
const inputCerca = ref('');
const pokemonsFiltrats = ref([]);
function filtraPokemon(text) {
    inputCerca.value = text;
    pokemonsFiltrats.value = pokemonService.findByNameorType(pokemonsActuals.value, text);
}

const MAX_EQUIP = 6;
function afegirAlEquip(pokemon) {
    if (equip.value.length < MAX_EQUIP) {
        const afegit = pokemonService.afegirPokemon(pokemon);

        if (afegit) {
            equip.value = pokemonService.getEquipo();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El pokemon ja esta a l\'equip',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'L\'equip ja esta ple',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }
}

function eliminarDelEquip(pokemon) {
    pokemonService.eliminarPokemon(pokemon);
    equip.value = pokemonService.getEquipo();
}

function veureImatge(pokemon) {
    const route = router.resolve(`/pokemon/${pokemon.numero}`)
    window.open(route.href, '_blank')
}

const pokemonCount = computed(() => equip.value.length);


</script>
<template>
    <div class="container">
        <aside>
            <h2>Codis Pokemon</h2>
            <Seleccio v-model="selectedPokemons" />
            <Button text="Consultar Pokemon" @click="consultarPokemon" />
        </aside>

        <main>
            <h2>Resultats</h2>

            <!-- Exercici 4: Filtre -->
            <Input @input="filtraPokemon" placeholder="Filtrar per nom o tipus..." />

            <table id="taula-resultats">
                <thead>
                    <tr>
                        <th>Imatge</th>
                        <th>Nom</th>
                        <th>Tipus</th>
                        <th>HP</th>
                        <th>Atac</th>
                        <th>Defensa</th>
                        <th>Vel.</th>
                        <th>Alcada</th>
                        <th>Pes</th>
                        <th>Accions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Exercici 2/3: Resultats de l'API -->
                    <Fila v-for="pokemon in pokemonsMostrats" :key="pokemon.numero" :pokemon="pokemon"
                        @afegir="afegirAlEquip" @ver="veureImatge" />
                </tbody>
            </table>

            <!-- Exercici 7: Grafic amb SweetAlert2 (es mostra com a modal, no cal element aqui) -->
        </main>
    </div>

    <section id="seccio-equip">
        <h2>El meu Equip Pokemon <span id="equip-count">({{ pokemonCount }}/6)</span></h2>
        <div id="llista-equip">
            <!-- Exercici 5: Equip Pokemon carregat des de localStorage -->
            <Llista v-for="pokemon in equip" :key="pokemon.numero" :pokemon="pokemon" @eliminar="eliminarDelEquip" />
        </div>
    </section>
</template>
<style scoped></style>