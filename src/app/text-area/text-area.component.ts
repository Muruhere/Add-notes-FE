import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  isDisabled = true;
  enteredText: string = '';
  agentNames: string[] = ['Gina Williams', 'Jake Williams', 'Jamie John', 'John Doe', 'Jeff Stewart', 'Paula M.Keith'];
  isDropdownVisible: boolean = false;
  currentPosition: number = 0;

  ngOnInit(): void {
  }

  addNoteValidation(): void {
    this.isDisabled = this.enteredText.trim() && this.enteredText ? false : true;
  }

  openDropdown(event: KeyboardEvent): void {
    const textArea: any = document.getElementById('text-area-id');
    const currentCursorPoint = textArea?.selectionStart;
    this.currentPosition = currentCursorPoint <= 70 ? currentCursorPoint : this.doCursorCalc(currentCursorPoint);
    console.log(this.currentPosition);
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
      // let textSize = this.currentPosition + event.target.value.length + 80;
      // this.currentPosition = textSize;
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
}
