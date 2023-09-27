import React from 'react';
import dayjs from "dayjs";
import {useAppDispatch} from "../../app/hook";

interface IProps {
    _id: string;
    name: string;
    title?: string;
    isPublished: boolean;
}

const AdminItem: React.FC<IProps> = ({name, title, isPublished}) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="tracksList">
                <p className="tracksList-track">{name}</p>
                <p className="tracksList-artist">{title}</p>
                <p className="tracksList-time">{isPublished ? <button>Unpublish</button> : <button>Publish</button>}</p>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default AdminItem;