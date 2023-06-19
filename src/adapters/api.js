const basePath = "/api";

const api = {
  get: (endpoint) => fetch(`${basePath}/${endpoint}`),
  post: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "POST",
      body: body && JSON.stringify(body),
    }),
  put: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "PUT",
      body: body && JSON.stringify(body),
    }),
  delete: (endpoint) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "DELETE",
    }),
};

export { api };
