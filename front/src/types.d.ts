export interface IArtistFull {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}

export interface ArtistMutation {
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
    artist: {
        _id: string;
        name: string;
    }
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
    youtube: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string,
            message: string,
        }
    },
    message: string,
    name: string,
    _message: string,
}

export interface RegisterMutation {
    username: string;
    password: string;
    name: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface IHistory {
    _id: string;
    track: {
        name: string;
    };
    artist: {
        name: string
    };
    user: string;
    datetime: string;
}

export interface IHistoryPost {
    track: string;
}