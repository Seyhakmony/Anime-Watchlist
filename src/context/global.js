import React, {useContext, createContext, useReducer} from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4"

const reducer = (state, action) => {
    switch(action.type){
        case loadAnime:
            return {...state, loading: true}
        case GETPOP:
            return {...state, popularAnime: action.payload, loading: false}
        // case SEARCH:
        //     return {...state, searchResults: action.payload, loading: false}
        // case GETUPC:
        //     return {...state, upcomingAnime: action.payload, loading: false}
        // case GETAIR:
        //     return {...state, airingAnime: action.payload, loading: false}
        // case GETP:
        //     return {...state, pictures: action.payload, loading: false}
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
            ...state,dispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}