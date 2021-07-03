import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { FaImage } from "react-icons/fa";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import { parseCookies } from "@/helpers/index";

export default function UpdateEvent({ evt, token }) {
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

  const [imagePreview, setImagePreview] = useState(
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
        const res = await axios({
          method: "put",
          url: `${API_URL}/events/${evt.id}`,
          data: { ...values },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.replace(`/events/${res.data.slug}`);
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

  const imageUploaded = async () => {
    const { data: event } = await axios.get(`${API_URL}/events/${evt.id}`);
    setImagePreview(event.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
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
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { data: evt } = await axios.get(`${API_URL}/events/${id}`);

  const { token } = parseCookies(req);

  return { props: { evt, token } };
}
