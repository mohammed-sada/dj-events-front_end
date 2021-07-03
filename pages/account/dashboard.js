import { useRouter } from "next/router";
import axios from "axios";
import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

export default function dashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure ?")) {
      const data = await axios({
        method: "delete",
        url: `${API_URL}/events/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.statusText === "OK") {
        router.reload();
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  };
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => {
          return (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const data = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const events = await data.json();

  return { props: { events, token } };
}
