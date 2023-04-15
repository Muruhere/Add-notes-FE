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

  ngOnInit(): void {
  }

  addNoteValidation(): void {
    this.isDisabled = this.enteredText.trim() && this.enteredText ? false : true;
  }

  openDropdown(event: KeyboardEvent): void {
    if (event.key === '@') {
      this.isDropdownVisible = true;
    }
  }

  @HostListener('keydown', ['$event'])
  ArrowNavigation(event: KeyboardEvent) {
    if (this.isDropdownVisible) {
      if (event.key === 'Escape') {
        this.isDropdownVisible = false;
      } else if (event.key === 'ArrowUp') {

      }
    }
  }

  setTextAreaValue(event: any): void {
    //110px
    const dropdown = document.getElementById('dropdown-id');
    console.log(dropdown);
    if (!this.enteredText.includes(event.target.label)) {
      this.enteredText += event.target.label;
      let textSize = 111 + event.target.label.length as string;
      if (dropdown) {
        dropdown.style.position = 'absolute';
        dropdown.style.top = '180px';
        dropdown.style.left = `${textSize}px`;
      }
    } else {
      this.enteredText = this.enteredText.slice(0, this.enteredText.length - 2);
    }
    this.isDropdownVisible = false;
  }

  clearText(): void {
    this.enteredText = '';
    this.isDisabled = true;
  }
}
