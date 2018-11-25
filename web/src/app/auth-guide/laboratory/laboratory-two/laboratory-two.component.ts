import { ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LaboratoryService} from "../laboratory.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-laboratory-two',
  templateUrl: './laboratory-two.component.html',
  styleUrls: ['./laboratory-two.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaboratoryTwoComponent implements OnInit {

  initialHeader= `{
  "alg": "HS256",
  "typ": "JWT"
}`;

  initialPayload = `{
 "name": "ivan",
 "lastname": "ivanov",
 "age": 23,
 "aud": "admin",
 "sub": "learn jwt",
 "iss": "ivan ivanov"
}`;

  jwtToken = new BehaviorSubject('');

  inputFormGroup: FormGroup;
  encodeFormControl = new FormControl({value:'', disabled: true});
  headerFormControl  = new FormControl(this.initialHeader);
  payloadFormControl = new FormControl(this.initialPayload);
  signatureFormControl = new FormControl('');

  constructor(private laboratoryService: LaboratoryService) { }

  ngOnInit() {
    this.inputFormGroup = new FormGroup({
      encode: this.encodeFormControl,
      header: this.headerFormControl,
      payload: this.payloadFormControl,
      signature: this.signatureFormControl
    });
  }

  async check () {
    this.jwtToken.next(await this.laboratoryService.check(this.headerFormControl.value, this.payloadFormControl.value, this.signatureFormControl.value).toPromise());
  }

  get isCompleted () {
    return this.jwtToken.getValue() === 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaXZhbiIsImxhc3RuYW1lIjoiaXZhbm92IiwiYWdlIjoyMywiYXVkIjoiYWRtaW4iLCJzdWIiOiJsZWFybiBqd3QiLCJpc3MiOiJpdmFuIGl2YW5vdiJ9.4mG_VHVp_ulcvMLmaEMbFh3xfPI-WtGx6CmKO3TyUZ4kje6xSwM0X744txgeWkX0-xbSDXDSmd-7pE8sfWmWAw';
  }

  get isShowMessage() {
    return this.jwtToken.getValue();
  }

  get message() {
    return this.isCompleted? 'Поздравляем! Данная работа пройдена!': 'Неправильно! Повторите попытку...';
  }

}
