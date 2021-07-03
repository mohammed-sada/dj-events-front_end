import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function EventPage({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width="960"
              height="600"
            />
          </div>
        )}

        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />

        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a> {"<"} Back to events</a>
        </Link>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ query: { slug } }) {
  const { data: events } = await axios.get(`${API_URL}/events?slug=${slug}`);

  return {
    props: { evt: events[0] },
  };
}
