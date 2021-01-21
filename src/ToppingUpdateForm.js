import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { updateIngredient, getOnceIngredient } from "./api";

export const ToppingUpdateForm = () => {
  const history = useHistory();
  const { ingredientId } = useParams();
  const { isLoading, data } = useQuery(["onceTopping", ingredientId], () => getOnceIngredient(ingredientId));
  const {mutateAsync: updateTopping} = useMutation(updateIngredient);

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (formValue) => {
    const { name, slug, price, category, image } = formValue;
    const file = image[0];

    let formdata = new FormData();
    formdata.append("id ", data.id);
    formdata.append("name", name);
    formdata.append("slug", slug);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("image", file);
    await updateTopping({ formdata, ingredientId: data.id });
    history.push("/list");
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h3>Редактирование топпинга</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            ref={register}
            type="text"
            name="id"
            id="id"
            defaultValue={data.id}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={data.name}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="slug">Идентификатор:</label>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder={data.slug}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder={data.price}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="category">Категория:</label>
          <select
            name="category"
            id="category"
            defaultValue={data.category}
            ref={register}
          >
            <option value="vegetables">vegetables</option>
            <option value="cheese">cheese</option>
            <option value="meat">meat</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Картинка:</label>
          <input type="file" name="image" id="image" ref={register} />
        </div>
        <button>Отправить</button>
      </form>
    </>
  );
};
