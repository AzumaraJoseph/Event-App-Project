import { FormControl } from "@angular/forms";

// export function restrictedWords(words: string[]) {
//     return (control: FormControl): {[key: string]: string} | null => {
//         if (!words) return null

//         let invalidWord = words
//         invalidWord.map(w => control.value.includes(w) ? w : null)
//         invalidWord.filter(w => w != null)

//         return invalidWord && invalidWord.length > 0 ? {'restrictedWord': invalidWord.join(', ')} : null
//     }
// }


export function restrictedWords(control: FormControl): {[key: string]: any} | null {
    return control.value.includes('foo') ? {'restrictedWord': 'foo'} : null
}
