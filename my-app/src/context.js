import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState, useReducer } from "react";
import reducer from "./reducer";
import foodData from "./assets/food-data";

const AppContext = React.createContext();

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const initialState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0
};

function AppProvider({ children }) {
    
    const [cartState, dispatch] = useReducer(reducer, initialState);

    const clearCart = () => dispatch({ type: "CLEAR_CART" });
    const removeItem = (id) => dispatch({ type: "REMOVE", payload: id });
    const increaseAmount = (id) => dispatch({ type: "INCREASE", payload: id });
    const decreaseAmount = (id) => dispatch({ type: "DECREASE", payload: id });
    const addDrinkToCart = (id) => fetchDrink(id);
    const addFoodToCart = (id) => fetchFood(id);

    const [isLoading, setIsLoading] = useState(false);
    const [searchTerms, setSearchTerms] = useState('a');
    const [cocktails, setCocktails] = useState([]);

    const fetchFood = async (id) => {
        setIsLoading(true);
        const cartItem = cartState.cart ? cartState.cart.find((item) => item.id === id, null) : null;
        if (!cartItem) {
            let newFood = foodData.find((item) => item.id === id);
            newFood = { ...newFood, amount: 1 };
            if (cartState.state)
                dispatch({ type: "ADD_FOOD", payload: { food: newFood, cartEmpty: true } });
            else
                dispatch({ type: "ADD_FOOD", payload: { food: newFood, cartEmpty: false } });
        } else
            dispatch({ type: "INCREASE", payload: id });
        setIsLoading(false);
    }

    const fetchDrink = async (id) => {
        setIsLoading(true);
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        const cartItem = await cartState.cart ? cartState.cart.find((item) => item.id === id, null) : null;
        if (!cartItem) { 
            const {
                idDrink: id,
                strDrink: name,
                strDrinkThumb: image,
                strAlcoholic: info,
                strCategory: category,
                strGlass: glass,
                strInstructions: instructions,
                strIngredient1,
                strIngredient2,
                strIngredient3,
                strIngredient4,
                strIngredient5,
            } = data.drinks[0]
            const ingredients = [
                strIngredient1,
                strIngredient2,
                strIngredient3,
                strIngredient4,
                strIngredient5,
            ]
            const newCocktail = {
                id,
                name,
                image,
                info,
                category,
                glass,
                instructions,
                ingredients,
                price: 100,
                amount: 1
            }
            if(cartState.state)
                dispatch({ type: "ADD_DRINK", payload: { cocktail: newCocktail, cartEmpty: true } });
            else
                dispatch({ type: "ADD_DRINK", payload: { cocktail: newCocktail, cartEmpty: false } });    
        } else {
            dispatch({ type: "INCREASE", payload: id });
        }
        setIsLoading(false);
    }

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const newUrl = `${url}${searchTerms}`;
        const response = await fetch(newUrl);
        const data = await response.json();
        const { drinks } = data;
        
        if (drinks) {
            const newCocktails = drinks.map((drink) => {
                const {
                    idDrink,
                    strDrink,
                    strDrinkThumb,
                    strAlcoholic,
                    strGlass,
                } = drink;
        
                return {
                    id: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    info: strAlcoholic,
                    glass: strGlass,
                };
            });
            setCocktails(newCocktails);
        } else
            setCocktails([]);
        setIsLoading(false);
    }, [searchTerms]);

    useEffect(() => {
        fetchData();
    }, [searchTerms, fetchData]);
    useEffect(() => {
        dispatch({ type: "GET_TOTAL" });
    }, [cartState.cart]);

    return (
        <AppContext.Provider
            value={{
                ...cartState,
                cocktails,
                fetchData,
                searchTerms,
                setSearchTerms,
                isLoading,
                clearCart, removeItem,
                increaseAmount, decreaseAmount,
                addDrinkToCart,
                foodData, addFoodToCart
            }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };