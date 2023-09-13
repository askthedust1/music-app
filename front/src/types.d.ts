export interface IArtistBase {
    name: string;
    image: string | null;
    description: string;
}

export interface IArtistFull {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}

export interface IAlbumBase {
    name: string;
    image: string | null;
    date: string;
    artist: string;
}

export interface IAlbumFull {
    _id: string;
    name: string;
    image: string | null;
    date: string;
    artist: {
        _id: string;
        name: string;
    };
}

export interface IAlbum {
    _id: string;
    name: string;
    image: string | null;
    date: string;
    artist: string;
}

export interface IType {
    result: ITrackFull[];
    artist: IAlbumFull;
}

export interface ITrackFull {
    _id: string;
    name: string;
    album: IAlbum;
    time: string;
    number: number;
}