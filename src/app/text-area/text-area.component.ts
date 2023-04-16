import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {

  isDisabled = true;
  enteredText: string = '';
  agentNames: string[] = ['Gina Williams', 'Jake Williams', 'Jamie John', 'John Doe', 'Jeff Stewart', 'Paula M.Keith'];
  isDropdownVisible: boolean = false;
  currentPosition: number = 0;
  index = 0;

  addNoteValidation(): void {
    this.isDisabled = this.enteredText.trim() && this.enteredText ? false : true;
  }

  openDropdown(event: KeyboardEvent): void {
    const textArea: any = document.getElementById('text-area-id');
    const currentCursorPoint = textArea?.selectionStart;
    this.currentPosition = currentCursorPoint <= 70 ? currentCursorPoint : this.doCursorCalc(currentCursorPoint);
    // if (textArea) {
    //   textArea.focus();
    //   textArea.selectionEnd = currentCursorPoint + 15;
    // }
    this.currentPosition = Math.min(this.currentPosition, 60) * 8 + 60;
    const dropdown = document.getElementById('dropdown-id');
    if (dropdown) {
      if (currentCursorPoint <= 70) {
        dropdown.style.left = `${this.currentPosition}px`;
      } else {
        dropdown.style.left = `${this.currentPosition}px`;
      }
    }
    if (event.key === '@') {
      this.isDropdownVisible = true;
    }
  }

  doCursorCalc(cursorPos: number): number {
    while (cursorPos > 70) {
      cursorPos / 2;
    }
    return cursorPos;
  }

  @HostListener('keydown', ['$event'])
  ArrowNavigation(event: KeyboardEvent) {
    if (this.isDropdownVisible) {
      const agentList: any = document.querySelectorAll('.dropdown-list');
      switch (event.key) {
        case 'ArrowUp':
          this.index = this.index > 0 ? --this.index : 0;
          agentList[this.index].focus();
          break;
        case 'ArrowDown':
          this.index = this.index < agentList.length - 1 ? ++this.index : agentList.length - 1;
          agentList[this.index].focus();
          break;
      }
      if (event.key === 'Escape' || event.key === 'Backspace') {
        this.isDropdownVisible = false;
      } else if (event.key === 'ArrowUp') {

      }
    }
  }

  setTextAreaValue(event: any): void {
    if (!(this.enteredText.length > 0)) {
      this.clearText();
    }
    if (!this.enteredText.includes(event.target.value)) {
      this.enteredText += event.target.value;
    } else {
      this.enteredText = this.enteredText.slice(0, this.enteredText.length - 2);
    }
    this.isDropdownVisible = false;
  }

  clearText(): void {
    this.enteredText = '';
    this.isDisabled = true;
    this.resetDialogPosition(20);
  }

  resetDialogPosition(positionValue: number): void {
    const dropdown = document.getElementById('dropdown-id');
    this.currentPosition = positionValue;
    dropdown ? dropdown.style.left = `${this.currentPosition}px` : '';
  }

  routeToPage(){
    }
}
