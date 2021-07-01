import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import axios from "axios";

export default function dashboard({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log(token);

  const data = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const events = await data.json();

  return { props: { events } };
}
