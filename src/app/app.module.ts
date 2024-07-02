import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {
  EventListComponent,
  EventThumbnail,
  EventDetailComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  upVoteComponent,
  LocationValidator,
  EventResolver,
} from './events/index';

import { AppRoutingModule } from './app-routing.module';
import { EventAppComponent } from './event-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { Error404Component } from './error/404.component';
import { UserModule } from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { collapsibeWellComponent, JQ_TOKEN, TOASTR_TOKEN, Toastr, SimpleModalComponent, ModalTriggerDirective } from './common/index';
import * as $ from 'jquery'


// let toastr: Toastr = window['toastr'];
const toastr: Toastr = (window as any)['toastr'];
const jQuery: any = (window as any)['$'];

@NgModule({
  declarations: [
    EventAppComponent,
    EventListComponent,
    EventThumbnail,
    NavBarComponent,
    EventDetailComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    collapsibeWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    DurationPipe,
    upVoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'events/sessions/new', component: CreateSessionComponent },
      { path: 'events/new', canDeactivate: ['canDeactivateCreateEvent'], component: CreateEventComponent },
      { path: 'events', component: EventListComponent, resolve: { events: EventListResolver } },
      { path: 'events/:id', component: EventDetailComponent, resolve: { event: EventResolver } },
      { path: '404', component: Error404Component },
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      //{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
    ], {preloadingStrategy: PreloadAllModules}),
    UserModule
  ],
  providers: [
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState},
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery }

  ],
  bootstrap: [EventAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if(component.isDirty) {
    return window.confirm( 'You have not saved this event, do you really want to cancel?');
  }
  return true;
}
