import axios from "axios";
import { API_URL, PER_PAGE } from "@/config/index";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const { data: total } = await axios.get(`${API_URL}/events/count`);

  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const { data: events } = await axios.get(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  console.log(events);
  return {
    props: { events, page: +page, total },
  };
}
