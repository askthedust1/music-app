export interface ITrack {
    name: string;
    album: string;
    time: string;
    number: number;
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

export interface IUser {
    username: string;
    password: string;
    token: string;
}