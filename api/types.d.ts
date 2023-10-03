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

export interface IAlbumNew {
    name: string;
    image: string | null;
    date: string;
    artist: {
        _id: string;
        name: string;
    };
    trackAmount?: number;
}

export interface IUser {
    username: string;
    password: string;
    name?: string;
    token: string;
    role: string;
    googleID?: string;
}

