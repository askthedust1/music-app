import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectArtists, selectLoading} from "./artistsSlice";
import {fetchArtists} from "./artistsThunk";
import ArtistsItem from "./ArtistsItem/ArtistsItem";
import './artists.css';
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <div className="wrapper">
            <h1 className="artist">Artists</h1>
            {
                loading ? <SpinnerLoading/>
                    :
                    <div className="cards">
                        {artists.map((item, index) => (
                            <ArtistsItem
                                _id={item._id}
                                key={index}
                                image={item.image}
                                name={item.name}
                            />
                        ))}
                    </div>
            }

        </div>
    );
};

export default Artists;