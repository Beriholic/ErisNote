import type {Dynamic_Categories, Dynamic_User} from './';

export interface Dynamic_Note {
    readonly id?: string;
    readonly title?: string;
    readonly content?: string;
    readonly createdAt?: string | undefined;
    readonly updatedAt?: string | undefined;
    readonly user?: Dynamic_User | undefined;
    readonly categories?: Dynamic_Categories | undefined;
}
