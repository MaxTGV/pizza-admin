import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText(/Добавить топпинг/i)).toBeInTheDocument();
    expect(getByText(/Список топпинг/i)).toBeInTheDocument();
  });
});
