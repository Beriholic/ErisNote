export interface UpdateNoteInput {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly categoriesId: string;
}
