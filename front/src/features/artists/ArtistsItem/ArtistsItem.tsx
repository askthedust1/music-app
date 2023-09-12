import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    _id: string;
    name: string;
    image: string | null;
}

const ArtistsItem: React.FC<IProps> = ({_id, name, image}) => {
    return (
        <Link to={`/albums/${_id}`} className="card">
            <div className="overlayer">
                <i className="far fa-play-circle"></i>
            </div>
            <img src={apiUrl + '/'  + image} alt={name}/>
                <div className="title">
                    <span>{name}</span>
                </div>
        </Link>
);
};

export default ArtistsItem;