import { Observable } from 'rxjs';
 
export default abstract class IService {
    abstract get<T>(arg?: number | string): Observable<T[]>;
    abstract post<T>(arg: T): Observable<T[]>;
    abstract patch<T>(arg: T): Observable<T[]>;
    abstract delete<T>(id: number): Observable<T[]>;
}