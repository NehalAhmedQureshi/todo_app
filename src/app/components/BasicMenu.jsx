import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, MenuList, Select, Typography } from "@mui/material";
import { Edit, MoreVert } from "@mui/icons-material";

export default function BasicMenu({ list ,lists , setLists,card,priority}) {
  console.log("🚀 ~ BasicMenu ~ card:", card)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListChange = (e) => {
    let {value} = e.target
    let oldIndex = lists[list].indexOf({name : card , priority})
    console.log("🚀 ~ handleListChange ~ oldIndex:", oldIndex)
    lists[list].splice(oldIndex , 1)
    lists[value][lists[value].length] = {name : card , priority}
    localStorage.setItem('lists' , JSON.stringify({...lists}))
    const listData = JSON.parse(localStorage.getItem('lists'))
    setLists({...listData})

  };
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Select
            value={list}
            sx={{ height: "20px" }}
            onChange={handleListChange}
          >
            {Object.keys(lists).map((list, key) => (
              <MenuItem sx={{height: "20px",width:'100%'}} value={list} key={key}>
                <Typography variant="body2">{list}</Typography>
              </MenuItem>
            ))}
          </Select>
        </MenuItem>
      </Menu>
    </div>
  );
}
