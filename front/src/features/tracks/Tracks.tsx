import React, {useEffect, useState} from 'react';
import "./tracks.css";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import {fetchTracks} from "./tracksThunk";
import {useParams} from "react-router-dom";
import TracksItem from "./TracksItem/TracksItem";
import {apiUrl} from "../../constants";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import {ITrackFull} from "../../types";
import ModalUI from "../../components/ModalUI/ModalUI";
import {createHistory} from "../trackHistory/trackHistoryThunk";
import {selectUser} from "../users/usersSlice";

const Tracks = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectTracksLoading);
    const [show, setShow] = useState(false);
    const [track, setTrack] = useState<ITrackFull | null>(null);

    const open = async (track: ITrackFull) => {
        if (user) {
            await dispatch(createHistory({track: track._id}));
        } else {
            return;
        }
        setTrack(track);
        setShow(true);
    };

    const closeModal = () => {
        setTrack(null);
        setShow(false);
    };

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
                            {tracks.result.map((item, index) => (
                                <TracksItem
                                    _id={item._id}
                                    key={index}
                                    name={item.name}
                                    number={item.number}
                                    time={item.time}
                                    openModal={() => open(item)}
                                />
                            ))}
                            <ModalUI show={show} title={track?.youtube} onClose={closeModal}/>
                        </div>
                    </div>
            }
        </>
    );
};

export default Tracks;