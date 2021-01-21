const { render, fireEvent, waitFor } = require("@testing-library/react");
//const { default: userEvent } = require("@testing-library/user-event");
const { act } = require("react-dom/test-utils");
const { AddIngridient } = require("./AddIngridient");
//const { addNewIngredient } = require("./api");

/*jest.mock("./api", () => ({
  addNewIngredient: jest.fn(),
}));

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
};*/

describe("AddIngredient", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(<AddIngridient />);

    expect(getByText(/новые ингридиенты/i)).toBeInTheDocument();
    expect(getByLabelText(/название/i)).toBeInTheDocument();
    expect(getByLabelText(/идентификатор/i)).toBeInTheDocument();
    expect(getByLabelText(/цена/i)).toBeInTheDocument();
    expect(getByLabelText(/категория/i)).toBeInTheDocument();
    expect(getByLabelText(/картинка/i)).toBeInTheDocument();
    expect(getByText(/отправить/i)).toBeInTheDocument();
  });

  describe("on submit", () => {
    it("an error appears if the fields are not filled", async () => {
      const { getByText } = render(<AddIngridient />);
      await act(async () => {
        fireEvent.click(getByText(/отправить/i));
      });

      expect(getByText(/название обязательное поле!/i)).toBeInTheDocument();
      expect(
        getByText(/идентификатор обязательное поле!/i)
      ).toBeInTheDocument();
      expect(getByText(/цена обязательное поле!/i)).toBeInTheDocument();
      expect(getByText(/картинка обязательное поле!/i)).toBeInTheDocument();
    });

    /*it("collects properties ingredient", async () => {
      const {  resolve } = getControlledPromise();
      addNewIngredient.mockImplementation(() => resolve({
        name: "Моцарелла",
        slug: "mozzarella",
        price: 29,
        category: "cheese",
        image: "mozzarella.png"
      }));
      const uploadData = jest.fn();
      const file = new File(["image"], "mozzarella.png", { type: "image/png" });
      const { getByText, getByLabelText, getByPlaceholderText } = render(
        <AddIngridient uploadData={uploadData}/>
      );

      fireEvent.input(getByLabelText(/название/i), {
        target: { value: "Моцарелла" },
      });
      fireEvent.input(getByLabelText(/идентификатор/i), {
        target: { value: "mozzarella" },
      });
      fireEvent.input(getByLabelText(/цена/i), {
        target: { value: 29 },
      });
      fireEvent.input(getByLabelText(/категория/i), {
        target: { value: "cheese" },
      });
      userEvent.upload(getByLabelText(/картинка/i), file);

      await act(async () => {
        fireEvent.click(getByText(/отправить/i));
      });

      await waitFor(() => {
        expect().toBeCalledWith({
          name: "Моцарелла",
          slug: "mozzarella",
          price: 29,
          category: "cheese",
          image: "mozzarella.png",
        });
      });
      //expect(uploadData.mock.calls["image"]).toContain(file);
    });*/
  });
});
