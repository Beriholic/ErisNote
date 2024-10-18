import type {Executor} from '../';
import type {ErisResult, UserRegisterInput, Void} from '../model/static/';

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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<ErisResult<Void>>;
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
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<ErisResult<Void>>;
    }
}

export type UserControllerOptions = {
    'register': {
        readonly body: UserRegisterInput
    }, 
    'login': {
        readonly body: UserRegisterInput
    }, 
    'check': {}, 
    'logout': {}
}
