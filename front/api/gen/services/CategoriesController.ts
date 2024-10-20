import type {Executor} from '../';
import type {CategoriesDto, NoteDto} from '../model/dto/';
import type {ErisResult, Void} from '../model/static/';

export class CategoriesController {
    
    constructor(private executor: Executor) {}
    
    readonly deleteCategories: (options: CategoriesControllerOptions['deleteCategories']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/categories/delete';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.id;
        _uri += _separator
        _uri += 'id='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<Void>>;
    }
    
    readonly getCategories: () => Promise<
        ErisResult<ReadonlyArray<CategoriesDto['CategoriesController/CATEGORIES_BASE']>>
    > = async() => {
        let _uri = '/categories/list';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ErisResult<ReadonlyArray<CategoriesDto['CategoriesController/CATEGORIES_BASE']>>>;
    }
    
    readonly getCategoriesNotes: (options: CategoriesControllerOptions['getCategoriesNotes']) => Promise<
        ErisResult<ReadonlyArray<NoteDto['CategoriesController/NOTE_IN_CATEGORIES']>>
    > = async(options) => {
        let _uri = '/categories/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ErisResult<ReadonlyArray<NoteDto['CategoriesController/NOTE_IN_CATEGORIES']>>>;
    }
    
    readonly newCategories: (options: CategoriesControllerOptions['newCategories']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/categories/new';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.name;
        _uri += _separator
        _uri += 'name='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<Void>>;
    }
}

export type CategoriesControllerOptions = {
    'getCategories': {}, 
    'getCategoriesNotes': {
        readonly id: string
    }, 
    'newCategories': {
        readonly name: string
    }, 
    'deleteCategories': {
        readonly id: string
    }
}
