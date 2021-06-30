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

export default function RegisterPage() {
  const { register, error } = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) register(data);
    else {
      toast.error("Passwords must match");
    }
  };

  return (
    <Layout title="User Register">
      <div className={styles.auth}>
        <h1>
          <FaUser /> User Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              name="username"
              id="username"
              label="username"
              value={data.username}
              handleInputChange={handleInputChange}
            />
          </div>
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
          <div>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={data.confirmPassword}
              handleInputChange={handleInputChange}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/login">login</Link>
        </p>
      </div>
    </Layout>
  );
}
