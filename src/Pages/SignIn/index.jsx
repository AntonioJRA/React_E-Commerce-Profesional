import { useContext, useState, useRef } from "react";
import Layout from "../../Components/Layout";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

function SignIn() {
  // 3.1 Leer account desde LocalStorage y desde el estado local para saber si el usuario tiene cuenta o no
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const form = useRef(null);

  // Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);

  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  // 6.1 Hacer SignIn poniendo la key de sign-out en false y redirigiendo al home
  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    console.log(stringifiedSignOut);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(false);
    // Redirect
    return <Navigate replace to={"/"} />;
  };
  // 5.2 Capturar la info del formulario usando ref
  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // 6.2 Agregar los datos del formulatio a la key de account (y al estado global) y agregar funcionalidad de SignIn al dar click en el botón de Log In
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", stringifiedAccount);
    context.setAccount(data);
  };

  // 4.1 Crear el estado local para cambiar las vistas a renderizar y usamos Conditional Rendering para crear las vistas de creación de cuenta y log in
  const renderLogin = () => {
    return (
      <div className="flex flex-col w-80">
        {/* 3.2 Cambiar los valores "quemados" por valores reales de la cuenta del usuario en caso de tenerla */}
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
            onClick={() => handleSignIn()}
            disabled={!hasUserAnAccount}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a
            href="/"
            className="font-light text-xs underline underline-offset-4"
          >
            Forgot my password
          </a>
        </div>
        <button
          className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg py-3 mt-6"
          onClick={() => setView("create-user-info")}
          disabled={hasUserAnAccount}
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    // 5.1 Crear el HTML del formulario
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <input
            type="text"
            name="password"
            id="password"
            defaultValue={parsedAccount?.email}
            placeholder="********"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <Link to="/">
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogin();

  return (
    // 2.3 Hacer la maquetación base de la página de SignIn
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
