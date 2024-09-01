import React from "react";
import SeriesContent from "./SeriesContent";
import styles from "../../assets/Series.module.css";
import { useNavigate } from "react-router-dom";

function SeriesList({ series = [] }) {
  const navigate = useNavigate();

  const handleContentClick = (id, author) => {
    console.log("Clicked content ID:", id);
    navigate(`/${author}/series/${id}`);
  };

  return (
    <div className={styles.content}>
      <ul>
        {series.map((content, index) => (
          <li
            key={index}
            onClick={() => handleContentClick(content.id, content.author)}
          >
            <SeriesContent {...content} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeriesList;
