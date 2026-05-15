/**
 * La Pokedex Digital - Entry Point
 *
 * Importeu les funcions necessaries des de pokedex.js:
 * import { getPokedexEntries, getSelectValues } from './pokedex.js';
 *
 * Recordeu emprar l'estructura MVC amb ES6 modules.
 */
import { getPokedexEntries, getSelectValues } from '../assets/js/pokedex.js';
import { PokemonService } from '../service/pokemonService.js';

//IIFE
(() => {

    const pokemonService = new PokemonService();
    //console.log("Pokedex entries:", getPokedexEntries());
    //1. a) montar options
    for (const pokedexEntry of getPokedexEntries()) {
        const pokemonNumber = pokemonService.getPokemonNumber(pokedexEntry);
        console.log("Pokemon number:", pokedexEntry, pokemonNumber);
        const option = document.createElement("OPTION");
        option.innerHTML = pokedexEntry;
        option.value = pokemonNumber;

        document.querySelector("#selector").appendChild(option);
    }

    let pokemonsActuals = [];
    //1. b) Boto cerca
    const botoCerca = document.querySelector("#btn-consultar");
    botoCerca.addEventListener("click", async () => {
        const selector = document.querySelector("#selector");
        const selectedPokemons = getSelectValues(selector);

        /*console.log("Botó cercar clicat");
        console.log("Pokemons seleccionats:", selectedPokemons);
        //TODO: se tiene que arreglar el await en el for
        for(const pokemonNum of selectedPokemons){
            //TODO_ este await esta mal 
            const pokemon = await pokemonService.findPokemonByNumber(pokemonNum);
            console.log("Pokemon data:", pokemon);
        }*/
        const pokemons = selectedPokemons.map(p => pokemonService.findPokemonByNumber(p));
        pokemonsActuals = await Promise.all(pokemons);
        pintarTaula(pokemonsActuals);
    });

    //2. Pintar tabla
    function pintarTaula(pokemons) {
        const bodyTaula = document.querySelector("tbody");
        //reset de la taula
        bodyTaula.innerHTML = "";

        for (const pokemon of pokemons) {
            const tr = document.createElement('tr');

            const imatgeCol = document.createElement('td');
            const img = document.createElement('IMG');
            const nomCol = document.createElement('td');
            const tipusCol = document.createElement('td');
            const hpCol = document.createElement('td');
            const atacCol = document.createElement('td');
            const defensaCol = document.createElement('td');
            const velCol = document.createElement('td');
            const alcadaCol = document.createElement('td');
            const pesCol = document.createElement('td');
            img.src = pokemon.imatge; //o sin get directamente pokemon.imatge
            nomCol.innerHTML = pokemon.nom;
            tipusCol.innerHTML = pokemon.tipus;
            hpCol.innerHTML = pokemon.hp;
            atacCol.innerHTML = pokemon.atac;
            defensaCol.innerHTML = pokemon.defensa;
            velCol.innerHTML = pokemon.velocitat;
            alcadaCol.innerHTML = pokemon.alcada;
            pesCol.innerHTML = pokemon.pes;

            const accionsCol = document.createElement('td');
            const botoAfegir = document.createElement('button');
            botoAfegir.innerHTML = "Afegir a l'equip";
            accionsCol.appendChild(botoAfegir);
            botoAfegir.addEventListener("click", () => {

                const text = "Vols afegir " + pokemon.nom + " al teu equip?";
                if ((confirm(text)) === true) {
                    const pokemonAfegit = pokemonService.afegirPokemon(pokemon);
                    if (pokemonAfegit) {
                        afegirEquip();
                    } else {
                        alert("No es pot afegir el pokemon a l'equip");
                    }
                } else {
                    alert("No s'ha confirmat");
                }
            });
            const botonImg = document.createElement("button");
            botonImg.textContent = "Veure Imatge";
            botonImg.addEventListener("click", () => {
                //window.open(pokemon.imatge,"_blank");
                console.log("Pokemon clicado:", pokemon);
                console.log("Número:", pokemon.numero);
                window.open(`./pokemon.html?numero=${pokemon.numero}`, "_blank");
            });


            nomCol.addEventListener("click", () => {
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
            });
            accionsCol.appendChild(botonImg);
            imatgeCol.append(img);
            tr.append(imatgeCol, nomCol, tipusCol, hpCol, atacCol, defensaCol, velCol, alcadaCol, pesCol, accionsCol);
            bodyTaula.append(tr);
        }
    }

    //4. input de búsqueda
    const inputCerca = document.querySelector("#filtre");
    inputCerca.addEventListener("input", () => {
        const pokemonsFiltrats = pokemonService.findByNameorType(pokemonsActuals, inputCerca.value);
        pintarTaula(pokemonsFiltrats);
    });

    //5.afegir a l'equip
    function afegirEquip() {
        const equipLlista = document.querySelector("#llista-equip");
        const equipCount = document.querySelector("#equip-count");

        equipLlista.innerHTML = "";
        const ul = document.createElement("ul");
        ul.style.listStyleType = "none";
        const pokemonsEquip = pokemonService.getEquipo();
        equipCount.innerHTML = `(${pokemonsEquip.length}/6)`;
        for (const pokemon of pokemonsEquip) {
            const liNom = document.createElement("li");
            const liTipus = document.createElement("li");
            const liImatge = document.createElement("li");
            const img = document.createElement("IMG");

            img.src = pokemon.imatge;
            liImatge.appendChild(img);
            liNom.innerHTML = pokemon.nom;
            liTipus.innerHTML = pokemon.tipus;

            const botoEliminar = document.createElement("button");
            botoEliminar.innerHTML = "Eliminar";
            botoEliminar.addEventListener("click", () => {
                pokemonService.eliminarPokemon(pokemon);
                afegirEquip();
            });

            liImatge.appendChild(botoEliminar);
            ul.appendChild(liImatge);
            ul.appendChild(liNom);
            ul.appendChild(liTipus);
        }
        equipLlista.appendChild(ul);
    }
    afegirEquip();
})();
