import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var Notify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // * Actualiza la fecha del footer
  date: number;
  // * Contiene los valores del formulario de log in.
  formLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // * Obtengo la fecha actual
    this.date = Date.now();
    // * Inicializo el formulario
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  logIn(): void {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
    Notify('Error en el email/contraseña.', null, null, 'danger');

    // * Redirecciono al main en caso de que la informacion de registro sea correcta
    this.router.navigateByUrl('/main');
  }

  /**
   * * Comprueba que el email sea invalido y regresa true
   * * si es invalido y si fue pulsado por el usuario
  */
  get invalidEmail() {
    return this.formLogin.get('email').invalid && this.formLogin.get('email').touched;
  }
  /**
   * * Comprueba que el password sea invalido y regresa true
   * * si es invalido y si fue pulsado por el usuario
  */
  get invalidPassword() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }

  /**
   * * Valida que todos los campos del formulario sean validos
   * * en caso de nos ser así marca a todos los inputs como touched
   * * para que se muestre el error al usuario.
  */
  validateForm() {
    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach(control => control.markAllAsTouched);
    }
  }

}
