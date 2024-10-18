export type NoteDto = {
    'CategoriesController/NOTE_IN_CATEGORIES': {
        readonly id: string;
        readonly title: string;
    }, 
    'NoteController/NOTE_DETAIL': {
        readonly id: string;
        readonly title: string;
        readonly content: string;
        readonly categories?: {
            readonly id: string;
            readonly name: string;
        } | undefined;
    }, 
    'NoteController/NOTE_WITH_TITLE': {
        readonly id: string;
        readonly title: string;
    }
}
