import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, MenuItem, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import FileInput from '../../../components/FileInput/FileInput';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {useNavigate} from "react-router-dom";
import {AlbumMutation} from "../../../types";
import {selectUser} from "../../users/usersSlice";
import {selectAlbumCreateLoading} from "../albumsSlice";
import {createAlbum} from "../albumsThunk";
import {selectArtists, selectLoading} from "../../artists/artistsSlice";
import {fetchArtists} from "../../artists/artistsThunk";
const AlbumsForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artists = useAppSelector(selectArtists);
    const loading = useAppSelector(selectAlbumCreateLoading);
    const user = useAppSelector(selectUser);
    const loadingArtist = useAppSelector(selectLoading);

    const [state, setState] = useState<AlbumMutation>({
        name: '',
        artist: '',
        image: null,
        date: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        dispatch(fetchArtists());
    }, [dispatch, navigate, user]);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(createAlbum(state)).unwrap();
            navigate('/');
        } catch (e) {
            alert('Invalid field');
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
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

    return !loadingArtist ? (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
            style={{width: '50%'}}
        >
            <h2 style={{color: 'white'}}>Add artist</h2>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        required
                        sx={{width: '100%', background: 'white', borderRadius: 2}}
                        select
                        label="Artist"
                        value={state.artist}
                        onChange={inputChangeHandler}
                        name="artist"
                    >
                        <MenuItem value="" disabled>Please select artist</MenuItem>
                        {artists.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                { item.name }
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        required
                        sx={{width: '100%', background: 'white', borderRadius: 2}}
                        id="name" label="Album Name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        required
                        sx={{width: '100%', background: 'white', borderRadius: 2}}
                        id="date" label="Album`s year"
                        value={state.date}
                        onChange={inputChangeHandler}
                        name="date"
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        onChange={filesInputChangeHandler}
                        name="image"
                        label="image"
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
                    > <span>Send</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    ) : <CircularProgress />;
};

export default AlbumsForm;