import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'event-app-root',
  template: `
    <nav-bar></nav-bar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class EventAppComponent {
  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
  }
}
