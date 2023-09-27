import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { selectRegisterError } from './usersSlice';
import { register } from './usersThunk';
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hook";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
        name: ''
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
        } catch (e) {
            // nothing
        }
    };

    const getFieldError = (name: string) => {
        try {
            return error?.errors[name].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{color: 'white'}}>
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{width: '100%', background: 'white', borderRadius: 2}}
                                label="Username"
                                name="username"
                                autoComplete="new-username"
                                value={state.username}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('username'))}
                                helperText={getFieldError('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{width: '100%', background: 'white', borderRadius: 2}}
                                label="Name"
                                name="name"
                                autoComplete="new-name"
                                value={state.name}
                                onChange={inputChangeHandler}
                                error={!!getFieldError('name')}
                                helperText={getFieldError('name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{width: '100%', background: 'white', borderRadius: 2}}
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, background: '#00E20B', color: 'black'}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
export default Register;