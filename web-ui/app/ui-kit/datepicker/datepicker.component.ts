import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type ViewTypes = 'month' | 'year' | 'multi-year';
export type DayTypes = 'Mo'| 'Di'| 'Mi'| 'Do'| 'Fr'| 'Sa'| 'So';
export type FirstDayOfWeekTypes = 'monday' | 'tuesday' |  'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit{

  @Input() startView: ViewTypes = 'month';
  @Input() firstDayOfWeek = 1;

  mask = [ /\d/, /\d/, '-',  /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  headerDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  days: number[] = [];
  offsets: string[] = [];

  month = 0;
  year = 2018;


  datepickerFormGroup: FormGroup

  ngOnInit(): void {

    this.datepickerFormGroup = new FormGroup({
      'input': new FormControl('', [
        Validators.required
      ])


    });
    this.initCalendar();
  }

  get inputValue(){
    const input = this.datepickerFormGroup.get('input');
    console.log(input && input.value);
    return input && input.value || '';
  }

  daysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month+ 1, 0).getDate();
  }

  firstDayInMonth(date: Date){
    console.log(date)
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = new Date(year, month, 1).getDay();
    // if (day === 0 && !this.isSundayFirstDay){
    //   day = 7;
    // }
    return day;
  }

  initCalendar(){
    // console.log(this.isSundayFirstDay)
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.calculateMonthView(currentDate);
  }

  get monthView(){
    return this.months[this.month];
  }

  get yearView(){
    return this.year;
  }

  get headers(){
    const firstHeaders = this.headerDays.splice(0, this.firstDayOfWeek);
    return this.headerDays.concat(firstHeaders);
  }

  calculateMonthView(date: Date){
    const daysInMonth = this.daysInMonth(date);
    console.log(daysInMonth)
    const firstDay = this.firstDayInMonth(date);
    console.log(firstDay)
    const offsetDays = this.calculateOffsetDays(firstDay);
    console.log(offsetDays)
    for (let offsetDay = 0; offsetDay < offsetDays; offsetDay++){
      this.offsets.push('');
    }
    for (let day = 1; day <= daysInMonth; day++){
      this.days.push(day);
    }
  }

  calculateOffsetDays(firstDay: number){
    if(this.firstDayOfWeek > firstDay){
      return 7 - this.firstDayOfWeek + firstDay;
    }
    return firstDay - this.firstDayOfWeek;
  }

  goBack() {
    if(this.month === 0){
      this.month = 11;
      this.year -=1;
      return;
    } else {
      this.month -= 1;
    }
    this.days = [];
    this.offsets = [];
    this.calculateMonthView(new Date(this.year, this.month, 1));
  }

  goNext(){
    if(this.month === 11){
      this.month = 0;
      this.year +=1;
      return;
    } else {
      this.month += 1;
    }
    this.days = [];
    this.offsets = [];
    this.calculateMonthView(new Date(this.year, this.month, 1));
  }


}