import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  
  users : any;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getUsersList().subscribe(users=>{this.users=users});
  }
}
