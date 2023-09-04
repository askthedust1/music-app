export interface ITrack {
    name: string;
    album: string;
    time: string;
}

export interface IArtist {
    name: string;
    image: string | null;
    description: string;
}

export interface IAlbum {
    name: string;
    image: string | null;
    date: string;
    artist: string;
}