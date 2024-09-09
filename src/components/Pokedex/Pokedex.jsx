import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
//css import 
import "./Pokedex.css"
function Pokedex(){
 
    return (
        <div className="pokedex-wrapper">
        <h1 id="pokdex-heading">pokedex</h1>
        <Search/>
        <PokemonList/>

        </div>
    )
}

export default Pokedex;