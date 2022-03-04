import { useState } from 'react';
import axios from 'axios';
import { productSchema } from '../../validations/ProductsValidation';
// CSS
import './form.css'

const Form = ({ fetchProducts, productToEdit, editForm }) => {

    console.log("Product to edit: ", productToEdit)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [stock, setStock] = useState('');
    const [category_id, setCategory_Id] = useState('');

    const addOrEditProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            stock: stock,
            category_id: category_id
        }
        const isValid = await productSchema.isValid(newProduct)

        if (isValid) {
            try {
                if (editForm) {
                    // EDIT - UPDATING PRODUCT
                    const response = await axios.put(`https://ecommerce-backnd.herokuapp.com/api/v1/products/${productToEdit.id}`, newProduct)
                    console.log("editing product")
                }
                else {
                    // ADDING PROODUCT
                    const response = await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/addproduct')
                    console.log("adding product")
                    if (response.status === 200) {
                        setName('')
                        setDescription('')
                        setPrice('')
                        setImageURL('')
                        setStock('')
                        setCategory_Id('')
                    }
                };
                fetchProducts();
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("Invalid, valid status is: ", isValid);
        }

    }

    return (
        <>
            <div className='form'>
                <form onSubmit={addOrEditProduct}>
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
