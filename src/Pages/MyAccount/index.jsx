import { useContext, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";

// 9.2 Crear página de My Account permitiendo ver y editar los datos del usuario

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // Update account
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", stringifiedAccount);
    context.setAccount(data);
  };

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <button
          className="bg-white disabled:bg-black/40 text-black w-full rounded-lg py-3 mt-4 mb-2 border-2 border-black"
          onClick={() => setView("edit-user-info")}
        >
          Edit
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => {
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
        <button
          className="bg-black text-white w-full rounded-lg py-3"
          onClick={() => editAccount()}
        >
          Edit
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo();

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My Account</h1>
      {renderView()}
    </Layout>
  );
}

export default MyAccount;
