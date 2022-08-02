import { CartService } from './../../services/cart.service';
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
  public filterCategory: any;
  searchKey: string = '';
  message = '';

  constructor(
    private http: HttpClient,
    private _productoService: ProductoService,
    private cartService: CartService
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
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.precio });
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filter(categoria: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.categoria == categoria || categoria == '') {
        return a;
      }
    });
  }
}
