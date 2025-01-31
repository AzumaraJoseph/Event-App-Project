import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { JQ_TOKEN } from "./JQ-toastr.service";

@Component({
    selector: 'simple-modal',
    template: `
    <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body" (click)="closeModal()">
                    <ng-Content></ng-Content>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .modal-body { overflow-y: scroll; height: 30rem }
    `]
    // height: 25rem;
})
export class SimpleModalComponent {
    @Input() title!: string;
    @Input() elementId!: string;
    @ViewChild('modalContainer') containerEl!: ElementRef;
    @Input() closeOnBodyClick!: string

    constructor ( @Inject(JQ_TOKEN) private $: any ) { }

    closeModal (): void {
        if (this.closeOnBodyClick.toLocaleLowerCase() === "true")
        this.$(this.containerEl.nativeElement).modal('hide');
    }
}
