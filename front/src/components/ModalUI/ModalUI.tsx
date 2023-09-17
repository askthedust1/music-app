import {Box, Modal} from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 560,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
};

interface Props {
    show: boolean;
    title: string | undefined;
    onClose: React.MouseEventHandler;
}

const ModalUi: React.FC<Props> = ({show, title, onClose}) => {

    return (
        <Modal
            open={show}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${title}`}
                    title="YouTube Video"
                    allowFullScreen
                />
            </Box>
        </Modal>
    );
};

export default ModalUi;