import React, {useContext, createContext, useReducer} from "react";
// import AnimeInfo from "../components/AnimeInfo";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4"

const reducer = (state, action) => {
    switch(action.type){
        case loadAnime:
            return {...state, loading: true}
        case GETPOP:
            return {...state, popularAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchR: action.payload, loading: false}
        case GETUPC:
            return {...state, upanime: action.payload, loading: false}
        case GETAIR:
            return {...state, airanime: action.payload, loading: false}

        default:
            return state;
        
    }
};

const loadAnime = "LOADING";
const SEARCH = "SEARCH";
const GETPOP = "GETPOP";
const GETUPC = "GETUPC";
const GETAIR = "GETAIR";


export const GlobalContextProvider = ({children}) => {
    
    const intial = {
        popularAnime: [],
        upcomingAnime: [],
        onair: [],
        pics: [],
        isSearch: false,
        searchR: [],
        loading: false,

    }

    const [state, dispatch] = useReducer(reducer, intial)
    const [search, setSearch] = React.useState('')

    const handleC = (e) =>{
      setSearch(e.target.value);
      if(e.target.value ===''){
        // dispatch({type: GETPOP, payload: []})
        state.isSearch = false;
      }
    }
    
    const handleS = (e)=> {
        e.preventDefault();
        if(search){
            searchingA(search);
            state.isSearch = true;
        }
        else{
            state.isSearch = false;
            alert('Please enter valid search')
        }
    }
    

    const upcomingA = async() => {
        dispatch({type: loadAnime})
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({type: GETUPC, payload: data.data})
    }


    const airA = async () => {
        dispatch({type: loadAnime})
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GETAIR, payload: data.data})
    }


    //searching
    const searchingA = async(anime) => {
        dispatch({type: loadAnime})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }





    const getPopular = async () => {
        dispatch({type: loadAnime})
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
        const data = await response.json()
        // console.log(data.data)
        dispatch({type: GETPOP, payload: data.data })
    }

    React.useEffect(() => {
        getPopular();
    }, [])

    return(
        <GlobalContext.Provider value={{
            ...state,dispatch, handleC, handleS, searchingA, search, upcomingA, airA, 
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}