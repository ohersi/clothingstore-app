import React from 'react';
// CSS
import './singleItem.css'

const SingleItem = ({productSelected}) => {
    console.log(productSelected)
    return (
        <>
           <div className="item-container">
               <h1>{productSelected.name}</h1>
               <img className='item-img' src={productSelected.imageURL} alt={`${productSelected.name}-product`} />
               </div> 
        </>
    );
}

export default SingleItem;
