import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  signInValues = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.maxLength(32)]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.userService.checkLoggedIn();
  }

  ngOnInit() {
  }

  getFControl(value: string) {
    return this.signInValues.get(value) as FormControl;
  }

  onSubmit(): void {
    if (this.signInValues.invalid) {
      return;
    }
    this.userService.signIn(this.signInValues.getRawValue());
  }

}
