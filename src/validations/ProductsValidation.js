import * as yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required().positive(),
        imageURL: yup.string().url(),
        stock: yup.number().required().positive().integer(),
        category_id: yup.number().required().positive().integer()
  });



