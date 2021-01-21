import { useHistory } from "react-router-dom";
import { serverLogin } from "./api";
import { useAuth } from "./AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    try {
      const token = await serverLogin(
        target.email.value,
        target.password.value
      );
      console.log(token);
      login(token);
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Error loggin in please try again");
    }
  };

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" placeholder="Email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
};
