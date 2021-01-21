import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { deleteIngedient, getIngredients } from "./api";

export const ToppingsList = () => {
  const server = process.env.REACT_APP_BACKEND_URL;
  const client = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "toppings",
    getIngredients
  );

  const { mutateAsync: mutateDelete } = useMutation((ingredientId) =>
    deleteIngedient(ingredientId)
  );

  const history = useHistory();

  const removeIngredient = async (ingredientId) => {
    await mutateDelete(ingredientId);
    await client.invalidateQueries("toppings");
  };

  const editIngredient = (obj) => {
    history.push(`/update/${obj.id}`);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>ERROR: {JSON.stringify(error)}</>;
  }

  return (
    <>
      <h3>Доступные топпинги:</h3>
      {data &&
        data.map((obj) => (
          <div key={obj.id}>
            <p>{obj.name}</p>
            <img src={`${server}/${obj.thumbnail}`} alt={obj.name}/>
            <button onClick={() => removeIngredient(obj.id)}>Удалить</button>
            <button onClick={() => editIngredient(obj)}>Редактировать</button>
          </div>
        ))}
    </>
  );
};
