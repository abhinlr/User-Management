import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from "../../services/user.service";
import {KeyValuePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe,
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{
  @Input() user: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id:string | null = this.route.snapshot.paramMap.get('id');
    this.userService.getUsers().subscribe((users) => {
      this.user = users[Number(id)];
    });
  }

}
