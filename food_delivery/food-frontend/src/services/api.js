const BASE_URL = "http://127.0.0.1:8000/api";

export const getRestaurants = async () => {
  const res = await fetch(`${BASE_URL}/restaurants/`);
  return res.json();
};

export const getMenu = async (id) => {
  const res = await fetch(`${BASE_URL}/restaurants/${id}/menu/`);
  return res.json();
};

export const createOrder = async (data, token) => {
  const res = await fetch(`${BASE_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};
