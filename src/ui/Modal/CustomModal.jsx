import React from 'react';
import {Backdrop, css, styled} from "@mui/material";
import Fade from "@mui/material/Fade";
import { Modal as BaseModal } from '@mui/base/Modal';
import {grey} from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    padding: '0,10,0,10',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 24px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        & .modal-title {
            line-height: 1.5rem;
            margin: 0;
            font-family: 'Arial', sans-serif;
            width: 100%;
        }

        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `,
);
const CustomModal = ({open, handleClose, children, title, width = 400}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <ModalContent sx={{width:width}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <h2 id="unstyled-modal-title" className="modal-title">
                            {title}
                        </h2>
                        <CloseIcon onClick={handleClose} style={{cursor:'pointer', padding:4}}/>
                    </div>

                    <div style={{width: '100%', height: 2, background: '#999', opacity: 0.5, marginBottom:20}}></div>
                    {children}
                </ModalContent>
            </Fade>
        </Modal>
    );
};

export default CustomModal;