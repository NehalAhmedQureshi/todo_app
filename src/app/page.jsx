"use client";
import { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import DraggableList from "./components/DraggableList";
import { handleCardAdder } from "./hook/handleCardAdder";
import { handleChange } from "./hook/handleChange";

export default function Home() {
  const [textField, setTextField] = useState({});
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || {}
  );
  const handleList = (e) => {
    e.preventDefault();
    if (textField.list) {
      setLists((prev) => ({ ...prev, [textField.list]: [] }));
      setTextField({}); // Reset input field
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify({ ...lists }));
  }, [handleCardAdder, handleList]);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('updating list...')
      setLists(JSON.parse(localStorage.getItem("lists")) || {});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack sx={{ width: "100%", minHeight: "100vh", padding: "20px 0px" }}>
      <Container maxWidth="lg" sx={{ padding: "10px 0px" }}>
        <Stack component="form" gap={1} onSubmit={handleList}>
          <TextField
            name="list"
            label="List Name"
            onChange={(e) => handleChange(e, setTextField)}
            value={textField.list || ""}
          />
          <Button variant="contained" type="submit">
            Add List
          </Button>
        </Stack>
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
