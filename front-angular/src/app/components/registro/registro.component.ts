import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.http
      .post('http://localhost:3000/api/auth/register', this.form.getRawValue())
      .subscribe((data) => {
        this.router.navigate(['/login']);
        this.toastr.success('Inicia sesión', 'Registrado correctamente');
      },(err)=>{
        this.toastr.error('No se pudo registrar correctamente');
      });
  }
}
