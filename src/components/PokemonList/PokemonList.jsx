import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../../Pokemon/Pokemon";


function PokemonList () {

//     const [Pokemonlist , setpokemonlist] = useState([]);
//     const [isLoading , setIsLoading] = useState(true);
   
//     const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon'); // This is acutall the link of first 20 pokemon.
    
//     const [nextUrl , setNextUrl] = useState('');
//     const [prevUrl , setPrevUrl] = useState('');

  const [PokemonListState , setPokemonListState] = useState({
    PokemonList : [],
    isLoading:true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
    nextUrl:'',
    prevUrl:'',
  });

  async function downloadPokemons(){
    setPokemonListState({ ...PokemonListState , setIsLoading : true });
    const response = await axios.get(PokemonListState.pokedexUrl); // getting the first 20 pokemon through other server using "AXIOS".
    const pokemonResults = response.data.results; // pokemon list data is being stored in pokemonResults in array form.
     
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    setPokemonListState((state)=>({ ...state , nextUrl : response.data.next,prevUrl : response.data.previous  }));
    //iterating over the array of pokemons,and using their URL, to create an array of promises
    //that will download those 20 pokemons.
     const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));

     //passing the promise array to axios.all
     const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data                
    console.log(pokemonData);

    // now iterate on the data of each pokemon, and extract id,name,image,types.
    const PokeListResult = pokemonData.map((pokedata)=>{
        const pokemon = pokedata.data;
        return {
            id: pokemon.id,
            name:pokemon.name , 
            image:pokemon.sprites.other.dream_world.front_default ,
            types:pokemon.types 
        }
    });
    console.log(PokeListResult);
    //setpokemonlist(res);
    // setIsLoading(false);
    setPokemonListState((state)=>({ ...state , Pokemonlist :PokeListResult , isLoading:false }));
  };




    useEffect( () => {
        downloadPokemons();
    }, [PokemonListState.pokedexUrl]);


    return (
      <div className="pokemon-list-wrapper">
         <div>Pokemon List</div>
         <div className="pokemon-wrapper">
            {(PokemonListState.isLoading) ? "  Loading....." : PokemonListState.Pokemonlist.map( (p)=>< Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>) }
            </div>

            <div className="controls">
               <button disabled={PokemonListState.prevUrl==null}  onClick={()=>{ 
                  const UrlToSet = PokemonListState.prevUrl ;
                  setPokemonListState({ ...PokemonListState , pokedexUrl : UrlToSet })
                  }}>Prev</button> {/*  means if previous URL is undefined then button will not work and disabled. */}
                <button disabled={PokemonListState.nextUrl==null } onClick={()=>{
                   const UrlToSet = PokemonListState.nextUrl ;
                  setPokemonListState({ ...PokemonListState , pokedexUrl :UrlToSet })
                }}>Next</button>

            </div>
         
      </div>

    )
}


export default PokemonList;