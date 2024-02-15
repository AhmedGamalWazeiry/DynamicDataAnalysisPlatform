import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Style from "./DeleteCard.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DeleteCard({ open, setOpen, message, file_id, deleteMethod }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: 10,
          maxWidth: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          padding: 0,
        }}
      >
        <DialogContent
          sx={{
            display: "flex",

            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "16px",
            fontWeight: "700",
            color: "#297ddc",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M8.00008 25.3333C8.00008 26.8 9.20008 28 10.6667 28H21.3334C22.8001 28 24.0001 26.8 24.0001 25.3333V9.33333H8.00008V25.3333ZM12.2267 16.7867C11.7067 16.2667 11.7067 15.4267 12.2267 14.9067C12.7467 14.3867 13.5867 14.3867 14.1067 14.9067L16.0001 16.7867L17.8801 14.9067C18.4001 14.3867 19.2401 14.3867 19.7601 14.9067C20.2801 15.4267 20.2801 16.2667 19.7601 16.7867L17.8801 18.6667L19.7601 20.5467C20.2801 21.0667 20.2801 21.9067 19.7601 22.4267C19.2401 22.9467 18.4001 22.9467 17.8801 22.4267L16.0001 20.5467L14.1201 22.4267C13.6001 22.9467 12.7601 22.9467 12.2401 22.4267C11.7201 21.9067 11.7201 21.0667 12.2401 20.5467L14.1201 18.6667L12.2267 16.7867ZM24.0001 5.33333H20.6667L19.7201 4.38667C19.4801 4.14667 19.1334 4 18.7867 4H13.2134C12.8667 4 12.5201 4.14667 12.2801 4.38667L11.3334 5.33333H8.00008C7.26675 5.33333 6.66675 5.93333 6.66675 6.66667C6.66675 7.4 7.26675 8 8.00008 8H24.0001C24.7334 8 25.3334 7.4 25.3334 6.66667C25.3334 5.93333 24.7334 5.33333 24.0001 5.33333Z"
              fill="#FF4545"
            />
          </svg>
          <div className={Style["delete__container"]}>
            <h3 className={Style["delete__title"]}>Delete File</h3>
            <span className={Style["delete__description"]}>{message}</span>
          </div>
        </DialogContent>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          marginBottom: 3,
        }}
      >
        <button className={Style["cancel__button"]} onClick={handleClose}>
          Cancel
        </button>
        <button
          className={Style["delete__button"]}
          data-cy="delete-button"
          onClick={() => {
            deleteMethod(file_id);
            handleClose();
          }}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCard;
