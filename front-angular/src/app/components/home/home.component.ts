import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitter/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productList: any;
  message = '';

  constructor(
    private http: HttpClient,
    private _productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/api/auth/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = 'You are not logged in';
          Emitters.authEmitter.emit(false);
        }
      );

    this._productoService.getProductos().subscribe((res) => {
      this.productList = res;
      console.log(res);
    });
  }
  
}
