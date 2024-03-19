import React from 'react';
import s from "./TableSaveButton.module.css";
import CheckIcon from '@mui/icons-material/Check';

const TableSaveButton = ({onClick}) => {
    return (
        <CheckIcon
            disableElevation
            className={s.button}
            onClick={onClick}
            variant="contained">Modify</CheckIcon>
    );
};

export default TableSaveButton;