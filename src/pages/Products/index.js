import { useState, useEffect } from "react";
// Components
import Sidebar from "../../components/Sidebar";
import { Link } from 'react-router-dom';
// CSS
import './products.css';

const Products = ({ products, categories, fetchProducts, fetchCategories, setProductSelected }) => {

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const [collection, setCollection] = useState([])
    const filterByCategory = (category_id) => {
        const filteredList = products?.data.filter((product) => {
            return product?.category_id.name === category_id;
        });
        setCollection(filteredList);
    }
    // setTimeout(() => {
    //     setCollection(products.data)
    // }, 100);

    console.log(collection)

    return (
        <>
            <div id="products-main">
                <Sidebar
                    categories={categories}
                    products={products.data}
                    setCollection={setCollection}
                    filterByCategory={filterByCategory}
                />
                <div id="products-container">
                    {
                        collection?.map(product => (
                            <div className="products-card" onClick={() => setProductSelected(product)} key={product.id}>
                                <Link className="test" to={`/product/${product.name}`}>
                                    <img className='products-img' src={product.imageURL} alt={`${product.name} product`} />
                                    <div className="card-info">
                                        <h3>{product.name}</h3>
                                        <h4>${product.price}</h4>
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
