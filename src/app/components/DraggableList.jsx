"use client";
import { useState } from "react";
import DraggableCard from "./DraggableCard";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
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
import { Add, Delete, Flag, ReportProblem } from "@mui/icons-material";
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
            handleCardAdder(
              e,
              list,
              setTextField,
              textField,
              setList,
              select,
              lists,
              setError,
              setSelect
            )
          }
        >
          <FormControl sx={{ minWidth: 80 }} error={error}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              sx={{ height: "40px" }} // Increased height for better UI
              value={select}
              label="Priority"
              onChange={(e) => setSelect(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="Low">
                <Tooltip title="Low" arrow>
                  <Flag color="default" />
                </Tooltip>
              </MenuItem>
              <MenuItem value="Normal">
                <Tooltip title="Normal" arrow>
                  <Flag color="primary" />
                </Tooltip>
              </MenuItem>
              <MenuItem value="Medium">
                <Tooltip title="Medium" arrow>
                  <Flag color="warning" />
                </Tooltip>
              </MenuItem>
              <MenuItem value="High">
                <Tooltip title="High" arrow>
                  <Flag color="error" />
                </Tooltip>
              </MenuItem>
              <MenuItem value="Urgent">
                <Tooltip title="Urgent" arrow>
                  <ReportProblem color="error" />
                </Tooltip>
              </MenuItem>
            </Select>
          </FormControl>

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
        <Stack
          width={"100%"}
          direction={"row"}
          gap={1}
          flexWrap={"wrap"}
          sx={{
            maxHeight: "72.5vh",
            overflow: "auto",
            scrollbarWidth: "thin", // Makes scrollbar thinner in Firefox
            scrollbarColor: "rgb(184, 179, 179) transparent", // Custom scrollbar color
            scrollBehavior: "smooth",

            "&::-webkit-scrollbar": {
              width: "8px", // Thin scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent", // Fully transparent track
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgb(184, 179, 179)", // Thumb color
              "&:hover": {
                background: "rgb(100, 90, 90)", // Darker shade on hover
              },
            },
          }}
        >
          {[...(lists[list] || [])].reverse().map((card, index) => {
            return (
              <DraggableCard
                lists={lists}
                list={list}
                card={card?.name}
                priority={card?.priority}
                key={index}
                setLists={setList} // Ensure `setLists` is correct
              />
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
