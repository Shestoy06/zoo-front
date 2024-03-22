import React from 'react';
import ImageIcon from "@mui/icons-material/Image";
import s from './TableImageButton.module.css'

const TableImageButton = ({onClick}) => {
    return (
        <ImageIcon
            className={s.button}
            disableElevation
            variant="contained"
            onClick={onClick}/>
    );
};

export default TableImageButton;