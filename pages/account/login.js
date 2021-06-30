import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/AuthForm.module.css";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function loginPage() {
  const { login, error } = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ ...data });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> User Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={data.email}
              handleInputChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              value={data.password}
              handleInputChange={handleInputChange}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/register">register</Link>
        </p>
      </div>
    </Layout>
  );
}
