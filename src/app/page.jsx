"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function DraggableList({
  list,
  index,
  handleChange,
  textField,
  lists,
  handleCardAdder,
}) {
  const [onDragOver, setOnDragOver] = useState(false);
  return (
    <Paper
      sx={{
        padding: "10px",
        zIndex:2,
        background: onDragOver ? 'rgba(0,0,0,0.2)' : ''
      }}
      onDragOver={(e) => setOnDragOver(true)}
      onDragLeave={(e) => setOnDragOver(false)}
    >
      <Stack
        alignItems="center"
        gap={2}
        component={"form"}
        onSubmit={(e) => handleCardAdder(e, list)}
      >
        <Typography variant="h4">{[list]}</Typography>
        <TextField
          name={[list]}
          label="Enter Cards"
          onChange={handleChange}
          value={textField[list] || ""}
          fullWidth
        />
        <Button variant="contained" fullWidth>
          Add Card
        </Button>
        <Stack width={"100%"} direction={"row"} gap={1} flexWrap={"wrap"} >
          {lists[list].map((card, index) => {
            return <DraggableCard lists={lists} list={list} card={card} key={index} />;
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}

function DraggableCard({ card, index,list,lists }) {

  let [isMoving, setIsMoving] = useState(false);
  let [dragOver , setDragOver] = useState('')

  return (
    <Paper
      draggable
      sx={{
        padding: "10px",
        width: "100%",
        backgroundColor: isMoving ? "rgba(0,0,0,0.2)" : "white",
        border:isMoving ? '2px solid black' : 'none',
        borderStyle: isMoving ? 'dashed' : 'none',
      }}
      key={index}
      // onDrag={(e) => console.log(e)}
      onDragStart={(e) => setIsMoving(true)}
      onDragEnd={(e) => setIsMoving(false)}
    >
      {`${card}`}
    </Paper>
  );
}

export default function Home() {
  const [textField, setTextField] = useState({});
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || {}
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTextField((prev) => ({ ...prev, [name]: value }));
  };

  const handleList = (e) => {
    e.preventDefault();
    if (textField.list) {
      setLists((prev) => ({ ...prev, [textField.list]: [] }));
      setTextField({}); // Reset input field
    }
  };
  const handleCardAdder = (e, list) => {
    e.preventDefault();
    if (textField[list]) {
      setLists((prev) => ({
        ...prev,
        [list]: [...prev[list], textField[list]],
      }));

      setTextField({}); // Reset input field
    }
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify({ ...lists }));
  }, [handleCardAdder, handleList]);
  return (
    <Stack sx={{ width: "100%", border: "2px solid black", height: "100vh" }}>
      <Container maxWidth="lg" sx={{ padding: "10px 0px" }}>
        <Stack component="form" gap={1} onSubmit={handleList}>
          <TextField
            name="list"
            label="List Name"
            onChange={handleChange}
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
                handleChange={handleChange}
                handleCardAdder={handleCardAdder}
                textField={textField}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
