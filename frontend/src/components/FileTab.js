import React, { useState } from "react";
import Style from "./FileTab.module.css";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import baseURL from "../config.js";
import { toast } from "react-toastify";
import { processDatabaseData, defaultDataSets } from "./utils.js";
import DeleteCard from "./DeleteCard.js";

export default function FileTap({
  fileName,
  setChartData,
  file_id,
  setIsFileDeleted,
}) {
  const [open, setOpen] = useState(false);

  const handleFileUpload = async () => {
    try {
      const response = await axios.get(baseURL + "api/files/" + file_id);

      const newData = processDatabaseData(response.data);
      setChartData(newData);
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      else {
        console.log(error);
        toast.error("Server down. Please try later.");
      }
    }
  };

  const handleOnDelete = async (file_id) => {
    try {
      await axios.delete(baseURL + "api/files/" + file_id);
      toast.success("File successfully deleted.");
      const newData = defaultDataSets();
      setChartData(newData);
      setIsFileDeleted((prev) => !prev);
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      else {
        toast.error("Server down. Please try later.");
      }
    }
  };

  return (
    <div className={Style["file__container"]} onClick={handleFileUpload}>
      <InsertDriveFileIcon sx={{ fontSize: 20, color: "rgb(157, 157, 157)" }} />
      <span className={Style["file__name"]}>{fileName.split("/").pop()}</span>
      <span
        onClick={() => {
          setOpen(true);
        }}
      >
        <DeleteIcon sx={{ fontSize: 15, color: "rgb(157, 157, 157)" }} />
      </span>

      <DeleteCard
        open={open}
        setOpen={setOpen}
        file_id={file_id}
        deleteMethod={handleOnDelete}
        message={"Do you want to delete this file " + fileName + " ?"}
      />
    </div>
  );
}
