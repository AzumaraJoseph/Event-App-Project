import { AuthService } from "src/app/user/auth.service"
import { voterService } from "./voterService.service"
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { SessionListComponent } from "./session-list.component";
import { DurationPipe } from "../shared";
import { By } from "@angular/platform-browser";

describe('sessionListComponent', () => {
    let mockAuthService, 
    mockVoterService, 
    fixture: ComponentFixture<SessionListComponent>, 
    component: SessionListComponent, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    el: HTMLElement, 
    debugEl: DebugElement;

    beforeEach(() => {
        mockAuthService = { isAuthenticated: () => true, currentUser: {userName: 'joe'} };
        mockVoterService = { userHasVoted: () => true };

        TestBed.configureTestingModule({
            declarations: [
                SessionListComponent,
                DurationPipe,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: voterService, useValue: mockVoterService}
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });

        // we use schema or mock class component (to create a new component and use mock to prefix the class name) to ignore child components in a current component shallow test

        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        el = fixture.nativeElement;
    })
    
    describe('initial display', () => {

        it('should display name correctly', () => {
            component.sessions = [ { name: 'session 1', id: 3, presenter: 'john', duration: 2, level: 'beginners', abstract: 'abstract', voters: ['joe', 'jim'] }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 6;
            component.ngOnChanges(); // line 34 - 38 is arrange (our code)

            fixture.detectChanges(); // this line is act (on our existing code)

            // expect(el.querySelector('[well-title]')?.textContent).toContain('session 1');

            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1'); // the debug element is a wrapper around the native element, so we have to dig down to the native element to access the textcontent in the DOM Api
        })

        
    })
})

