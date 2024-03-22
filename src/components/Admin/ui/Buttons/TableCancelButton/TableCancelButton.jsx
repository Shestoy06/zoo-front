import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import s from "../TableDeleteButton/TableDeleteButton.module.css";

const TableCancelButton = ({onClick}) => {
    return (
        <CloseIcon
            disableElevation
            className={s.button}
            onClick={onClick}
            variant="contained">Modify</CloseIcon>
    );
};

export default TableCancelButton;