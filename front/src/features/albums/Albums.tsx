import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchAlbums} from "./albumsThunk";
import {selectAlbums} from "./albumsSlice";
import AlbumsItem from "./AlbumsItem/AlbumsItem";

const Albums = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    }, [dispatch, id]);
    return (
        <div>
            <div className="wrapper">
                {albums[0]?.artist.name}
                <div className="cards">
                    {albums.map((item, index) => (
                        <AlbumsItem
                            _id={item._id}
                            key={index}
                            image={item.image}
                            name={item.name}
                            date={item.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Albums;