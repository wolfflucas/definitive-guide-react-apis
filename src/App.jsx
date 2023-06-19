import { useState } from "react";
import {
  useGetGroceryListItems,
  useCreateGroceryListItem,
  useMarkGroceryListItemAsDone,
  useDeleteGroceryListItem,
} from "./hooks/grocery-list";

// An ideal component shouldn't have a return with different components
// as this one has. This is only for study purposes and the focus here
// is the API HTTP calls instead of the actual component splitting.
const App = () => {
  const [title, setTitle] = useState("");
  const {
    items,
    refreshItems,
    isLoading: isFetchingItems,
  } = useGetGroceryListItems();
  const { createItem, isLoading: isCreatingItem } = useCreateGroceryListItem();
  const { markItemAsDone, isLoading: isUpdatingItem } =
    useMarkGroceryListItemAsDone();
  const { deleteItem, isLoading: isDeletingItem } = useDeleteGroceryListItem();
  const isLoading =
    isFetchingItems || isCreatingItem || isUpdatingItem || isDeletingItem;

  const handleAdd = (event) => {
    event.preventDefault();
    createItem(title).then(() => {
      refreshItems();
      setTitle("");
    });
  };

  const handleMarkAsDone = (item) => {
    markItemAsDone(item).then(() => refreshItems());
  };

  const handleDelete = (item) => {
    deleteItem(item).then(() => refreshItems());
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex flex-col shadow-lg w-[500px] h-[550px] p-6 border rounded-xl bg-white">
        <h1 className="font-black text-3xl">Grocery List</h1>
        <form onSubmit={handleAdd} className="w-full flex mt-4">
          <input
            required
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            disabled={isLoading}
            placeholder="Enter a new item"
            className="w-full border rounded-l-lg p-2"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-5 py-2 bg-primary text-white rounded-r-lg ${
              isLoading && "opacity-80"
            }`}
          >
            Add
          </button>
        </form>
        <ul className="mt-4 py-2 h-full overflow-y-scroll">
          {items.map((item) => (
            <li key={item.id} className="w-full py-2">
              <label
                className={`text-lg cursor-pointer ${
                  item.isDone && "line-through text-zinc-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => handleMarkAsDone(item)}
                  disabled={isLoading}
                  className="mr-2"
                />
                {item.title}
              </label>
              <button
                onClick={() => handleDelete(item)}
                disabled={isLoading}
                className="text-xs text-red-700 ml-2"
              >
                (delete)
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default App;
