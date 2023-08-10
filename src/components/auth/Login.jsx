import { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError]= useState(null)

  const submit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        setError(null)
        setRedirect(true);
      })
      .catch((err) => {
        setError('**email or password are incorrect**')
      });
  };

  return (
    <>
      <form onSubmit={submit} className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-3xl">Login Page</h1>
        <div>
          <input
            className=" bg-amber-500 w-[17rem] px-4 py-2 focus: outline-none"
            placeholder="email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className=" bg-amber-500 w-[17rem] px-4 py-2 focus: outline-none"
            type="password"
            name="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`mt-4 px-4 py-2 text-white text-xl transition transform duration-300 hover:scale-95 rounded-lg`}
          type="submit"
        >
          Login
        </button>
        <p>{error}</p>
        {redirect && <Navigate to="/admin" />}
      </form>
    </>
  );
};
export default Login;
