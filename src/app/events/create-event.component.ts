import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";

@Component({
    templateUrl: './create-event.component.html',
    styles: [`
      em { float: right; padding-left: 1rem; color: #E05c65; }
      .error input { background-color: #E3C3C5; }
      // .error input-placeholder { color: #999; }
      .error ::-webkit-input-placeholder { color: #999; }
      .error ::-moz-placeholder { color: #999; }
      .error :-moz-placeholder { color: #999; }
      .error :-ms-input-placeholder { color: #999; }
    `]
})
export class CreateEventComponent {
    constructor(private router: Router, private eventService: EventService) {}

    isDirty: boolean = true;
    newEvent: any;

    cancel(): void {
        this.router.navigate(['/events']);
    }

    saveEvent(newEventValues: string) {
        this.eventService.saveEvent(newEventValues).subscribe(() => {
            this.isDirty = false;
            this.router.navigate(['/events']);
        });
    }
}