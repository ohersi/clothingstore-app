import { useEffect } from "react";
// Components
import Sidebar from "../../components/Sidebar";
// CSS
import './products.css';

const Products = ({ products, categories, fetchProducts, fetchCategories }) => {

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // console.log(products)
    return (
        <>
        <div id="products-main">
             <Sidebar categories={categories}/>
            <div id="products-container">
                {
                    products.data?.map(product => (
                        <div className="products-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <img className='products-img' src={product.imageURL} alt={`${product.name} product`} />
                            <h4>{product.price}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
       
        </>
    );
}

export default Products;
