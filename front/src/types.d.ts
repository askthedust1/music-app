export interface IArtistFull {
    _id: string;
    name: string;
    description: string;
    image: string | null;
    isPublished: boolean;
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
    isPublished: boolean;
}

export interface IAlbumAdmin {
    _id: string;
    name: string;
    artist: {
        _id: string;
        name: string;
    };
    isPublished: boolean;
}

export interface AlbumMutation {
    name: string;
    image: string | null;
    artist: string;
    date: string;
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
    album: {
        _id: string;
        name: string;
    };
    time: string;
    number: number;
    youtube: string;
    isPublished: boolean;
}

export interface TrackMutation {
    name: string;
    album: string;
    time: string;
    number: string;
    youtube: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    name: string;
    avatar: string | null;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
    name: string;
    token: string;
    role: string;
    avatar: string;
}

export interface RegisterResponse {
    user: IUser;
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