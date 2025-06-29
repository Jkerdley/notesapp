export function request<T>(url: string, method?: string, data?: T) {
  return fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    method: method || "GET",
    // credentials: "omit",
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
