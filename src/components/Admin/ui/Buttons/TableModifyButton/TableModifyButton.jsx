import React from 'react';
import CreateIcon from "@mui/icons-material/Create";
import s from './TableModifyButton.module.css'

const TableModifyButton = ({onClick}) => {
    return (
        <CreateIcon
            disableElevation
            className={s.button}
            onClick={onClick}
            variant="contained">Modify</CreateIcon>
    );
};

export default TableModifyButton;