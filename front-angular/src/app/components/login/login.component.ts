import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {


    
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.http.post('http://localhost:3000/api/auth/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe((data) => {
      this.router.navigate(['/home'])
    },(err)=>{
      this.toastr.error('Usuario o contraseña incorrectos');
    }
  );
  }
}