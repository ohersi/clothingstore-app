import * as yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required().positive(),
    imageURL: yup.string().url(),
    stock: yup.number().required().positive().integer(),
    category_id: yup.number().required().positive().integer()
});

export const signUpSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup.string().email("Must be a valid email address").required("Email is required"),
    password: yup.string().required("Password is required").min(5, "Min password length is 5"),
});

export const logInSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});


