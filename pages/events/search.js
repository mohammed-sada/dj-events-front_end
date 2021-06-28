import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";

export default function EventsPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Events">
      <h1>Search results for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show.</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Link href="/events">
        <a> {"<"} Back to events</a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { performers_contains: term },
        { venue_contains: term },
      ],
    },
  });

  //   console.log(query);

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
