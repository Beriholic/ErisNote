import type {Executor} from '../';
import type {ErisResult, Void} from '../model/static/';

export class UserController {
    
    constructor(private executor: Executor) {}
    
    readonly check: () => Promise<
        ErisResult<boolean>
    > = async() => {
        let _uri = '/user/auth';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<boolean>>;
    }
    
    readonly login: (options: UserControllerOptions['login']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/user/login';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.username;
        _uri += _separator
        _uri += 'username='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.password;
        _uri += _separator
        _uri += 'password='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<Void>>;
    }
    
    readonly logout: () => Promise<
        ErisResult<Void>
    > = async() => {
        let _uri = '/user/logout';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<Void>>;
    }
    
    readonly register: (options: UserControllerOptions['register']) => Promise<
        ErisResult<Void>
    > = async(options) => {
        let _uri = '/user/register';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.username;
        _uri += _separator
        _uri += 'username='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.password;
        _uri += _separator
        _uri += 'password='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<ErisResult<Void>>;
    }
}

export type UserControllerOptions = {
    'register': {
        readonly username: string, 
        readonly password: string
    }, 
    'login': {
        readonly username: string, 
        readonly password: string
    }, 
    'check': {}, 
    'logout': {}
}
