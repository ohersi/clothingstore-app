import { useState, useEffect } from 'react';
import axios from "axios";
// Components
import Form from '../../components/Form';
// CSS
import './admin.css'

const Admin = ({ products, fetchProducts }) => {
    const [editForm, setEditForm] = useState(false)
    const[productToEdit, setProductToEdit] = useState({})

    useEffect(() => {
        fetchProducts();
    }, [])

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete('')
            fetchProducts();
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (products) => {
        setEditForm(!editForm)
        setProductToEdit(products)
    }

    // console.log(products.data)

    return (
        <>
            <Form 
            fetchProducts={fetchProducts}
            editForm={editForm}
            productToEdit={productToEdit}
            />
            <div className='products-container'> 
            <div id='products-table-title'>PRODUCTS</div>  
            <table className="GeneratedTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image URL</th>
                        <th>Stock</th>
                        <th>Category Name</th>
                        <th>Category ID</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.data?.map((products) => (
                            <tr key={products.id}>
                                <td data-label="Name">{products.name}</td>
                                <td data-label="Description">{products.description}</td>
                                <td data-label="Price">{products.price}</td>
                                <td data-label="ImageURL">
                                    <img className='image' src={products.imageURL} alt="product" />
                                    </td>
                                <td data-label="Stock">{products.stock}</td>
                                <td data-label="CategoryName">{products.category_id.name}</td>
                                <td data-label="CategoryID">{products.category_id.id}</td>
                                <td data-label="Edit">
                                    <span onClick={() => handleEdit(products)}>&#9998;</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>

        </>
    )
}

export default Admin;
