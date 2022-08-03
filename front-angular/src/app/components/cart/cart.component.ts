import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;

  constructor(private cartService: CartService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    this.toastr.warning('Producto eliminado');
  }
  emptycart(){
    this.cartService.removeAllCart();
    this.toastr.warning('Productos eliminados');

  }
}
