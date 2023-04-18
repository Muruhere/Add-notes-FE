import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextAreaComponent {

  isDisabled = true;
  isError = false;
  enteredText = '';
  @ViewChild("backdrop") $backdrop: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("textarea") $textarea: ElementRef<HTMLTextAreaElement> | undefined;
  agentNames: string[] = ['Gina Williams', 'Jake Williams', 'Jamie John', 'John Doe', 'Jeff Stewart', 'Paula M.Keith'];
  isDropdownVisible = false;
  currentPosition = 0;
  index = 0;
  highlightedText = this.enteredText;
  isNoteAdded = false;

  addNoteValidation(): void {
    this.highlightedText = this.enteredText;
    this.applyHightlights();
    this.isDisabled = this.enteredText.trim() ? false : true;
  }

  @HostListener('keyup')
  showDropdownAgain() {
    if (this.enteredText.charAt(this.enteredText.length-1) === '@') {
      this.isDropdownVisible = true;
    }
  }

  openDropdown(event: KeyboardEvent): void {
    const textArea: any = document.getElementById('text-area-id');
    const currentCursorPoint = textArea?.selectionStart;
    this.currentPosition = currentCursorPoint <= 70 ? currentCursorPoint : this.doCursorCalc(currentCursorPoint);
    this.currentPosition = Math.min(this.currentPosition, 60) * 8 + 60;
    const dropdown = document.getElementById('dropdown-id');
    if (dropdown) {
      if (currentCursorPoint <= 70) {
        dropdown.style.left = `${this.currentPosition}px`;
      } else {
        dropdown.style.left = `${this.currentPosition}px`;
        //TODO dropdown position
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
        case 'ArrowLeft':
          this.index = this.index > 0 ? --this.index : 0;
          agentList[this.index].focus();
          break;
        case 'ArrowRight':
          this.index = this.index < agentList.length - 1 ? ++this.index : agentList.length - 1;
          agentList[this.index].focus();
          break;
        case 'Backspace':
          break;
        case 'Tab':
          break;
        case '@':
          break;
        case 'Enter':
          event.preventDefault();
          break;
        default:
          this.isDropdownVisible = false;
      }
    }
  }

  setTextAreaValue(event: any): void {
    if (!this.enteredText.includes(event.target.value)) {
      this.enteredText += event.target.value;
    } else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 2000);
      this.enteredText = this.enteredText.slice(0, this.enteredText.length - 2);
    }
    this.applyHightlights();
    const textArea: any = document.getElementById('text-area-id');
    textArea.focus();
    this.isDropdownVisible = false;
  }
  applyHightlights(): void {
    this.enteredText = this.enteredText ? this.enteredText.replace(/\n$/g, "\n\n") : '';
    this.highlightedText = this.enteredText;
    this.agentNames.forEach(agentName => {
      this.highlightedText = this.highlightedText
        .replace(new RegExp(`@${agentName}`, 'g'), "<mark class='marked-class'>$&</mark>");
    });

  }

  clearText(): void {
    this.enteredText = '';
    this.isDisabled = true;
    this.resetDialogPosition(20);
    this.highlightedText = '';
  }

  resetDialogPosition(positionValue: number): void {
    const dropdown = document.getElementById('dropdown-id');
    this.currentPosition = positionValue;
    dropdown ? dropdown.style.left = `${this.currentPosition}px` : '';
  }

  handleOverflow(): void {
    if (this.$backdrop && this.$textarea) {
      const scrollTop = this.$textarea.nativeElement.scrollTop;
      this.$backdrop.nativeElement.scrollTop = scrollTop;
    }
  }

  successMsg() {
    this.isNoteAdded = true;
    this.clearText();
    setTimeout(() => {
      this.isNoteAdded = false;
    }, 3000);
  }
}
