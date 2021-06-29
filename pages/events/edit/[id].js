import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Input from "@/components/Input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";

export default function UpdateEvent({ evt }) {
  const router = useRouter();

  const { name, performers, description, venue, date, time, address } = evt;
  const [values, setValues] = useState({
    name,
    performers,
    description,
    venue,
    date,
    time,
    address,
  });

  const [imagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields.");
    } else {
      try {
        const { data: event } = await axios({
          method: "put",
          url: `${API_URL}/events/${evt.id}`,
          data: { ...values },
        });

        router.replace(`/events/${event.slug}`);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      }
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
      <h1>Update Event</h1>

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
            value={moment(values.date).format("yyyy-MM-DD")}
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

        <input type="submit" value="Update Event" className="btn" />
      </form>

      {imagePreview ? (
        <Image src={imagePreview} height="100" width="170" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set image
        </button>
      </div>

      <Modal
        title="Upload Image"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        upload the event image{" "}
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const { data: evt } = await axios.get(`${API_URL}/events/${id}`);

  return { props: { evt } };
}
