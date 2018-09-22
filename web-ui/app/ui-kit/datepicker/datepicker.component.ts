import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit, Renderer2,
  ViewChild
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type ViewTypes = 'month' | 'year';
export type DayTypes = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So';

export const LAST_MONTH = 11;
export const FIRST_MONTH = 0;
export const COUNT_DAY_OF_WEEK = 7;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit, AfterViewInit {

  @ViewChild('input')
  input: ElementRef;

  @ViewChild('datepickerContainer')
  datepickerContainer: ElementRef;

  @Input() firstDayOfWeek = 1;
  @Input() startView: ViewTypes = 'month';

  constructor( private _renderer: Renderer2){
    console.log(this._renderer);
  }

  $currentView: ViewTypes;

  mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  defaultHeaderDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  offsetDay: number;

  days: number[] = [];

  currentMonth = 0;
  currentYear = 2018;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;

  isActive = false;

  datepickerFormGroup: FormGroup;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.datepickerContainer.nativeElement.contains(event.target)) {
      this.isActive = false;
      this.input.nativeElement.blur();
    }
  }

  onInputFocus(){
    this.isActive = true;
  }

  ngOnInit() {

    this.datepickerFormGroup = new FormGroup({
      'input': new FormControl('', [
        Validators.required
      ])


    });
    this.initCalendar();
  }

  initCalendar() {
    this.$currentView = this.startView;
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.calculateDaysView(currentDate);
  }

  buildInputDate(){
    // const day = this.selectedDay || 'DD';
    // const month = this.selectedDay || 'MM';
    // const year = this.selectedYear || 'YYYY';
    // const date = [day, month, year].join('.');
    // this.input.nativeElement.value = date;
  }

  onTextChanged(){
    this.buildInputDate();
  }

  daysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  firstDayInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  }

  calculateDaysView(date: Date) {
    const daysInMonth = this.daysInMonth(date);
    const firstDay = this.firstDayInMonth(date);
    this. offsetDay = this.calculateOffsetDays(firstDay);
    for (let day = 1; day <= daysInMonth; day++) {
      this.days.push(day);
    }
  }

  calculateOffsetDays(firstDay: number) {
    if (this.firstDayOfWeek > firstDay) {
      return COUNT_DAY_OF_WEEK - this.firstDayOfWeek + firstDay;
    }
    return firstDay - this.firstDayOfWeek;
  }

  goBack() {
    if (this.$currentView === 'month') {
      this.goBackMonth();
    } else {
      this.goBackYear();
    }
    this.days = [];
    this.calculateDaysView(new Date(this.currentYear, this.currentMonth, 1));
  }

  goNext() {
    if (this.$currentView === 'month') {
      this.goNextMonth();
    } else {
      this.goNextYear();
    }
    this.days = [];
    this.calculateDaysView(new Date(this.currentYear, this.currentMonth, 1));
  }

  goBackMonth() {
    if (this.currentMonth === FIRST_MONTH) {
      this.currentMonth = LAST_MONTH;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
  }

  goNextMonth() {
    if (this.currentMonth === LAST_MONTH) {
      this.currentMonth = FIRST_MONTH;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
  }

  goBackYear() {
    this.currentYear -= 1;
  }

  goNextYear() {
    this.currentYear += 1;
  }

  toggleView() {
    if (this.$currentView === 'month') {
      this.$currentView = 'year';
    } else {
      this.$currentView = 'month';
    }
  }

  selectDay(day: number){
    this.selectedDay = day;
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.currentYear;
    this.isActive = false;
      console.log(day);
  }

  selectMonth(month: number){
    console.log(month)
    this.currentMonth = month;
  }

  isSelectedDate(day: number){
    return this.selectedDay === day && this.selectedMonth === this.currentMonth && this.selectedYear === this.currentYear;
  }

  get monthWithYear() {
    return this.$currentView === 'month' ? this.months[this.currentMonth] + ' ' + this.currentYear : this.currentYear;
  }

  get headerDays() {
    const defaultHeader = [...this.defaultHeaderDays];
    const firstHeaders = defaultHeader.splice(0, this.firstDayOfWeek);
    return defaultHeader.concat(firstHeaders);
  }

  get isMonthCurrentView() {
    return this.$currentView === 'month';
  }

  get currentView() {
    return this.$currentView;
  }

  get offsetDays(){
    const offsets: string[] = [];
    for (let offset = 0; offset < this.offsetDay; offset++) {
      offsets.push('');
    }
    return offsets;
  }

  get inputValue() {
    return this.formControl.value;
  }

  get formControl() {
    return this.datepickerFormGroup.controls['input'];
  }

  ngAfterViewInit(): void {
    // this._renderer.setProperty(this.input.nativeElement, 'value', 'dd.mm.yyyy')
  }

}