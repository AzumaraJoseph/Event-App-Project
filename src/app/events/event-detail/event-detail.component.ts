import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";

@Component({
    templateUrl: './event-detail.component.html',
    styles: [`
    .container { padding: 0rem 1rem; }
    .event-image { height: 10rem; }
    a { cursor: pointer}
    button { margin-right: 1rem; }
    `]
})
export class EventDetailComponent implements OnInit{
    constructor( private eventService: EventService, private route: ActivatedRoute) {}
    event: any;
    addMode!: boolean;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    ngOnInit() {        
        this.route.data.forEach(data => {
            this.event = data['event'];
            this.addMode = false;
        });
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSessions(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map((cur: { id: number; }) => cur.id));
        session.id = nextId + 1;

        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}