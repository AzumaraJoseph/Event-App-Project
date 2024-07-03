// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { EventAppComponent } from './event-app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         EventAppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(EventAppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'EventApp-Fundamentals'`, () => {
//     const fixture = TestBed.createComponent(EventAppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('EventApp-Fundamentals');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(EventAppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('EventApp-Fundamentals app is running!');
//   });
// });