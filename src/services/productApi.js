import api from "./api";

export const getProducts = async () => {
    const response = await api.get("products/");
    return response.data;
};

export const getProduct = async (id) => {
    const response = await api.get(`products/${id}/`);
    return response.data;
};

export const searchProducts = async (search) => {
    const response = await api.get(
        `products/?search=${search}`
    );

    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
    const response = await api.get(
        `products/?category=${categoryId}`
    );

    return response.data;
};