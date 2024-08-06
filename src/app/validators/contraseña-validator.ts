import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors| null => {
    const value = control.value;

    if (!value) {
        return null
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase;

    return !passwordValid ? { passwordRequeriment: true} : null;
  };

}
