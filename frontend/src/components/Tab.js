import React, { useState, useEffect } from "react";
import Style from "./Tab.module.css";
import FileTap from "./FileTab";
import SearchIcon from "@mui/icons-material/Search";
import baseURL from "../config.js";
import axios from "axios";

export default function Tap({ setChartData, isFileUploaded }) {
  const [filesList, setFilesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickOnFileIndex, setClickOnFileIndex] = useState(-1);
  const [isFileDeleted, setIsFileDeleted] = useState(false);

  const handleSetSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGetFiles = async () => {
    setClickOnFileIndex(-1);
    try {
      const response = await axios.get(baseURL + "api/files");
      setFilesList(response.data);
    } catch (error) {
      setFilesList([]);
    }
  };
  useEffect(() => {
    handleGetFiles();
  }, [isFileDeleted, isFileUploaded]);

  const renderFiles = () => {
    if (filesList.length === 0) {
      return "no files";
    }

    let renderFilesList = [];

    for (let i = 0; i < filesList.length; i++) {
      const parts = filesList[i].file.split("______");
      const fileName = parts[0];

      if (fileName.toLowerCase().includes(searchQuery.toLowerCase())) {
        renderFilesList.push(
          <div
            className={Style["file__tap__container"]}
            style={{
              backgroundColor: clickOnFileIndex === i ? "#483ea8" : "#f9fafb",
              color: clickOnFileIndex === i ? "white" : "black",
            }}
            onClick={() => {
              console.log(i);
              setClickOnFileIndex(i);
            }}
            key={filesList[i].id}
          >
            <FileTap
              fileName={fileName}
              clickOnFileIndex={clickOnFileIndex}
              id={i}
              file_id={filesList[i].id}
              setChartData={setChartData}
              setIsFileDeleted={setIsFileDeleted}
            />
          </div>
        );
      }
    }
    return renderFilesList;
  };

  return (
    <div className={Style["tap__search__container"]}>
      <div className={Style["search"]}>
        <button className={Style["search__button"]}>
          <SearchIcon sx={{ fontSize: 18, color: "white" }} />
        </button>
        <input
          className={Style["search__input"]}
          onChange={handleSetSearchQuery}
        ></input>
      </div>
      <div className={Style["tap__container"]}>{renderFiles()}</div>
    </div>
  );
}
