import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import FileInput from '../../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ArtistMutation } from '../../../types';
import { selectUser } from '../../users/usersSlice';
import { selectArtistsCreateLoading } from '../artistsSlice';
import { createArtist } from '../artistsThunk';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectArtistsCreateLoading);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [dispatch, navigate, user]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createArtist(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler} style={{ width: '50%' }}>
      <h2 style={{ color: 'white' }}>Add artist</h2>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            id="name"
            label="Artist Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
          />
        </Grid>

        <Grid item xs>
          <TextField
            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
            multiline
            rows={3}
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
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
  );
};

export default ArtistForm;
