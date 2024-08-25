import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TruncatePipe} from "../../common/pipes/truncate.pipe";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink,
    FormsModule,
    TruncatePipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userList:any[] = [];
  headers:string[] = [];
  currentPage:number = 1;

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data) => {
      this.userList = data.map((user) => ({
        ...user,
        isEditable: false
      }));
      if (this.userList.length) {
        this.headers = Object.keys(this.userList[0]).filter((key) => key !== 'isEditable');
      }
    });
  }

  toggleEditMode(index: number): void {
    this.userList.forEach(user => {
      user.isEditable = false;
    });
    this.userList[index].isEditable = true;
  }

  getGlobalIndex(i:number){
    return (this.currentPage - 1) * 10 + i;
  }

  updateUser(index: number, user: any): void {
    this.userService.updateUser(index, user);
  }

  cancelEdit(){
    this.getUsers();
  }

  calculateWidth() {
    return ((100-5) / (this.headers.length));
  }
}
