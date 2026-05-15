import { createRouter, createWebHistory } from 'vue-router';
import ConsultarPokemon from '@/view/consultarPokemon.vue';
import MainLayout from '@/view/MainLayout.vue';
import PokemonView from '@/view/PokemonView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'pokemon-list',
                    component: PokemonView,
                },
                {
                    path: '/pokemon/:numero',
                    name: 'pokemon-detail',
                    component: ConsultarPokemon,
                    props: true,
                },
            ],
        },

    ],
})

export default router