import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'upVote',
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
                    <!-- <i *ngIf="!voted" class="glyphicon glyphicon-heart-empty"></i> -->
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./upVote.component.css']
})
export class upVoteComponent {
    @Input() set voted (val: boolean) {
        this.iconColor = val ? 'red' : 'white'
    }
    @Input() count!: number;
    @Output() vote: EventEmitter<any> = new EventEmitter();
    iconColor!: string;


    onClick() {
        this.vote.emit({});
    }
}

