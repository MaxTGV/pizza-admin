const { render, waitFor } = require("@testing-library/react");
const { getIngredient } = require("./api");
const { ToppingsList } = require("./ToppingsList");

jest.mock("./api", () => ({
  getIngredient: jest.fn(),
}));

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
};

describe("ListOfToppings", () => {
  describe("while loading", () => {
    it("renders loading message", () => {
      getIngredient.mockImplementation(() => getControlledPromise().promise);
      const { getByText } = render(<ToppingsList />);

      expect(getByText(/loading.../i)).toBeInTheDocument();
    });
  });

  /*describe("with valid ingredient id", () => {
    it("renders ingredient", async () => {
      const { promise, resolve } = getControlledPromise();
      getIngredient.mockImplementation(() => promise);
      resolve({
        "name": "Моцарелла",
        "slug": "mozzarella",
        "price": "29",
        "category": "cheese",
        "image": "mozzarella.png"
      });

      const { getByText } = render(<ListOfToppings />);

      await waitFor(() => {
        expect(getByText(/моцарелла/i)).toBeInTheDocument();
      });
    });
  });

  describe("with invalid ingredient id", () => {
    it("renders error message", async () => {
      const { reject } = getControlledPromise();
      getIngredient.mockImplementation(() => reject);
      reject({ message: "error" });

      const { getByText } = render(<ListOfToppings />);

      await waitFor(() => {
        //expect(getByText(/доступные топпинги/i)).toBeInTheDocument();
        expect(getByText(/ERROR: error/i)).toBeInTheDocument();
      });
    });
  });*/
});
