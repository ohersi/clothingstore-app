import { useState } from 'react';
import axios from 'axios';
import { productSchema } from '../../validations/Validations';
// CSS
import './form.css'

const Form = ({
    fetchProducts,
    fetchCategories,
    categoryToEdit,
    productToEdit,
    editForm,
    toggleSelected }) => {

    console.log("Product to edit: ", productToEdit)
    console.log("Category to edit: ", categoryToEdit)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [stock, setStock] = useState('');
    const [category_id, setCategory_Id] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            stock: stock,
            category_id: category_id
        }

        const newCategory = {
            name: name,
            description: description,
        }

        const isValid = await productSchema.isValid(newProduct)
        console.log("is isValid: ", isValid)

        if (isValid) {
            try {
                if (editForm) {
                    // EDIT - UPDATING PRODUCT
                    toggleSelected ?
                        await axios.put(`https://ecommerce-backnd.herokuapp.com/api/v1/products/${productToEdit.id}`, newProduct) :
                        await axios.put(`https://ecommerce-backnd.herokuapp.com/api/v1/category/${categoryToEdit.id}`, newCategory)
                    console.log(toggleSelected ? 'product editing url' : "category editing url")
                }
                else {
                    // ADDING PROODUCT
                    const response = toggleSelected ?
                        await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/addproduct', newProduct)
                        : axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/addcategory', newCategory)
                    if (response.status === 200) {
                        setName('')
                        setDescription('')
                        setPrice('')
                        setImageURL('')
                        setStock('')
                        setCategory_Id('')
                    }
                    console.log(toggleSelected ? "adding product" : "adding category")
                };
                fetchProducts();
                fetchCategories();
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("Invalid input in form");
        }
    }

    return (
        <>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='field'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="name">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="imageURL">Image URL</label>
                        <input
                            type="text"
                            name="imageURL"
                            placeholder="Image URL"
                            value={imageURL}
                            onChange={e => setImageURL(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="text"
                            name="stock"
                            placeholder="Stock"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="category_id">Category ID</label>
                        <input
                            type="text"
                            name="category_id"
                            placeholder="Category ID"
                            value={category_id}
                            onChange={e => setCategory_Id(e.target.value)}
                        />
                    </div>
                    <div className='submit-btn'>
                        <button type='submit'>
                            {editForm ? 'Edit' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form;
