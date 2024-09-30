import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../_services/user.service';
import { Item } from '../_models/item.interface';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  standalone: true,
  imports: [NgFor, NgIf, ItemComponent],
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content: Item[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Get items
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = JSON.parse(data)
      },
      error: err => {console.log(err)
        if (err.error) {
          console.log(JSON.parse(err.error).message);
        } else {
          console.log("Error with status: " + err.status);
        }
      }
    });
  }
}