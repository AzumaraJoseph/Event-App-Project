import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { EventService } from "../shared";


@Injectable({
    providedIn: 'root'
})
export class EventResolver implements Resolve<any> {
    constructor(private eventService: EventService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.eventService.getEvent(route.params['id']);

        // return this.eventService.getEvents().pipe(map(events => events))
    }
}