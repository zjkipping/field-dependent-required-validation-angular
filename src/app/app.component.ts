import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  fg: FormGroup;

  constructor () {
    this.fg = new FormGroup({
      amount: new FormControl(),
      periodCode: new FormControl()
    }, {
      validators: [
        dependentRequired('amount', 'periodCode'),
        dependentRequired('periodCode', 'amount')
      ]
    })
  }
}

function dependentRequired(main: string, dependent: string) {
  return (form: FormGroup) => {
    const mainControl = form.get(main);
    const dependentControl = form.get(dependent);

    if (dependentControl.value !== '' && dependentControl.value !== null && dependentControl.value !== undefined) {
      if (mainControl.value === '' || mainControl.value === null || mainControl.value === undefined) {
        return {
          dependentRequiredError: main
        };
      }
    }
    return null;
  }
}
