"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DraggableList from "./components/DraggableList";
import { handleCardAdder } from "./hook/handleCardAdder";
import { handleChange } from "./hook/handleChange";
import AddIcon from "@mui/icons-material/Add";
import { Add, DeleteForever } from "@mui/icons-material";

export default function Home() {
  const [textField, setTextField] = useState({});
  const [lists, setLists] = useState({});
  let [error, setError] = useState("");
  // Load data from localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLists = JSON.parse(localStorage.getItem("lists")) || {};
      setLists(storedLists);
    }
  }, []);

  const handleList = (e) => {
    setError("");
    e.preventDefault();
    let isExists = Object.keys(lists).includes(textField?.list);
    if (isExists) {
      setError("List name already exits");
      return;
    }
    if (textField.list) {
      setLists((prev) => {
        const updatedLists = { ...prev, [textField.list]: [] };
        localStorage.setItem("lists", JSON.stringify(updatedLists)); // Update localStorage
        return updatedLists;
      });
      setTextField({}); // Reset input field
    }
  };
  // delete all lists
  const removeAll = () => {
    setLists({});
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lists", JSON.stringify(lists));
    }
  }, [lists]); // Only update when lists change

  return (
    <Stack sx={{ width: "100%", minHeight: "90vh" }}>
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography alignSelf={"center"} variant="h5">
            Todo App
          </Typography>
          <Stack
            direction={"row"}
            component="form"
            gap={1}
            onSubmit={handleList}
          >
            <TextField
              error={!!error}
              helperText={error}
              name="list"
              label="Add List"
              onChange={(e) => handleChange(e, setTextField)}
              value={textField.list || ""}
              variant="standard"
            />
            {/* add icon button */}
            <Tooltip title="Add" arrow>
              <IconButton
                sx={{ marginTop: "15px" }}
                type="submit"
                variant="outlined"
                fullWidth
              >
                <Add />
              </IconButton>
            </Tooltip>
            {/* remove all icon button */}
            <Tooltip title="Delete All" arrow>
              <IconButton
                sx={{ marginTop: "15px" }}
                variant="outlined"
                fullWidth
                onClick={removeAll}
              >
                <DeleteForever />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Divider sx={{ paddingBottom: "10px" }} />
      </Container>
      <Container maxWidth="lg" sx={{ padding: "10px 0px" }}>
        <Grid container spacing={2} pt={2}>
          {Object.keys(lists).map((list, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <DraggableList
                list={list}
                index={index}
                lists={lists}
                textField={textField}
                setTextField={setTextField}
                setList={setLists}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
