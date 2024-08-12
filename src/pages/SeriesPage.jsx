import React, { useEffect, useState } from "react";
import SeriesList from "../components/series/SeriesList";
import { contentData } from "../ContentData";
import NavBar from "../components/series/NavBar";
import { useNavigate } from "react-router-dom";

function SeriesPage() {
  const [filteredSeries, setFilteredSeries] = useState(contentData);
  const [activeTab, setActiveTab] = useState("전체");
  const [navVisible, setNavVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered", activeTab);

    if (activeTab === "전체") {
      setFilteredSeries(contentData);
    } else {
      const filtered = contentData.filter((serie) => serie.tag === activeTab);
      setFilteredSeries(filtered);
    }
  }, [activeTab]);

  const handleFilter = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSeriesSelect = (seriesId) => {
    console.log("Selected Series ID:", seriesId);
    setNavVisible(false);
    navigate(`/SeriesDetail/${seriesId}`);
  };

  return (
    <div>
      <NavBar
        activeTab={activeTab}
        onFilter={handleFilter}
        navVisible={navVisible}
      />
      <SeriesList series={filteredSeries} onSeriesSelect={handleSeriesSelect} />
    </div>
  );
}

export default SeriesPage;
