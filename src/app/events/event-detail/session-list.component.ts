import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "../shared";
import { AuthService } from "src/app/user/auth.service";
import { voterService } from "./voterService.service";

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions!: ISession[];
    @Input() filterBy!: string;
    @Input() sortBy!: string
    @Input() eventId!: number;
    visibleSessions: ISession[] = [];
   
    constructor (public auth: AuthService, private voterservice: voterService) {}

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    filterSessions(filters: string) {
        if (filters === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filters.toLowerCase())
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterservice.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        } else {
            this.voterservice.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession): boolean {
        return this.voterservice.userHasVoted(session, this.auth.currentUser.userName);
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1
    else if (s1.name === s2.name) return 0
    return -1
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length
}