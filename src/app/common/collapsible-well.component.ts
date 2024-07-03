import { Component } from "@angular/core";

@Component({
    selector: 'collapsibe-well',
    template: `
    <div (click)="toggleContent()" class="well pointer">
    <h4>
        <ng-content select="[well-title]"></ng-content>
    </h4>
    <ng-content select="[well-body]" *ngIf="visible"></ng-content>
    </div>
    `
})
export class collapsibeWellComponent {
    visible: boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }
}
