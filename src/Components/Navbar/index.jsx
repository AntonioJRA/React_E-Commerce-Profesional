import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  // 2.1 Saber si el usuario le dio click a sign-out en el navbar
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  // 7.1 Saber si el usuario tiene una cuenta en el componente de Navbar para mostrar o no los items
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

  // 1.3. Hacer función de SignOut en el componente de Navbar
  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(true);
  };
  // 2.2 Usar Conditional Rendering para pintar los elementos del navbar dependiendo del valor de la key sign-out
  const renderView = () => {
    if (!isUserSignOut && hasUserAnAccount) {
      return (
        <li>
          {/* 7.2 Si el usuario está sign-out, al darle click al logo debería llevarlo a sign-in */}
          <NavLink
            to={`${isUserSignOut ? "/sign-in" : "/"}`}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign Out
          </NavLink>
        </li>
      );
    } else {
      return (
        <>
        {/* 9.1 Cambiar el correo "quemado" del Navbar por el email real del usuario */}
          <li className="text-black/60">{parsedAccount?.email}</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              // 1.3
              onClick={() => handleSignOut()}
            >
              Sign In
            </NavLink>
          </li>
          {/* <li className="flex items-center">
            <ShoppingBagIcon className="h-6 w-6 text-black"></ShoppingBagIcon>
            <div>{context.cartProducts.length}</div>
          </li> */}
        </>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothes")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            onClick={() => context.setSearchByCategory("furnitures")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => context.setSearchByCategory("toys")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            onClick={() => context.setSearchByCategory("others")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          {/* 8.2 Importarlo y renderizarlo en Navbar */}
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
