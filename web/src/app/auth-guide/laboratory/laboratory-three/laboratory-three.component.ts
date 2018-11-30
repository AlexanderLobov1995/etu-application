import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LaboratoryService} from "../laboratory.service";
import {BehaviorSubject} from "rxjs";
import {UserResponse} from "../../auth/auth-interfaces";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-laboratory-three',
  templateUrl: './laboratory-three.component.html',
  styleUrls: ['./laboratory-three.component.styl'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
          ]
        )]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaboratoryThreeComponent implements OnInit {

  tokenFormControl: FormControl;
  formGroup: FormGroup;

  userResponse = new BehaviorSubject<UserResponse>(undefined);

  constructor(private laboratoryService: LaboratoryService) { }

  ngOnInit() {
    this.tokenFormControl = new FormControl('');
    this.formGroup = new FormGroup({
      token: this.tokenFormControl
    });
  }

  check () {
    this.laboratoryService.getUserDetails(this.tokenFormControl.value)
      .toPromise()
      .then((userResponse) => {
        this.userResponse.next(userResponse)
      })
      .catch((error)=> {
        if(error.errorMessage = 'Unauthorized') {
          this.tokenFormControl.setErrors({error: 'Токен невалидный'});
        }
        this.userResponse.next(undefined)
      })
    ;
  }

  get errorMessage() {
    return this.tokenFormControl.getError('error');
  }

}
