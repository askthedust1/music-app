import React, {useEffect} from 'react';
import "./tracks.css";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTracks} from "./tracksSlice";
import {fetchTracks} from "./tracksThunk";
import {useParams} from "react-router-dom";
import TracksItem from "./TracksItem/TracksItem";

const Tracks = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [dispatch, id]);

    const sortedTracks = [...tracks];
    sortedTracks.sort((a, b) => a.number - b.number);

    return (
        <div id="list" className="album-musics">
            {sortedTracks.map((item, index) => (
                <TracksItem
                    _id={item._id}
                    key={index}
                    name={item.name}
                    number={item.number}
                    time={item.time}
                />
            ))}
        </div>
    );
};

export default Tracks;