import React, {useEffect} from 'react';
import './history.css';
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectHistory, selectHistoryLoading} from "./trackHistorySlice";
import {fetchHistory} from "./trackHistoryThunk";
import {selectUser} from "../users/usersSlice";
import {useNavigate} from "react-router-dom";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const history = useAppSelector(selectHistory);
    const loading = useAppSelector(selectHistoryLoading)
    const user = useAppSelector(selectUser)

    if (!user) {
        navigate('/');
    }
    useEffect( () => {
        if (!user) {
            navigate('/');
        } else {
            dispatch(fetchHistory());
        }

    }, [dispatch, navigate, user]);

    return (
        <div className="size">
            <h1 className="artist" style={{color: 'white'}}>Tracks History</h1>
            {loading ? <SpinnerLoading/>
                :
                <div>
                    {history?.map((item, index) => (
                        <div className="tracksList" key={index}>
                            <p className="tracksList-track">{item.track.album.artist.name}</p>
                            <p className="tracksList-artist">{item.track.name}</p>
                            <p className="tracksList-time">{dayjs(item.datetime).format('DD.MM.YYYY HH:mm:ss')}</p>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
};

export default TrackHistory;