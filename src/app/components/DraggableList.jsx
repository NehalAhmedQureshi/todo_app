"use client";
import { useState } from "react";
import DraggableCard from "./DraggableCard";
import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { handleCardAdder } from "../hook/handleCardAdder";
import { handleChange } from "../hook/handleChange";
import { Add, Delete } from "@mui/icons-material";
export default function DraggableList({ list, index, lists, setList }) {
  const [onDragOver, setOnDragOver] = useState(false);
  let [select, setSelect] = useState("Low");
  let [textField, setTextField] = useState({});
  let [error, setError] = useState("");
  const handleListDelete = () => {
    let updatedLists = { ...lists }; // Copy the lists object
    delete updatedLists[list]; // Remove the array with the key stored in `list`
    setList(updatedLists); // Update state
  };
  return (
    <Paper
      sx={{
        padding: "10px",
        zIndex: 2,
        outline: onDragOver && "2px solid black",
        outlineStyle: onDragOver && "dashed",
      }}
      onDragOver={(e) => setOnDragOver(true)}
      onDragLeave={(e) => setOnDragOver(false)}
      key={index}
    >
      <Stack alignItems="center" gap={1}>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">{list}</Typography>
          <Tooltip title={"Delete List"} arrow>
            <IconButton onClick={handleListDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
        <Divider sx={{ width: "100%" }} />
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}
          component={"form"}
          gap={1}
          onSubmit={(e) =>
            handleCardAdder(e, list, setTextField, textField, setList, select,lists,setError,setSelect)
          }
        >
            <Tooltip title={'Priority'} arrow>
              <Select
                sx={{ height: "25px" }}
                value={select}
                error={error}
                variant="outlined"
                onChange={(e) => setSelect(e.target.value)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </Tooltip>
          <TextField
            name={list}
            label="Add Card"
            onChange={(e) => handleChange(e, setTextField)}
            value={textField[list] || ""}
            variant="standard"
          />
          <Tooltip title="Add" arrow>
            <IconButton
              sx={{ marginTop: "15px" }}
              type="submit"
              variant="outlined"
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack width={"100%"} direction={"row"} gap={1} flexWrap={"wrap"}>
          {lists[list].map((card, index) => {
            return (
              <DraggableCard
                lists={lists}
                list={list}
                card={card?.name}
                priority={card?.priority}
                key={index}
                setLists={setList}
              />
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
