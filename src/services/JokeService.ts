import { EMPTY, Observable } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import {Joke} from '../models/Joke';
import api from "../config/Api";
import { catchError } from "rxjs/operators";

export default class JokeService extends ErrorHandling implements IService {

    constructor(context: MessageContextProps){
        super(context);
    }

    get<Joke>(type: string): Observable<Joke[]> {
        return api.get<Joke[]>(`/jokes/${type}/ten`)
            .pipe(
                catchError(err => {
                    this.handleError("Joke error");
                    return [];
                })
            );
    }
    post<Joke>(arg: Joke): Observable<Joke[]> {
        throw new Error("Method not implemented.");
    }
    patch<T>(arg: T): Observable<T[]> {
        throw new Error("Method not implemented.");
    }
    delete<T>(id: number): Observable<T[]> {
        throw new Error("Method not implemented.");
    }

}