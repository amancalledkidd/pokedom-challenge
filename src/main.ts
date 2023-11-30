import "./styles/style.scss";
import pokemonArray from "./data/pokemon";

// Select HTML elements
const pokemonCardContainer = document.querySelector<HTMLDivElement>('.card-container')
const searchForm = document.querySelector<HTMLFormElement>('#search')
const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const filterSelect = document.querySelector<HTMLSelectElement>('#filter-select')
const resetbutton = document.querySelector<HTMLButtonElement>('#reset-button')

// Check elements have been selected, throw error if not
if (!pokemonCardContainer) {
    throw new Error("Cannot find card container")
}
if (!searchForm || !searchInput) {
    throw new Error("Cannot find search form")
}
if (!filterSelect) {
    throw new Error("Cannot find filter select")
}
if (!resetbutton) {
    throw new Error("Cannot find reset button")
}


// Function to loop through array and display eacch pokemon
const displayAllPokemon = () => {
    pokemonArray.forEach(pokemon => {
        pokemonCardContainer.innerHTML += pokemonCard(pokemon)
    })
}

// Function returns pokemonCard to reduce code bloat
const pokemonCard = (pokemon: Pokemon) => {
    return `<div class="card">
                <img src=${pokemon.sprite} class="card__image"/>
                <div class="card__content"> 
                    <div class="card__heading">${capitalizeName(pokemon.name)}</div>
                    <div class="card__text">${capitalizeName(pokemon.name)} (#${pokemon.id}) is a ${pokemon.types.join(" & ")} type pokemon.</div>
                </div>
            </div>`
}

// Fuction to capitalize pokemon names.
const capitalizeName = (pokemonName : String) => {
    const firstLetter = pokemonName.charAt(0)
    return firstLetter.toUpperCase() + pokemonName.slice(1)
}

//  function to display searched for pokemon
const handlePokemonSearch = (event : Event) => {
    event.preventDefault()
    const pokemonName = searchInput.value
    // not found default in case loop unsuccessful
    let result: string = "Pokemon not found"
    pokemonArray.forEach(pokemon => {
        if (pokemon.name === pokemonName.toLowerCase()) {
            result = pokemonCard(pokemon)
        }
    })
    pokemonCardContainer.innerHTML = result
}

// Type filter function
const handleFilter = (event : Event) => {
    event.preventDefault()
    const filterValue = filterSelect.value
    pokemonCardContainer.innerHTML = ""
    pokemonArray.filter(pokemon => {
        if (pokemon.types.includes(filterValue)) {
            pokemonCardContainer.innerHTML += pokemonCard(pokemon)
        }
    })
}

// reset card container to full pokemonArray
const handleReset = () => {
    pokemonCardContainer.innerHTML = ""
    displayAllPokemon()
}

// start up fuction call to display pokemon
displayAllPokemon()


// Event listeners
searchForm.addEventListener("submit", handlePokemonSearch)
resetbutton.addEventListener("click", handleReset)
filterSelect.addEventListener("change", handleFilter)