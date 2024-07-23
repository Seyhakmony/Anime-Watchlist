import React, {useContext, createContext, useReducer, useEffect} from "react";
// import AnimeInfo from "../components/AnimeInfo";
// import watchApp from "./watchApp";

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
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw&type=tv&type=movie`);
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
            ...state, 
            dispatch
            , handleC, handleS, searchingA, search, upcomingA, airA,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}



const initialState = {
    watchlist: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
    watched: localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : [],
};

// Create context
const StoreGlobalContext = createContext(initialState);

// Reducer function
const watchApp = (state, action) => {
    switch (action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
            };
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    (movie) => movie.mal_id  !== action.payload
                ),
            };
        case "ADD_MOVIE_TO_WATCHED":
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    (movie) => movie.mal_id  !== action.payload.mal_id 
                ),
                watched: [...state.watched, action.payload],
            };

        case "REMOVE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(
                    (movie) => movie.mal_id !== action.payload),
            };
        default:
            return state;
    }
};

// Provider component
export const StoreGlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(watchApp, initialState);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
    }, [state]);

    // Actions
    const addMovieToWatchlist = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    const removeMovieFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
    };

    const addMovieToWatched = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
    };


    const removeFromWatched = (id) => {
        dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
    };

    return (
        <StoreGlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addMovieToWatchlist,
                removeMovieFromWatchlist,
                addMovieToWatched,
                removeFromWatched,
            }}
        >
            {children}
        </StoreGlobalContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export const useStoreGlobalContext = () => {
    return useContext(StoreGlobalContext);
};