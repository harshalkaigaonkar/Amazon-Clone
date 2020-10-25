import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

const Product = ({ id, title, image, price, rating }) => {
    const [{ }, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id,
                title,
                image,
                price,
                rating,
            }
        })
    }
    return (
        <div className='product'>
            <div className='product_info'>
                <p>
                    {title}
                </p>
                <p className='product_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>
                            <span role='img' aria-label='emoji_star'>⭐</span>
                        </p>
                    ))}
                </div>
                <div className='product_image_button'>
                    <img
                        className='product_image'
                        src={image}
                        alt='product_image'
                    />
                    <button onClick={addToBasket}>Add To Basket</button>
                </div>
            </div>
        </div>
    )
}

export default Product
