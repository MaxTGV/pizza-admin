import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AddIngridient } from "./AddIngridient";
import { ToppingsList } from "./ToppingsList";
import { ToppingUpdateForm } from "./ToppingUpdateForm";
import { PageNotFound } from "./PageNotFound";
import { Login } from "./Login";
import { useAuth } from "./AuthContext";

function App() {
  const {logout} = useAuth();

  const exit = () => {
    logout();
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/">Добавить топпинг</Link>
        </li>
        <li>
          <Link to="/list">Список топпингов</Link>
        </li>
        <li>
          <Link to="/login">Логин</Link>
        </li>
      </ul>
      <button onClick={exit}>Log out</button>

      <Switch>
        <Route exact path="/">
          <AddIngridient />
        </Route>
        <Route path="/list">
          <ToppingsList />
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/update/:ingredientId">
          <ToppingUpdateForm />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
