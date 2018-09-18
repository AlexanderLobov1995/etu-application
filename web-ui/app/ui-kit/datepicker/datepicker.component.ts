import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type ViewTypes = 'month' | 'year' | 'multi-year';
export type DayTypes = 'Mo'| 'Di'| 'Mi'| 'Do'| 'Fr'| 'Sa'| 'So';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.styl']
})
export class DatepickerComponent implements OnInit{

  @Input() startView: ViewTypes = 'month';

  mask = [ /\d/, /\d/, '-',  /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  headerDays: DayTypes[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  days: number[] = [];
  offsets: string[] = [];

  month: number;


  datepickerFormGroup: FormGroup

  ngOnInit(): void {

    this.datepickerFormGroup = new FormGroup({
      'input': new FormControl('', [
        Validators.required
      ])


    });
    this.calculateMonthView();
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
    if (day === 0){
      day = 7;
    }
    return day;
  }

  calculateMonthView(){
    const currentDate = new Date();
    console.log(currentDate.getDay());
    const daysInMonth = this.daysInMonth(currentDate);
    console.log(daysInMonth)
    const firstDay = this.firstDayInMonth(currentDate);
    console.log(firstDay)
    const offsetDays = firstDay === 0 ? firstDay: firstDay - 1;
    console.log(offsetDays)
    for (let offsetDay = 0; offsetDay < offsetDays; offsetDay++){
      this.offsets.push('');
    }
    for (let day = 1; day <= daysInMonth; day++){
      this.days.push(day);
    }
  }


}