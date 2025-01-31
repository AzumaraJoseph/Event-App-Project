import { Injectable } from "@angular/core";
import { IUser } from "./User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}
    currentUser!: IUser;

    loginUser(userName: string, password: string) {   
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
        const loginInfo = { username: userName, password: password }

        return this.http.post('/api/login', loginInfo, options)
         .pipe(tap(data => {
            if (data instanceof Object) {
                this.currentUser = <IUser>data
            }
            // OR this.currentUser = <IUser>data; //['user'];
        }))
        .pipe(catchError(err => {
            return of(false);
        }))
        
        
        // this.currentUser = {
        //     id: 1,
        //     userName: userName,
        //     firstName: 'John',
        //     lastName: 'Papa'
        // }
    }

    isAuthenticated() {
        // cast to a boolean(true): !!
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity').pipe(tap(data => {
            if (data instanceof Object) {
                this.currentUser = <IUser>data;
            }
        })).subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    logout() {
        this.currentUser = <any>undefined;
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.post('/api/logout', {}, options);
    }
}