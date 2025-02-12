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
import BasicMenu from "./BasicMenu";

export default function DraggableCard({ card, index, list, lists,setLists }) {
  let [isMoving, setIsMoving] = useState(false);
  let [dragOver, setDragOver] = useState(false);
  
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
        <Stack direction={"row"} alignItems={'center'} justifyContent={"space-between"}>
          <Typography variant="body2">{`${card}`}</Typography>
          <BasicMenu list={list} lists={lists} setLists={setLists} card={card} />
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
