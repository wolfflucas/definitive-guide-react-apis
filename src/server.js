import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      items: Model,
    },

    // Create initial data
    seeds(server) {
      server.create("item", { title: "Rice", isDone: false });
      server.create("item", { title: "Beans", isDone: false });
      server.create("item", { title: "Flour", isDone: true });
      server.create("item", { title: "Carrot", isDone: true });
    },

    routes() {
      // Prefix for every request
      this.namespace = "api";

      // Retrieve all items
      this.get("/grocery-list", (schema) => {
        return schema.items.all();
      });

      // Create a new item
      this.post("/grocery-list", (schema, request) => {
        const newItem = JSON.parse(request.requestBody);
        newItem.isDone = false;

        return schema.items.create(newItem);
      });

      // Update an item
      this.put("/grocery-list/:id/done", (schema, request) => {
        const itemToUpdate = schema.items.find(request.params.id);
        itemToUpdate.update("isDone", true);
      });

      // Delete an item
      this.delete("/grocery-list/:id", (schema, request) => {
        const itemToRemove = schema.items.find(request.params.id);
        itemToRemove.destroy();
      });
    },
  });
}
