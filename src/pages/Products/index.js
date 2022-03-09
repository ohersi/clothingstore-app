import { useState, useEffect } from "react";
// Components
import Sidebar from "../../components/Sidebar";
import { Link } from 'react-router-dom';
// CSS
import './products.css';

const Products = ({ products, categories, fetchProducts, fetchCategories, setProductSelected }) => {

    const [test, setTest] = useState('COLLECTION')
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const [collection, setCollection] = useState(products.data);

    const filterByCategory = (category_id) => {
        const filteredList = products?.data.filter((product) => {
            return product?.category_id.name === category_id;
        });
        setCollection(filteredList);
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setCollection(products.data)
    //     }, 100);
    // }, []);



    console.log(collection)

    return (
        <>
            <div id="products-main">
                <Sidebar
                    categories={categories}
                    products={products.data}
                    setCollection={setCollection}
                    filterByCategory={filterByCategory}
                    setTest={setTest}
                />
                <div id="products-container">
                    <div id="products-title">{test}</div>
                    <div className="products-grid">
                           { 
                    collection == undefined ? <h1>Loading</h1> :
                        collection.map(product => (
                            <div className="products-card" onClick={() => setProductSelected(product)} key={product.id}>
                                <Link className="products-name" to={`/product/${product.name}`}>
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
            </div>

        </>
    );
}

export default Products;
