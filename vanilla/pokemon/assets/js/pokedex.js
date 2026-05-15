/**
 * Retorna un array de 151 posicions amb els codis dels Pokemon de la Generacio I (Kanto).
 * Cada element te el format: "#001 | Gen.I | Kanto"
 *
 * @returns {string[]} Array amb 151 codis de Pokemon
 */
export function getPokedexEntries() {
    const entries = [];
    for (let i = 1; i <= 151; i++) {
        const id = String(i).padStart(3, '0');
        entries.push(`#${id} | Gen.I | Kanto`);
    }
    return entries;
}

/**
 * Retorna un array amb els valors seleccionats d'un select multiple.
 * Empreu aquesta funcio ja que per selects multiples, el .value no funciona.
 *
 * @param {HTMLSelectElement} select - El node del tag select
 * @returns {string[]} Array amb els valors seleccionats
 */
export function getSelectValues(select) {
    return Array.from(select.selectedOptions).map(opt => opt.value);
}
