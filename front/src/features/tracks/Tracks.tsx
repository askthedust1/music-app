import React, {useEffect} from 'react';
import "./tracks.css";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import {fetchTracks} from "./tracksThunk";
import {useParams} from "react-router-dom";
import TracksItem from "./TracksItem/TracksItem";
import {apiUrl} from "../../constants";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const Tracks = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectTracksLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {
                loading ? <SpinnerLoading/>
                    :
                    tracks &&
                    <div className="container">
                        <div id="album" className="album-info">
                            <img className="album-image" src={apiUrl + '/' + tracks.artist.image || undefined} alt={tracks?.artist.name}/>
                            <p className="album-title">{tracks.artist.name}</p>
                            <p className="album-artist">{tracks.artist.artist.name}</p>
                        </div>
                        <div id="list" className="album-musics">
                            {tracks?.result.map((item, index) => (
                                <TracksItem
                                    _id={item._id}
                                    key={index}
                                    name={item.name}
                                    number={item.number}
                                    time={item.time}
                                />
                            ))}
                        </div>
                    </div>
            }
        </>
    );
};

export default Tracks;