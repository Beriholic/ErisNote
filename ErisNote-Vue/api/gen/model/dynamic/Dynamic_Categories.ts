import type {Dynamic_User} from './';

export interface Dynamic_Categories {
    readonly id?: string;
    readonly name?: string;
    readonly user?: Dynamic_User | undefined;
}
