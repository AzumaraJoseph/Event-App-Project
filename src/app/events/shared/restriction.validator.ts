import { FormControl } from "@angular/forms";

export function restrictedWords(control: FormControl): {[key: string]: any} | null {
    return control.value.includes('foo') ? {'restrictedWord': 'foo'} : null
}
