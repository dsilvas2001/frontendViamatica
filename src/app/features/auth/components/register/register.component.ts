import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usermanage } from '../../../../shared/Models/userModel';
import { AuthUserService } from '../../../../shared/Services/auth/auth-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../shared/form.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  correoGenerado: string = 'Generando...';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: AuthUserService
  ) {
    this.registerForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      identificacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
          this.noCuatroSeguidos,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%^&*])[A-Za-z0-9!#$%^&*]+$/
          ),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/), // No contener signos
        ],
      ],
      email: [''],
    });
    this.actualizarCorreoGenerado();
  }
  noCuatroSeguidos(control: FormControl) {
    const value = control.value;
    const pattern = /(\d)\1{3}/;
    if (pattern.test(value)) {
      return { noCuatroSeguidos: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.registerForm.get('nombres')?.valueChanges.subscribe(() => {
      this.actualizarCorreoGenerado();
    });

    this.registerForm.get('apellidos')?.valueChanges.subscribe(() => {
      this.actualizarCorreoGenerado();
    });
  }

  actualizarCorreoGenerado() {
    const nombresControl = this.registerForm.get('nombres');
    const apellidosControl = this.registerForm.get('apellidos');

    if (
      nombresControl &&
      nombresControl.value &&
      apellidosControl &&
      apellidosControl.value
    ) {
      const nombres = nombresControl.value.split(' ')[0].toLowerCase();
      const apellidos = apellidosControl.value.split(' ')[0].toLowerCase();
      const correo = `${nombres.charAt(0)}${apellidos}@gmail.com`;
      this.correoGenerado = correo;
    }
  }

  addUser() {
    console.log(this.registerForm.value['nombres']);
    const usermanage: Usermanage = {
      nombre: this.registerForm.value['nombres'],
      apellido: this.registerForm.value['apellidos'],
      identificacion: this.registerForm.value['identificacion'],
      usuario: this.registerForm.value['username'],
      password: this.registerForm.value['password'],
      email: this.correoGenerado,
    };
    console.log(usermanage);
    this._userService.addUser(usermanage).subscribe(
      (data) => {
        this.notificationAdd();
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.error();
        this.registerForm.reset();
      }
    );
  }
  notificationAdd() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se agrego correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  error(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Existen datos ya creados en la base de datos',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
