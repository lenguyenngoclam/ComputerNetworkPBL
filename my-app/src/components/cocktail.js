import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Cocktail({ image, info, id, name, glass }) {
    const { addDrinkToCart } = useGlobalContext();
    const handleAdd = (event) => {
        event.preventDefault();
        addDrinkToCart(id);
    }
    return (
        <article className='cocktail'>
            <div className='img-container'>
                <img src={image} alt={name} />
            </div>
            <div className='cocktail-footer'>
                <h3>{name}</h3>
                <h4>{glass}</h4>
                <p>{info}</p>
                <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
                    Details
                </Link>
                <button type="button" className="btn btn-primary btn-add"
                    onClick={handleAdd}>Add to Cart</button>
            </div>
        </article>
    );    
}

export default Cocktail;