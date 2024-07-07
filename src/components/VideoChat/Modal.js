import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./MarkdownRenderer.css";
import BasicTable from "./Table";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="markdown-content">
      <Button onClick={handleOpen} variant="outlined" color="success">
        Continue your learning journey
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BasicTable masteryLevels={props.masteryLevels} />
          <Button onClick={props.continue} variant="contained" color="success">
            Continue
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
