import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState({}); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const getPokemon = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemons((prevPokemons) => ({ ...prevPokemons, [id]: response.data })); 
    } catch (error) {
      console.error("Error fetching Pokemon data:", error); 
    }
  };

  const generatePokemonIds = () => Array(150).fill(null).map((_, index) => index + 1);

  // Function to filter Pokemon based on search query (improved readability)
  const filteredPokemons = Object.values(pokemons).filter((pokemon) => {
    const normalizedName = pokemon.name.toLocaleLowerCase();
    const normalizedSearchQuery = searchQuery.toLocaleLowerCase();
    return (
      normalizedName.includes(normalizedSearchQuery) ||
      pokemon.id === parseInt(searchQuery)
    );
  });


  useEffect(() => {
    const pokemonIds = generatePokemonIds();
    pokemonIds.forEach(getPokemon);
  }, []);

  return (
    <div className="container">
      <h1>Pokedex</h1>

      <div className="busca-container">
        <MagnifyingGlass size={40} />
        <input
          className="busca"
          type="search"
          placeholder="pesquisar Pokemons"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <ul className="pokemons">
        {filteredPokemons.map(({ id, name, types }) => (
          <li key={id} className={`card ${types[0].type.name}`}> {/* Use key for efficient re-rendering */}
            <img
              className="card-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}   

              alt={name}   

            />
            <h2>
              {id}. {name}
            </h2>
            <p className="type">{types.map((item) => item.type.name).join(" || ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;