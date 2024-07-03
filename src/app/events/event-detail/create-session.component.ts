import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISession, restrictedWords } from "../shared";

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
      em { float: right; padding-left: 1rem; color: #E05c65; }
      .error input, .error textarea, .error select { background-color: #E3C3C5; }
      .error ::-webkit-input-placeholder { color: #999; }
      .error ::-moz-placeholder { color: #999; }
      .error :-moz-placeholder { color: #999; }
      .error :-ms-input-placeholder { color: #999; }
    `] 
})
export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession: EventEmitter<ISession> = new EventEmitter()
    @Output() cancelAddSession: EventEmitter<any> = new EventEmitter()

    newSessionForm!: FormGroup
    name!: FormControl
    presenter!: FormControl
    duration!: FormControl
    level!: FormControl
    abstract!: FormControl
    mouseOverSave!: boolean

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(30), restrictedWords]);
        
    
        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }



    saveSession(sessionValues: any) {
       const session: ISession = {
        id: undefined,
        name: sessionValues.name,
        presenter: sessionValues.presenter,
        duration: +sessionValues.duration,
        level: sessionValues.level,
        abstract: sessionValues.abstract,
        voters: []
       }

       this.saveNewSession.emit(session);
    }

    cancel() {
        this.cancelAddSession.emit();
    }
}