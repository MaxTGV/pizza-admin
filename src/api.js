const server = process.env.REACT_APP_BACKEND_URL;

export const serverLogin = (email, password) => {
  return fetch(`${server}/admin-auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        console.log(data);
        return data.token;
      });
    } else {
      const error = new Error(res.error);
      throw error;
    }
  });
};

export const addNewIngredient = (formdata) => {
  return fetch(`${server}/ingredients`, {
    method: "POST",
    body: formdata,
  }).then((res) => res.json());
};

export const getIngredients = () => {
  return fetch(`${server}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText || "Something went wrong");
    }
  });
};

export const getOnceIngredient = (ingredientId) => {
  return fetch(`${server}/ingredients/${ingredientId}`).then((res) =>
    res.json()
  );
};

export const deleteIngedient = (ingredientId) => {
  return fetch(`${server}/ingredients/${ingredientId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const updateIngredient = ({ formdata, ingredientId }) => {
  return fetch(`${server}/ingredients/${ingredientId}`, {
    method: "PUT",
    body: formdata,
  }).then((res) => res.json());
};
