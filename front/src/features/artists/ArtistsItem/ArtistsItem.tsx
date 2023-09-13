import React from 'react';
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    _id: string;
    name: string;
    image: string | null;
}

const ArtistsItem: React.FC<IProps> = ({_id, name, image}) => {
    return (
        <Link to={`/albums/${_id}`} className="card">
            <div className="overlayer">
                <FontAwesomeIcon className="fa-8x" icon={faPlay} style={{color: "#ffffff"}} />
            </div>
            <img src={apiUrl + '/'  + image} alt={name}/>
                <div className="title">
                    <span>{name}</span>
                </div>
        </Link>
);
};

export default ArtistsItem;