import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type ViewTypes = 'month' | 'year' | 'multi-year';
export type DayTypes = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.styl']
})
export class DatepickerComponent implements OnInit{

  @Input() startView: ViewTypes = 'month';

  mask = [ /\d/, /\d/, '-',  /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  days: DayTypes[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];


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
    return 32 - new Date(year, month, 32).getDate();
  }

  firstDayInMonth(date: Date){
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  }

  calculateMonthView(){
    const currentDate = new Date();
    console.log(currentDate.getDay());
    const daysInMonth = this.daysInMonth(currentDate);
    console.log(daysInMonth)
    const firstDay = this.firstDayInMonth(currentDate);
    console.log(firstDay)
    for (let i = 0; i < daysInMonth; i++){
      console.log(Math.ceil((firstDay + i + 1)/7))
    }
  }


}