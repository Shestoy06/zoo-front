import React from 'react';
import s from "./TableNewButton.module.css";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";

const TableNewButton = ({onClick, disabled}) => {
    return (
        <Button
            disabled={disabled}
            className={s.button}
            disableElevation
            onClick={onClick}
            variant="contained"><AddIcon/></Button>
    );
};

export default TableNewButton;