import React from 'react';

interface IProps {
    _id?: string;
    name: string;
    album?: string;
    time: string;
    number: number;
}

const TracksItem: React.FC<IProps> = ({ name, time, number}) => {
    return (
        <div className="music">
            <p className="music-number">{number}</p>
            <p className="music-title">{name}</p>
            <p className="music-duration">{time}</p>
        </div>
    );
};

export default TracksItem;