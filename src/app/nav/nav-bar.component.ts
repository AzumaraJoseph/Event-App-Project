import { Component } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { EventService, ISession } from "../events";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`
    .nav.navbar-nav { font-size: 1.6rem; }
    #searchForm { margin-right: 10rem; }
    @media (max-width: 120rem) { #searchForm {display: hidden}}
    li a.active { color: #f97924}
    `]
})
export class NavBarComponent {
    constructor(public auth: AuthService, private eventService: EventService) {}

    searchTerm: string = "";
    foundSessions!: any;

    searchSessions(searchTerm: string) {
        this.eventService.searchSession(searchTerm).subscribe((sessions: ISession[]) => {
            this.foundSessions = sessions;
        });
    }
}




