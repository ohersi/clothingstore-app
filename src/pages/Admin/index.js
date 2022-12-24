import { useState, useEffect } from 'react';
import axios from "axios";
// Components
import Form from '../../components/Form';
// CSS
import './admin.css'

const Admin = ({ products, categories, fetchProducts, fetchCategories }) => {
    const [editForm, setEditForm] = useState(false)
    const [toggleSelected, setToggleSelected] = useState(false)
    const [productToEdit, setProductToEdit] = useState({})
    const [categoryToEdit, setCategoryToEdit] = useState({})

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`https://ecommerce-backend-production-b06b.up.railway.app/api/v1/products/${id}`)
            fetchProducts();
            console.log("product deleted")
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`https://ecommerce-backend-production-b06b.up.railway.app/api/v1/category/${id}`)
            fetchCategories();
            console.log("category deleted")
        }
        catch (error) {
            console.error(error)
        }
    }


    const handleProductEdit = (products) => {
        setEditForm(!editForm)
        setProductToEdit(products)
        setCategoryToEdit([])
    }

    const handleCategoryEdit = (categories) => {
        setEditForm(!editForm)
        setCategoryToEdit(categories)
        setProductToEdit([])
    }

    return (
        <><div id="admin-main">
            <Form
                fetchProducts={fetchProducts}
                fetchCategories={fetchCategories}
                editForm={editForm}
                productToEdit={productToEdit}
                categoryToEdit={categoryToEdit}
                toggleSelected={toggleSelected}
            />
            <div>
                <button onClick={() => setToggleSelected(!toggleSelected)}>
                    {toggleSelected ? 'SELECT CATEGORY' : 'SELECT PRODUCTS'}
                </button>
            </div>
            <div className='products-container'>
                <div id='products-table-title'>PRODUCTS</div>
                <table className="GeneratedTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image URL</th>
                            <th>Stock</th>
                            <th>Category Name</th>
                            <th>Category ID</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>SELECTED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.data?.map((products) => (
                                <tr key={products.id}>
                                    <td data-label="ID">{products.id}</td>
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
                                        <span onClick={() => handleProductEdit(products)}>&#9998;</span>
                                    </td>
                                    <td data-label="Delete">
                                        <span onClick={() => deleteProduct(products.id)}>X</span>
                                    </td>
                                    <td data-label="Select">
                                        {toggleSelected ? 'ON' : 'OFF'}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className='category-container'>
                <div id='category-table-title'>CATEGORY</div>
                <table className="GeneratedTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>SELECTED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.data?.map((category) => (
                                <tr key={category.id}>
                                    <td data-label="ID">{category.id}</td>
                                    <td data-label="Name">{category.name}</td>
                                    <td data-label="Name">{category.description}</td>
                                    <td data-label="Edit">
                                        <span onClick={() => handleCategoryEdit(category)}>&#9998;</span>
                                    </td>
                                    <td data-label="Delete">
                                        <span onClick={() => deleteCategory(category.id)}>X</span>
                                    </td>
                                    <td data-label="Select">
                                        {!toggleSelected ? 'ON' : 'OFF'}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Admin;
