'use client'
import { useState } from "react";
import DraggableCard from "./DraggableCard";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { handleCardAdder } from "../hook/handleCardAdder";
import { handleChange } from "../hook/handleChange";

export default function DraggableList({
    list,
    index,
    textField,
    setTextField,
    lists,
    setList,
  }) {
    const [onDragOver, setOnDragOver] = useState(false);
    return (
      <Paper
        sx={{
          padding: "10px",
          zIndex: 2,
        }}
        // onDragOver={(e) => setOnDragOver(true)}
        // onDragLeave={(e) => setOnDragOver(false)}
      >
        <Stack
          alignItems="center"
          gap={2}
          component={"form"}
          onSubmit={(e) => handleCardAdder(e, list,setTextField,textField,setList)}
        >
          <Typography variant="h4">{[list]}</Typography>
          <TextField
            name={[list]}
            label="Enter Cards"
            onChange={(e)=>handleChange(e,setTextField)}
            value={textField[list] || ""}
            fullWidth
          />
          <Button variant="contained" fullWidth>
            Add Card
          </Button>
          <Stack width={"100%"} direction={"row"} gap={1} flexWrap={"wrap"} >
            {lists[list].map((card, index) => {
              return (
                <DraggableCard
                  lists={lists}
                  list={list}
                  card={card}
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