export interface IArtistFull {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}


export interface IAlbumFull {
    _id: string;
    name: string;
    image: string | null;
    date: number;
    artist: string;
    trackAmount: number;
}

export interface IAlbumType {
    newAlbums: IAlbumFull[],
    artist: IArtistFull[]
}

export interface IAlbum {
    _id: string;
    name: string;
    image: string | null;
    date: number;
    artist: string;
}

export interface IAlbumFull {
    _id: string;
    name: string;
    image: string | null;
    date: number;
    artist: {
        _id: string;
        name: string;
    };
    trackAmount: number;
}

export interface IType {
    result: ITrackFull[];
    artist: {
        _id: string;
        name: string;
        image: string | null;
        date: number;
        artist: {
            _id: string;
            name: string;
        };
        trackAmount: number;
    };
}

export interface ITrackFull {
    _id: string;
    name: string;
    album: IAlbum;
    time: string;
    number: number;
}