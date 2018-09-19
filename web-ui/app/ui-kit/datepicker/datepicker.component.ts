import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
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
export class DatepickerComponent implements OnInit {

  @Input() firstDayOfWeek = 1;
  @Input() startView: ViewTypes = 'month';

  $currentView: ViewTypes;

  mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  defaultHeaderDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  days: number[] = [];
  offsets: string[] = [];

  month = 0;
  year = 2018;

  datepickerFormGroup: FormGroup;

  ngOnInit(): void {

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
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.calculateDaysView(currentDate);
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
    const offsetDays = this.calculateOffsetDays(firstDay);
    for (let offsetDay = 0; offsetDay < offsetDays; offsetDay++) {
      this.offsets.push('');
    }
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
    this.offsets = [];
    this.calculateDaysView(new Date(this.year, this.month, 1));
  }

  goNext() {
    if (this.$currentView === 'month') {
      this.goNextMonth();
    } else {
      this.goNextYear();
    }
    this.days = [];
    this.offsets = [];
    this.calculateDaysView(new Date(this.year, this.month, 1));
  }

  goBackMonth() {
    if (this.month === FIRST_MONTH) {
      this.month = LAST_MONTH;
      this.year -= 1;
    } else {
      this.month -= 1;
    }
  }

  goNextMonth() {
    if (this.month === LAST_MONTH) {
      this.month = FIRST_MONTH;
      this.year += 1;
    } else {
      this.month += 1;
    }
  }

  goBackYear() {
    this.year -= 1;
  }

  goNextYear() {
    this.year += 1;
  }

  toggleView() {
    if (this.$currentView === 'month') {
      this.$currentView = 'year';
    } else {
      this.$currentView = 'month';
    }
  }

  get monthWithYear() {
    return this.$currentView === 'month' ? this.months[this.month] + ' ' + this.year : this.year;
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

  get inputValue() {
    const input = this.datepickerFormGroup.get('input');
    console.log(input && input.value);
    return input && input.value || '';
  }

}