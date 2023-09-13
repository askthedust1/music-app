import React from 'react';
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    _id: string;
    name: string;
    image: string | null;
    date: string;
}

const AlbumsItem: React.FC<IProps> = ({_id, name, image, date}) => {
    return (
        <Link to={`/tracks/${_id}`} className="card">
            <div className="overlayer">
                <i className="far fa-play-circle"></i>
            </div>
            <img src={apiUrl + '/' + image} alt={name}/>
            <div className="title">
                <span>{name}</span>
                <span>{date}</span>
            </div>
        </Link>
    );
};

export default AlbumsItem;