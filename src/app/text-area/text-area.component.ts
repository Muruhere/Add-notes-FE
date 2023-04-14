import { Component } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  isDisabled = true;
  enteredText: string = '';

  addNoteValidation(): void {
    this.isDisabled = this.enteredText.trim() && this.enteredText ? false : true;
  }

  openDropdown(event: KeyboardEvent): void {
    if(event.key === '@') {
      //TODO
    }
  }

  clearText(): void {
    this.enteredText = '';
    this.isDisabled = true;
  }
}
