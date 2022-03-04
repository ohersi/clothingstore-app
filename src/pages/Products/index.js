import { useEffect } from "react";

const Products = ({ products, fetchProducts }) => {
    
    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products)
    return (
        <div>
            Display All Products
        </div>
    );
}

export default Products;
