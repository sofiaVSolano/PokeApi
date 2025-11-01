import { createContext, useReducer, useContext, useEffect } from "react";
import { fetchPokemons, fetchPokemonByName } from "../api/pokeService";

const PokemonStateContext = createContext();
const PokemonDispatchContext = createContext();

const initialState = {
    pokemons: [],
    selected: null,
    loading: false,
    error: null
};

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, pokemons: action.payload };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "SELECT":
            return { ...state, selected: action.payload };
        case "CLEAR_SELECT":
            return { ...state, selected: null };
        default:
            return state;
    }
}

export function PokemonProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function load() {
            dispatch({ type: "FETCH_START" });
            try {
                const data = await fetchPokemons(1000);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({
                    type: "FETCH_ERROR",
                    payload: err.message || "Error"
                });
            }
        }
        load();
    }, []);

    async function selectByName(name) {
        dispatch({ type: "FETCH_START" });
        try {
            const p = await fetchPokemonByName(name);
            dispatch({ type: "SELECT", payload: p });
            dispatch({ type: "FETCH_SUCCESS", payload: state.pokemons });
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: err.message });
        }
    }

    return (
        <PokemonStateContext.Provider value={state}>
            <PokemonDispatchContext.Provider value={{ dispatch, selectByName }}>
                {children}
            </PokemonDispatchContext.Provider>
        </PokemonStateContext.Provider>
    );
}

export function usePokemonState() {
    return useContext(PokemonStateContext);
}

export function usePokemonActions() {
    return useContext(PokemonDispatchContext);
}
