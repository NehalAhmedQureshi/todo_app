"use client";

import {
  Box,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function DraggableCard({ card, index, list, lists,setLists }) {
  let [isMoving, setIsMoving] = useState(false);
  let [dragOver, setDragOver] = useState(false);
  const handleListChange = (e) => {
    let {value} = e.target
    let oldIndex = lists[list].indexOf(card)
    lists[list].splice(oldIndex , 1)
    lists[value][lists[value].length] = card
    setLists(lists)
    localStorage.setItem('lists' , JSON.stringify({...lists}))
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
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="body2">{`${card}`}</Typography>
          <Select
            value={list}
            sx={{ height: "20px" }}
            onChange={handleListChange}
          >
            {Object.keys(lists).map((list, key) => (
              <MenuItem sx={{ height: "20px" }} value={list} key={key}>
                <Typography variant="body2">{list}</Typography>
              </MenuItem>
            ))}
          </Select>
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
