import { Component, OnInit } from "@angular/core";
import { EventService } from "./shared/event.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from "./shared/event.model";


@Component({
    template: `
    <div>
      <h1>Angular Upcoming Events</h1>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
            <event-thumbnail [event]="event"></event-thumbnail>
        </div>
      </div>
    </div>
    `
})
export class EventListComponent implements OnInit {
  sub!: Subscription
  events!: IEvent[];
  constructor( private eventService: EventService, private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.events = this.route.snapshot.data['events'];
  }
}

