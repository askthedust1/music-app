import React from 'react';
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    _id: string;
    name: string;
    image: string | null;
    date: string;
    tracksAmount: number;
}

const AlbumsItem: React.FC<IProps> = ({_id, name, image, date, tracksAmount}) => {
    return (
        <Link to={`/tracks/${_id}`} className="card">
            <div className="overlayer">
                <i className="far fa-play-circle"></i>
            </div>
            <img src={apiUrl + '/' + image} alt={name}/>
            <div className="title">
                <span>{name}</span>
                <span>{date}</span>
                <h2>{tracksAmount}</h2>
            </div>
        </Link>
    );
};

export default AlbumsItem;