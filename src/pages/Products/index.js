import { useState, useEffect } from "react";
// Components
import Sidebar from "../../components/Sidebar";
import { Link } from 'react-router-dom';
// CSS
import './products.css';
import SingleItem from "../SingleItem";

const Products = ({ products, categories, fetchProducts, fetchCategories, setProductSelected }) => {

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // console.log(products)

    return (
        <>
            <div id="products-main">
                <Sidebar categories={categories} />
                <div id="products-container">
                    {
                        products.data?.map(product => (
                            <div className="products-card" onClick={() => setProductSelected(product)}>
                                <Link to={`/product/${product.name}`} key={product.id} >
                                    <div className="card-info">
                                        <h3>{product.name}</h3>
                                        <img className='products-img' src={product.imageURL} alt={`${product.name} product`} />
                                        <h4>{product.price}</h4>
                                    </div>
                                </Link>
                            </div>

                        ))
                    }
                </div>
            </div>

        </>
    );
}

export default Products;
