import React from "react";
import { useForm } from "react-hook-form";
import { addNewIngredient } from "./api";

export const AddIngridient = () => {
  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { name, slug, price, category, image, thumbnail } = data;
    const file = image[0];
    const file2 = thumbnail[0];

    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("slug", slug);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("image", file);
    formdata.append("thumbnail", file2);

    const newIngredient = await addNewIngredient(formdata);
    reset(newIngredient);
  });

  return (
    <>
      <h3>Новые ингридиенты</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={register({ required: true })}
            placeholder="Введите название"
          />
          {errors.name && <span>Название обязательное поле!</span>}
        </div>
        <div>
          <label htmlFor="slug">Идентификатор:</label>
          <input
            type="text"
            name="slug"
            id="slug"
            ref={register({ required: true })}
            placeholder="Введите ID"
          />
          {errors.slug && <span>Идентификатор обязательное поле!</span>}
        </div>
        <div>
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            name="price"
            id="price"
            ref={register({ required: true })}
            placeholder="Введите цену"
          />
          {errors.price && <span>Цена обязательное поле!</span>}
        </div>
        <div>
          <label htmlFor="category">Категория:</label>
          <select name="category" id="category" ref={register}>
            <option value="vegetables">vegetables</option>
            <option value="cheese">cheese</option>
            <option value="meat">meat</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Картинка:</label>
          <input
            type="file"
            name="image"
            id="image"
            ref={register({ required: true })}
          />
          {errors.image && <span>Картинка обязательное поле!</span>}
        </div>
        <div>
          <label htmlFor="thumbnail">Пресет:</label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            ref={register({ required: true })}
          />
          {errors.image && <span>Пресет обязательное поле!</span>}
        </div>
        <button>Отправить</button>
      </form>
    </>
  );
};
