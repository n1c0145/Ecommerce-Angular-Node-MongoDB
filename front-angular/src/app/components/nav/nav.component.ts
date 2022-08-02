import { CartService } from './../../services/cart.service';
import { Emitters } from '../../emitter/emitter';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-nav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  authenticated = false;
  public totalItem : number = 0;
  
  constructor(private http: HttpClient,private cartService : CartService) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length
    })
  }

  logout(): void {
    this.http.post('http://localhost:3000/api/auth/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }

}