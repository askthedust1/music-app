import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectHistory} from "./trackHistorySlice";
import {fetchHistory} from "./trackHistoryThunk";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectHistory);

    console.log(history)

    useEffect( () => {
         dispatch(fetchHistory());
    }, [dispatch]);

    return (
        <div>
            {history?.map((item, index) => (
                <div className="music" key={index}>
                    <p className="music-number">{item.track.name}</p>
                    <p className="music-title">{item.track.album.artist.name}</p>
                    <p className="music-duration">{item.datetime}</p>
                </div>
            ))}
        </div>
    );
};

export default TrackHistory;