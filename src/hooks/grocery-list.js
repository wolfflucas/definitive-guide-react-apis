import { useEffect, useState } from "react";
import * as groceryListService from "../services/grocery-list";
import { shouldUpdateItem } from "../utils/grocery-list";

export const useGetGroceryListItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    groceryListService.getItems().then(({ items }) => {
      setItems(items);
      setIsLoading(false);
    });
  }, [refresh]);

  const refreshItems = () => {
    setRefresh(!refresh);
  };

  return { items, refreshItems, isLoading };
};

export const useCreateGroceryListItem = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createItem = (title) => {
    setIsLoading(true);
    return groceryListService.createItem(title).then(() => {
      setIsLoading(false);
    });
  };

  return { createItem, isLoading };
};

export const useMarkGroceryListItemAsDone = () => {
  const [isLoading, setIsLoading] = useState(false);

  const markItemAsDone = (item) => {
    if (!shouldUpdateItem(item)) {
      return;
    }
    setIsLoading(true);
    return groceryListService.markItemAsDone(item.id).then(() => {
      setIsLoading(false);
    });
  };

  return { markItemAsDone, isLoading };
};

export const useDeleteGroceryListItem = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = (item) => {
    setIsLoading(true);
    return groceryListService.deleteItem(item.id).then(() => {
      setIsLoading(false);
    });
  };

  return { deleteItem, isLoading };
};
