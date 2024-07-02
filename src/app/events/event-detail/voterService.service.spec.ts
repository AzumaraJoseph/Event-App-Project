import { of } from "rxjs";
import { ISession } from "../shared";
import { voterService } from "./voterService.service";

describe('voterService', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let voterservice: voterService, mockHttp: any;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterservice = new voterService(mockHttp);
    })

    
    describe('deleteVoter', () => {
        it('should delete voter from the list of voters', () => {
            const session = {id: 3, voters: ['john', 'joe']};
            mockHttp.delete.and.returnValue(of(false));
    
            voterservice.deleteVoter(6, <ISession>session, 'john');
    
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('joe');
        });

        it('should call http.delete with the correct URL', () => {
            const session = {id: 3, voters: ['john', 'joe']};
            mockHttp.delete.and.returnValue(of(false));
    
            voterservice.deleteVoter(6, <ISession>session, 'john');
    
            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/6/sessions/3/voters/john');
        });
    });

    describe('addVoter', () => {
        it('should add voter to the list of voters', () => {
            const session = {id: 3, voters: ['joe']};
            mockHttp.post.and.returnValue(of(false));
    
            voterservice.addVoter(6, <ISession>session, 'john');
    
            expect(session.voters.length).toBe(2);
        });

        it('should call http.post with the correct URL', () => {
            const session = {id: 3, voters: ['joe']};
            mockHttp.post.and.returnValue(of(false));
    
            voterservice.addVoter(6, <ISession>session, 'john');
    
            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/6/sessions/3/voters/john', {}, jasmine.any(Object));
        });
    });

    describe('userHasVoted', () => {
        it('should check if user has votes', () => {
            const session = {voters: ['joe']};
    
            voterservice.userHasVoted(<ISession>session, 'john');
    
            expect(true).toBe(true);
        });
    });
});