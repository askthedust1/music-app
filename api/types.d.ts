export interface ITrack {
    name: string;
    album: IAlbum;
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
    artist: {
        _id: string;
        name: string;
    };
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}