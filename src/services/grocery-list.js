import { api } from "../adapters/api";

const resource = "grocery-list";

export const getItems = () => api.get(resource).then((data) => data.json());

export const createItem = (title) => api.post(resource, { title });

export const markItemAsDone = (itemId) => api.put(`${resource}/${itemId}/done`);

export const deleteItem = (itemId) => api.delete(`${resource}/${itemId}`);
