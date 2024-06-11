import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../../shared/Services/auth/auth-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../shared/form.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: AuthUserService
  ) {
    this.authForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/), // No contener signos
        ],
      ],
      email: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  //En prueba
  onSubmit() {
    const email = this.authForm.get('email')?.value;
    const usuario = this.authForm.get('username')?.value;
  }
  notificationStatus() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario encontrado',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
