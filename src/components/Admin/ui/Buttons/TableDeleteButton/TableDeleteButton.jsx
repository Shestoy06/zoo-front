import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import s from './TableDeleteButton.module.css'

const TableDeleteButton = ({onClick}) => {
    return (
        <DeleteIcon className={s.button} disableElevation variant="contained" onClick={onClick}>Delete</DeleteIcon>
    );
};

export default TableDeleteButton;