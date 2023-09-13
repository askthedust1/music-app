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
                <span style={{display: 'block'}}>{name}</span>
                <h6 className="subtext">{date}</h6>
                <h6 className="subtext" style={{padding: '0 10px'}}>&#183;</h6>
                <h6 className="subtext">{tracksAmount} tracks</h6>
            </div>
        </Link>
    );
};

export default AlbumsItem;