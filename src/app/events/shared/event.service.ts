import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable, catchError, of } from "rxjs";
import { IEvent, ISession } from "./event.model";

@Injectable({
    providedIn: 'root'
})
export class EventService { 

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('/api/events').pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
  }


  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>('/api/events/' + id).pipe(catchError(this.handleError<IEvent>('getEvent')));
  }

  saveEvent(event: any) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    return this.http.post<IEvent>('/api/events', event, options).pipe(catchError(this.handleError<IEvent[]>('saveEvent', [])));
    // post('url', body, options)
  }

  searchSession(searchTerm: string): Observable<ISession[]> {
    return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm).pipe(catchError(this.handleError<ISession[]>('searchSession')));

  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}





