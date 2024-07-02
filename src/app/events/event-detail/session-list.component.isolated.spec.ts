import { AuthService } from "src/app/user/auth.service"
import { SessionListComponent } from "./session-list.component"
import { voterService } from "./voterService.service"
import { ISession } from "../shared";

describe('sessionListComponent', () => {
    let component: SessionListComponent, mockAuthService: AuthService, mockVoterService: voterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[{name: 'session 1', level: 'intermediate'}, {name: 'session 2', level: 'beginners'}, {name: 'session 3', level: 'intermediate'}];

            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;
            component.ngOnChanges();


            expect(component.visibleSessions.length).toBe(2);
        });

        it('should sort the sessions correctly', () => {
            component.sessions = <ISession[]>[{name: 'session 1', level: 'intermediate'}, {name: 'session 3', level: 'beginners'}, {name: 'session 2', level: 'intermediate'}];

            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;
            component.ngOnChanges();

            expect(component.visibleSessions[2].name).toBe('session 3');
        });
    })
})