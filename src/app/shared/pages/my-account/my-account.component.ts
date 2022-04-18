import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.me().subscribe(user => {
      this.user = user;
    });
  }

  deleteClick () {
    this.userService.deleteUser().subscribe(() => {
      window.localStorage.removeItem('token');
      window.location.href = '/signin';
    });
  }

}
