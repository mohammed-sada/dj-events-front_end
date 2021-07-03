import styles from "@/styles/Form.module.css";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "@/config/index";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    // for (var value of formData.values()) {
    //   console.log(value);
    // }

    const data = await axios({
      method: "post",
      url: `${API_URL}/upload`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.statusText === "OK") {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit} className={styles.file}>
        <input type="file" onChange={handleFileChange} />
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
