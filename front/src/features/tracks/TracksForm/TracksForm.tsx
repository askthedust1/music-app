import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useNavigate } from 'react-router-dom';
import { selectArtists, selectLoading } from '../../artists/artistsSlice';
import { selectAlbums } from '../../albums/albumsSlice';
import { selectUser } from '../../users/usersSlice';
import { TrackMutation } from '../../../types';
import { fetchArtists } from '../../artists/artistsThunk';
import { fetchAlbums } from '../../albums/albumsThunk';
import { CircularProgress, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { createTrack } from '../tracksThunk';
import { selectCreateTrack } from '../tracksSlice';

const TracksForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectCreateTrack);
  const user = useAppSelector(selectUser);
  const loadingArtist = useAppSelector(selectLoading);

  const [artistId, setArtistId] = useState('');

  const [state, setState] = useState<TrackMutation>({
    name: '',
    album: '',
    time: '',
    number: '',
    youtube: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());

    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [artistId, dispatch, navigate, user]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createTrack(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const inputArtistHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArtistId(e.target.value);
  };

  return !loadingArtist ? (
    <form autoComplete="off" onSubmit={submitFormHandler} style={{ width: '50%' }}>
      <h2 style={{ color: 'white' }}>Add track</h2>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <select
            name="artist"
            id="artist"
            style={{ width: '100%', padding: '10px 10px', borderRadius: '5px' }}
            value={artistId}
            onChange={inputArtistHandler}
            required
          >
            <option value="">Artist:</option>
            {artists &&
              artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
          </select>
        </Grid>
        <Grid item xs>
          <select
            name="album"
            id="album"
            style={{ width: '100%', padding: '10px 10px', borderRadius: '5px' }}
            value={state.album}
            onChange={inputChangeHandler}
            disabled={!artistId}
            required
          >
            <option value="">Albums:</option>
            {albums &&
              albums.newAlbums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.name}
                </option>
              ))}
          </select>
        </Grid>

        <Grid item xs>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            id="name"
            label="Track Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
          />
        </Grid>

        <Grid item xs>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            id="number"
            label="Track`s number"
            value={state.number}
            onChange={inputChangeHandler}
            name="number"
          />
        </Grid>

        <Grid item xs>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            id="time"
            label="Track`s duration"
            value={state.time}
            onChange={inputChangeHandler}
            name="time"
          />
        </Grid>

        <Grid item xs>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            id="youtube"
            label="Track`s youtube link"
            value={state.youtube}
            onChange={inputChangeHandler}
            name="youtube"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            type="submit"
            size="small"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            {' '}
            <span>Send</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  ) : (
    <CircularProgress />
  );
};

export default TracksForm;
