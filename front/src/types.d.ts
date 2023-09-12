export interface IArtistBase {
    name: string;
    image: string | null;
    description: string;
}

export interface IArtistFull {
    id: string;
    name: string;
    description: string;
    image: string | null;
}