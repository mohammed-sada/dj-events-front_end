import styles from "@/styles/DashboardEvent.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>

      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit</span>
        </a>
      </Link>
      <a
        href="#"
        onClick={() => handleDelete(evt.id)}
        className={styles.delete}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
