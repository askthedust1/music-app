import React, { useEffect } from 'react';
import './history.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectHistory, selectHistoryLoading } from './trackHistorySlice';
import { fetchHistory } from './trackHistoryThunk';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = useAppSelector(selectHistory);
  const loading = useAppSelector(selectHistoryLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchHistory());
    }
  }, [dispatch, navigate, user]);

  return (
    <div className="size">
      <h1 className="artist" style={{ color: 'white' }}>
        Tracks History
      </h1>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div>
          {history?.map((item) => (
            <div className="tracksList" key={item._id}>
              <p className="tracksList-track">{item.track.name}</p>
              <p className="tracksList-artist">{item.artist.name}</p>
              <p className="tracksList-time">
                {dayjs(item.datetime).format('DD.MM.YYYY HH:mm:ss')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackHistory;
