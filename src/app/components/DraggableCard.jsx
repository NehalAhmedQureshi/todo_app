"use client";

import {
  Box,
  Chip,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BasicMenu from "./BasicMenu";
import { Edit, SettingsPowerRounded } from "@mui/icons-material";
import { handleChange } from "../hook/handleChange";

export default function DraggableCard({
  card,
  index,
  priority,
  list,
  lists,
  setLists,
}) {
  let [isMoving, setIsMoving] = useState(false);
  let [dragOver, setDragOver] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [textField, setTextField] = useState(null);
  let [error, setError] = useState("");
  const handleEdit = (e) => {
    e.preventDefault();
    if (textField?.editCard) {
      console.log("submit");
      let editList = { ...lists };
      let cardIndex = editList[list].indexOf({ name: card, priority });
      console.log("🚀 ~ handleEdit ~ cardIndex:", cardIndex);
      editList[list].splice(cardIndex, 1, {
        name: textField?.editCard,
        priority,
      }); // edit card text
      setLists({ ...editList }); // setList and save it in local storage
      setIsEdit(false);
    } else {
      // set error if edit text field is empty on submit.
      console.log("error");
      setError("Field can not be empty.");
    }
  };
  return (
    <>
      <Paper
        draggable
        sx={{
          padding: "10px",
          width: "100%",
          backgroundColor: isMoving ? "rgba(0,0,0,0.2)" : "white",
          border: isMoving ? "2px solid black" : "none",
          borderStyle: isMoving ? "dashed" : "none",
          transform: isMoving && "rotate(2deg)",
        }}
        key={index}
        onDragStart={(e) => setIsMoving(true)}
        onDragEnd={(e) => setIsMoving(false)}
        onDragOver={(e) => setDragOver(true)}
        onDragLeave={(e) => setDragOver(false)}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {isEdit ? (
            <form
              style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              onSubmit={(e)=>handleEdit(e)}
            >
              {/* <FormControl>
                <Select
                  sx={{ height: "25px" }}
                  value={textField?.priority || priority || ""}
                  error={error}
                  variant="outlined"
                  name="priority"
                  onChange={(e) => handleChange(e, setTextField)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                error={error}
                helperText={error}
                placeholder="Edit this"
                name="editCard"
                onChange={(e) => handleChange(e, setTextField)}
                value={textField?.editCard || card}
                variant="standard"
              />
            </form>
          ) : (
            <Typography variant="body2">{`${card}`}</Typography>
          )}
          <Stack direction={"row"} alignItems={"center"}>
            {isEdit || (
              <Tooltip title={"Priority"} arrow>
                <Chip
                  color={
                    priority === "Normal"
                      ? "primary"
                      : priority === "Low"
                      ? "default"
                      : priority === "Medium"
                      ? "warning"
                      : "error"
                  }
                  label={priority}
                  size="small"
                />
              </Tooltip>
            )}
            <Tooltip title={"Edit"} arrow>
              <IconButton onClick={() => setIsEdit(!isEdit)}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <BasicMenu
              list={list}
              lists={lists}
              setLists={setLists}
              card={card}
              priority={priority}
            />
          </Stack>
        </Stack>
      </Paper>
      {dragOver && (
        <Paper
          draggable
          sx={{
            width: "100%",
            height: "30px",
            backgroundColor: "rgba(0,0,0,0.2)",
            marginTop: "1px",
          }}
        ></Paper>
      )}
    </>
  );
}
