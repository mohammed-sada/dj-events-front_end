import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">Show all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  // getStaticProps will fetch data at bulid time
  // getServerSideProps will do the same job

  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1, // revalidate every one second if the data is changed
  };
}
