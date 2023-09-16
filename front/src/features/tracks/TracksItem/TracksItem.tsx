import React from 'react';
import {useAppDispatch} from "../../../app/hook";
import {createHistory} from "../../trackHistory/trackHistoryThunk";

interface IProps {
    _id: string;
    name: string;
    album?: string;
    time: string;
    number: number;
}

const TracksItem: React.FC<IProps> = ({ _id, name, time, number}) => {
    const dispatch = useAppDispatch();

    const addToHistory = async (idTrack: string) => {
        await dispatch(createHistory({track: idTrack}));
    }
    return (
        <div className="music" onClick={() => addToHistory(_id)}>
            <p className="music-number">{number}</p>
            <p className="music-title">{name}</p>
            <p className="music-duration">{time}</p>
        </div>
    );
};

export default TracksItem;