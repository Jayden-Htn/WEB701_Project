import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../_models/item.interface';
import { RouterModule } from '@angular/router';
import { ShopService } from '../_services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="item">
        <h5>{{ item.name }}</h5>
        <p>{{ item.description }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Quantity: {{ item.quantityAvailable }}</p>
        
        <button class="btn-primary btn-block" (click)="onPurchase()" [disabled]="item.quantityAvailable <= 0">
          <span>Buy</span>
        </button>
    </section>  
  `,
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input() item!:Item;

  constructor(private shopService: ShopService, private router: Router) {}

  onPurchase() {
    if (this.item.quantityAvailable > 0) {
      console.log("Purchasing:", this.item.name);

      this.shopService.purchaseItem(this.item._id).then(() => {
          console.log(`${this.item.name} purchased successfully`);
          // Navigate to account
          this.router.navigate(['/profile']);
        }).catch((err) => {
          console.log("Purchase error:", err);
        })
    } else {
      console.log("Error purchasing item, no items available");
    }
  }
}
