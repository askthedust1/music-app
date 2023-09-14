import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchAlbums} from "./albumsThunk";
import {selectAlbumLoading, selectAlbums} from "./albumsSlice";
import AlbumsItem from "./AlbumsItem/AlbumsItem";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const Albums = () => {
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectAlbumLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    }, [dispatch, id]);

    const sortAlbums = albums.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    return (
        <div>
            <div className="wrapper">
                {
                    loading ? <SpinnerLoading/>
                        :
                        <div>
                            <h1 className="artist">{albums[0]?.artist.name}</h1>
                            <div className="cards">
                                {sortAlbums?.map((item, index) => (
                                    <AlbumsItem
                                        _id={item._id}
                                        key={index}
                                        image={item.image}
                                        name={item.name}
                                        date={item.date}
                                        tracksAmount={item.trackAmount}
                                    />
                                ))}
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Albums;