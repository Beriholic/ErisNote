import type {Dynamic_Categories, Dynamic_Note} from './';

export interface Dynamic_User {
    readonly id?: string;
    readonly username?: string;
    readonly password?: string;
    readonly categories?: ReadonlyArray<Dynamic_Categories>;
    readonly notes?: ReadonlyArray<Dynamic_Note>;
}
