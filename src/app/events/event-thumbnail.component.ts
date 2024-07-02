import { Component, Input } from "@angular/core";
import { IEvent } from "./shared/event.model";

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
        <h2> {{event?.name | uppercase}} </h2>
        <div>Date: {{event?.date | date: 'shortDate'}}</div>
        <div [ngStyle]="getStartTimestyle()" [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'9:00 am'">(Normal Start)</span>
            <span *ngSwitchDefault>(Late Start)</span>
        </div>
        <div>Price: {{event?.price | currency: 'USD': 'symbol': '1.2-2'}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}} {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">
            Online Url: {{event?.onlineUrl}}
        </div>
    </div>
    `,
    styles: [`
        .green { color: #003300 !important; }
        .bold { font-weight: bold; }
        .pad-left { margin-left: 1rem; }
        .well div { color: #bbb; }
        .thumbnail { min-height: 21rem }
    `]
})
export class EventThumbnail {
    @Input() event!: IEvent;
    
    getStartTimestyle() {
        if (this.event.time === '8:00 am')
        return { color: '#003300', 'font-weight': 'bold'}
        return {}
    }
}

