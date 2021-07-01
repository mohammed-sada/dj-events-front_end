import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

export default function dashboardPage({ events }) {
  const handleDelete = (id) => {
    console.log("delete", id);
  };
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => {
          return (
            <DashboardEvent
              key={evt.id}
              evt={evt}
              handleDelete={handleDelete}
            />
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

  return { props: { events } };
}
