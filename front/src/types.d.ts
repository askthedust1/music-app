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
    artist: string;
}

export interface ITrackFull {
    _id: string;
    name: string;
    album: string;
    time: string;
    number: number;
}