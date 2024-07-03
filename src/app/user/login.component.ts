import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styles: [`
    em { float: right; padding-left: 1rem; color: #E05C65; }
    `]
})
export class LoginComponent {
    constructor(private auth: AuthService, private route: Router) {}
    userName!: string;
    passWord!: string;
    mouseOverLogin!: boolean;
    loginInvalid = false;

    login(formValue: any): void {
        this.auth.loginUser(formValue.userName, formValue.password).subscribe(resp => {
            if (!resp) {
                this.loginInvalid = true;
            } else {
                this.route.navigate(['/events'])
            }
        });
    }

    cancel(): void {
        this.route.navigate(['/events']);
    }
}
