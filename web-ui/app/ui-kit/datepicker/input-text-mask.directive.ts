import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  host: {
    '(input)': '_handleInput($event.target.value)',
    '(focus)': 'update()'
  },
  selector: '[appInputTextMask]'
})
export class InputTextMaskDirective implements AfterViewInit {

  @Input() appInputTextMask = {
    mask: [],
    placeholder: '_'
  };

  previousValue = '';

  constructor(private elementRef: ElementRef, private _renderer: Renderer2) {}

  _handleInput(value: string) {
    this.update(value);
  }

  convertMaskToPlaceholder(mask = [], placeholderChar = '_', value = '') {
    console.log(value);
    return mask.map((char) => {
      return (char instanceof RegExp) ? (placeholderChar) : char
    }).join('')
  }

  update(value: string = '') {
    const {mask = []} = this.appInputTextMask;
    const maskSize = mask.length;
    // const valueSize = value.length;
    if (!value) {
      const value = mask.map((char, i) => {
        return (char instanceof RegExp) ? this.getPlaceholderChar(i) : char
      }).join('');
      this.previousValue = value;
      this._renderer.setProperty(this.elementRef.nativeElement, 'value', value)
      this.elementRef.nativeElement.selectionEnd = 0;
      return;
    }

    if (value.length > this.previousValue.length) {
      const actualPosition = this.elementRef.nativeElement.selectionEnd - 1;
      const newPosition = Math.min.apply(null, this.enabledChars
        .filter((c) => actualPosition <= c));
      if (mask[newPosition] && value[actualPosition].match(mask[newPosition])) {
        const newValue = Array.from(this.previousValue);
        newValue[newPosition] = value[actualPosition];
        this.previousValue = newValue.join('');
        this._renderer.setProperty(this.elementRef.nativeElement, 'value', this.previousValue);
        const posibleCaretPositions = this.enabledChars
          .filter((c) => (newPosition + 1) <= c);
        console.log('1_posibleCaretPositions= ', posibleCaretPositions);
        const caretPos = Math.min.apply(null, posibleCaretPositions.length ? posibleCaretPositions : [maskSize]);
        this.elementRef.nativeElement.selectionEnd = caretPos;
      } else {
        this._renderer.setProperty(this.elementRef.nativeElement, 'value', this.previousValue);
        this.elementRef.nativeElement.selectionEnd = actualPosition;
      }

    } else {
      const newPosition = Math.max.apply(null, this.enabledChars
        .filter((c) => this.elementRef.nativeElement.selectionEnd >= c));
      const newValue = Array.from(this.previousValue);
      newValue[newPosition] = this.getPlaceholderChar(newPosition);
      console.log('2_pos= ', newPosition);
      console.log('2_this.enabledChars= ', this.enabledChars);
      console.log('2_newValue= ', newValue)
      this.previousValue = newValue.join('');
      this._renderer.setProperty(this.elementRef.nativeElement, 'value', this.previousValue);
      this.elementRef.nativeElement.selectionEnd = newPosition;
    }

  }


  get enabledChars(): number[] {
    const {mask} = this.appInputTextMask;
    return mask.map((char, i) => (char instanceof RegExp) ? i : -1)
      .filter((i) => i >= 0)
  }

  getPlaceholderChar(position: number) {
    const {placeholder = '_'} = this.appInputTextMask;
    const index = this.enabledChars.findIndex((c) => c === position);
    console.log(index);

    return placeholder[index] || '_';
  }

  ngAfterViewInit() {
    // this.update();
  }
}