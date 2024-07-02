// import { Injectable } from "@angular/core";
// import * as toast from 'toastr';

import { InjectionToken } from "@angular/core";

// // declare let toast = toaster;

// @Injectable({
//     providedIn: 'root'
// })
// export class EventToast {
//     success(message: string, title?: string) {
//         toast.success(message, title)
//     }
//     info(message: string, title?: string) {
//         toast.info(message, title)
//     }
//     warning(message: string, title?: string) {
//         toast.warning(message, title)
//     }
//     error(message: string, title?: string) {
//         toast.error(message, title)
//     }
// }

export const TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
    success(message: string, title?: string): void;
    info(message: string, title?: string): void;
    warning(message: string, title?: string): void;
    error(message: string, title?: string): void;
}