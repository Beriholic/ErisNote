import type {Executor} from './';
import {CategoriesController, NoteController, UserController} from './services/';

export class Api {
    
    readonly categoriesController: CategoriesController
    
    readonly noteController: NoteController
    
    readonly userController: UserController
    
    constructor(executor: Executor) {
        this.categoriesController = new CategoriesController(executor);
        this.noteController = new NoteController(executor);
        this.userController = new UserController(executor);
    }
}