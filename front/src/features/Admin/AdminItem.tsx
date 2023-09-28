import { Button } from '@mui/material';
import React from 'react';

interface IProps {
    _id: string;
    name: string;
    title?: string;
    isPublished: boolean;
    onToggle: (id: string) => void;
    onDel: (id: string) => void;
}

const AdminItem: React.FC<IProps> = ({_id, name, title, isPublished, onToggle, onDel}) => {

    return (
        <div>
            <div className="tracksList">
                <p className="tracksList-track">{name}</p>
                <p className="tracksList-artist">{title}</p>
                <Button onClick={() => onToggle(_id)} variant="outlined">{isPublished ? 'Unpublish' : 'Publish'}</Button>
                <Button onClick={() => onDel(_id)} variant="outlined">Delete</Button>
            </div>
        </div>
    );
};

export default AdminItem;