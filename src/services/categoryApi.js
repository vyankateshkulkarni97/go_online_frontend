import api from "./api";

export const getCategories = async () => {
    const response = await api.get("categories/");
    return response.data;
};

export const getSubCategories = async () => {
    const response = await api.get("subcategories/");
    return response.data;
};