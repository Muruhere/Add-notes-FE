import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      imports: [FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check add to note button validation', () => {
    component.enteredText = '   ';
    component.addNoteValidation();
    expect(component.isDisabled).toBeTrue();
  });

  it('should clear text when the button is pressed', () => {
    component.enteredText = 'testData';
    component.highlightedText = '@testdata';
    component.clearText();
    expect(component.enteredText).toEqual('');
    expect(component.highlightedText).toEqual('');
    expect(component.isDisabled).toBeTrue();
  });

  // it('should do cursor calc', () => {
  //   expect(component.doCursorCalc(140)).toEqual(70);
  // });

  it('should show success Message and disappear after a while', () => {
    component.successMsg();
    setTimeout(() => {
      expect(component.isNoteAdded).toBeTrue();
    }, 3000);
  });


  it('should set text area value', () => {
    component.enteredText = '@testdata @';
    const event: any = {
      target: {
        value: '@testdata'
      }
    }
    component.setTextAreaValue(event);
    expect(component.enteredText).toEqual('@testdata');
    event.target.value = '@mockdata';
    component.enteredText = '@testdata '
    component.setTextAreaValue(event);
    expect(component.enteredText).toEqual('@testdata @mockdata')
  });

  it('should open Dropdown', () => {
    const event: any = {
      key: '@'
    }
    component.openDropdown(event as KeyboardEvent);
    expect(component.isDropdownVisible).toBeTrue();
  });

  it('should delete backdrop', () => {
    const event: any = {
      key: 'Backspace'
    }
    component.enteredText = '';
    component.highlightedText = '@mock';
    component.deleteBackDrop(event as KeyboardEvent);
    expect(component.highlightedText).toEqual('');
  });


  it('should manage keyboard navigation', () => {
    const event: any = {
      key: ''
    }
    component.isDropdownVisible = true;
    component.ArrowNavigation(event as KeyboardEvent);
    expect(component.isDropdownVisible).toBeFalse();
    component.isDropdownVisible = true;
    event.key = 'ArrowUp';
    component.ArrowNavigation(event as KeyboardEvent);
    expect(component.index).toBe(0);
    event.key = 'ArrowDown';
    component.ArrowNavigation(event as KeyboardEvent);
    expect(component.index).toBe(1);
  });


});
