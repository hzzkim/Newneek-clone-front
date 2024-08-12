import React from "react";
import SeriesContent from "./SeriesContent";
import styles from "../../assets/Series.module.css";
import { useNavigate } from "react-router-dom";

function SeriesList({ series = [], onSeriesSelect }) {
  const navigate = useNavigate();

  const handleContentClick = (id) => {
    console.log("Clicked content ID:", id);
    onSeriesSelect(id);
    //navigate(`/series/${id}`);
  };
  return (
    <div className={styles.content}>
      <ul>
        {series.map((content, index) => (
          <li key={index} onClick={() => handleContentClick(content.id)}>
            <SeriesContent {...content} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeriesList;
