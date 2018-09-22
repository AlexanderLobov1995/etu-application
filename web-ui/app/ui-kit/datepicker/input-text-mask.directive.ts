import {Directive, ElementRef, forwardRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
  host: {
    '(input)': '_handleInput($event.target.value)'
  },
  selector: '[appInputTextMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextMaskDirective),
    multi: true
  }
  ]
})
export class InputTextMaskDirective implements  OnInit, OnChanges, ControlValueAccessor{

  @Input() appInputTextMask = {
    mask: [],
    placeholderChar: '_'
  };


  constructor( private elementRef: ElementRef, private _renderer: Renderer2){
    console.log('wwww')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2')
    console.log(changes)
  }

  onChange = (_: any) => {}

  registerOnChange(fn: any): void {
    this.onChange = fn
    console.log(fn)
    console.log('registerOnChange')
  }

  registerOnTouched(fn: any): void {
    console.log(fn)
    console.log('registerOnTouched')
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled)
    console.log('setDisabledState');
  }

  writeValue(obj: any): void {
    console.log(obj)
    console.log('writeValue')
  }

  _handleInput(value: string) {
    // this._renderer.setProperty(this.elementRef.nativeElement, 'disabled', true)
    this.update(value);

    console.log(this.elementRef.nativeElement.selectionEnd)
    // this.elementRef.nativeElement.selectionEnd = 0;
    // this.elementRef.nativeElement.value = 'dd.mm.yyyy'
    // console.log(this._renderer, this.elementRef)
    // console.log(value);
    // const  a = value + '.'
    // this._renderer.setProperty(this.elementRef.nativeElement, 'value', a)
    // this.onChange(a);
    // console.log(this.onChange)
    // console.log('eee')
  }

  convertMaskToPlaceholder(mask = [], placeholderChar = '_', value = ''){
    console.log(value);
    return mask.map((char) => {
      console.log('char= ', (char instanceof RegExp) ? ( placeholderChar) : char)
      return (char instanceof RegExp) ? ( placeholderChar) : char
    }).join('')
  }

  update(value: string = ''){
    const {mask, placeholderChar} = this.appInputTextMask;
    const placeholder = this.convertMaskToPlaceholder(mask, placeholderChar, value);

    console.log('placeholder= ', placeholder);
    this._renderer.setProperty(this.elementRef.nativeElement, 'value', placeholder)

  }

  ngOnInit(): void {
    this.update();
    /*console.log(this.appInputTextMask.mask)
    this.elementRef.nativeElement.value = 'dd.mm.yyyy'
    this.elementRef.nativeElement.selectionEnd = 0;*/
  }
}