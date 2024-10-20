import type {Executor} from '../';
import type {NoteDto} from '../model/dto/';
import type {
    ErisResult, 
    NewNoteInput, 
    UpdateNoteInput, 
    Void
} from '../model/static/';

export class NoteController {
    
    constructor(private executor: Executor) {}
    
    readonly deleteNote: (options: NoteControllerOptions['deleteNote']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/note/delete';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<ErisResult<Void>>;
    }
    
    readonly getNoteDetail: (options: NoteControllerOptions['getNoteDetail']) => Promise<
        ErisResult<NoteDto['NoteController/NOTE_DETAIL']>
    > = async(options) => {
        let _uri = '/note/detail';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ErisResult<NoteDto['NoteController/NOTE_DETAIL']>>;
    }
    
    readonly getNoteList: () => Promise<
        ErisResult<ReadonlyArray<NoteDto['NoteController/NOTE_WITH_TITLE']>>
    > = async() => {
        let _uri = '/note/list';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ErisResult<ReadonlyArray<NoteDto['NoteController/NOTE_WITH_TITLE']>>>;
    }
    
    readonly newNote: (options: NoteControllerOptions['newNote']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/note/new';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<ErisResult<Void>>;
    }
    
    readonly updateNote: (options: NoteControllerOptions['updateNote']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/note/update';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<ErisResult<Void>>;
    }
}

export type NoteControllerOptions = {
    'getNoteList': {}, 
    'getNoteDetail': {
        readonly id: string
    }, 
    'newNote': {
        readonly body: NewNoteInput
    }, 
    'updateNote': {
        readonly body: UpdateNoteInput
    }, 
    'deleteNote': {
        readonly id: string
    }
}
