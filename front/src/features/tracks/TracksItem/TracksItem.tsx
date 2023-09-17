import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    _id: string;
    name: string;
    album?: string;
    time: string;
    number: number;
    openModal: () => void;
}

const TracksItem: React.FC<IProps> = ({ _id, name, time, number, openModal}) => {


    return (
        <div className="music" onClick={openModal}>
            <p className="music-number">{number}</p>
            <FontAwesomeIcon className="fa-1x icon" icon={faPlay} style={{color: "#ffffff"}} />
            <p className="music-title">{name}</p>
            <p className="music-duration">{time}</p>
        </div>
    );
};

export default TracksItem;