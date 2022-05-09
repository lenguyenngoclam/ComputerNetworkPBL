import React from "react";
import { useGlobalContext } from "../context";
import Loading from "./loading";
import Cocktail from "./cocktail";

function CocktailList() {
    const { isLoading, cocktails } = useGlobalContext();

    if (isLoading)
        return <Loading />
    if (cocktails.length < 1) {
        return (
            <h2 className="section-title"> 
                no cocktails match
            </h2>
        );
    }

    return (
        <section className="section">
            <h2 className='section-title'>cocktails</h2>
            <div className='cocktails-center'>
                {cocktails.map((item) => {
                    return <Cocktail key={item.id} {...item} />
                })}
            </div>
        </section>
    );
}

export default CocktailList;