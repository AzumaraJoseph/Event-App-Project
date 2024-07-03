import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from "../common/event-toastr.service";

@Component({
    templateUrl: './profile.component.html',
    styles: [`
      em { float: right; padding-left: 1rem; color: #E05c65; }
      .error input { background-color: #E3C3C5; }
      .error ::-webkit-input-placeholder { color: #999; }
      .error ::-moz-placeholder { color: #999; }
      .error :-moz-placeholder { color: #999; }
      .error :-ms-input-placeholder { color: #999; }
    `]
})
export class ProfileComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {}

  private firstName!: FormControl
  private lastName!: FormControl
  profileForm!: FormGroup

  ngOnInit(): void {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  saveProfile(profileValues: any): void {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(profileValues.firstName, profileValues.lastName).subscribe(() => {
        this.toastr.success('Profile saved!');
        this.router.navigate(['/events']);

      });
    }
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
}