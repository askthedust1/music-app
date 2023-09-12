import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunk";
import ArtistsItem from "./ArtistsItem/ArtistsItem";
import './artists.css';
const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);
    return (
        <div className="wrapper">
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
        </div>
    );
};

export default Artists;