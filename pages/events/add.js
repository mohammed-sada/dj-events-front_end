import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Input from "@/components/Input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import axios from "axios";

export default function AddEvent({ token, events }) {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    performers: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (events) {
      const sameName = events.find((evt) => evt.name === values.name);
      if (sameName) {
        toast.error("This event name already exist");
        return;
      }
    }
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.replace(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a> {"<"} Back to events</a>
      </Link>

      <ToastContainer />
      <h1>Add Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <Input
            label="Event Name"
            name="name"
            id="name"
            value={values.name}
            handleInputChange={handleInputChange}
          />
          <Input
            label="Performers"
            name="performers"
            id="performers"
            value={values.performers}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className={styles.grid}>
          <Input
            label="Venue"
            name="venue"
            id="venue"
            value={values.venue}
            handleInputChange={handleInputChange}
          />
          <Input
            label="Address"
            name="address"
            id="address"
            value={values.address}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className={styles.grid}>
          <Input
            label="Date"
            name="date"
            id="date"
            type="date"
            value={values.date}
            handleInputChange={handleInputChange}
          />
          <Input
            label="Time"
            name="time"
            id="time"
            value={values.time}
            handleInputChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const { data: events } = await axios.get(`${API_URL}/events`);
  console.log(events);

  return { props: { token, events } };
}
