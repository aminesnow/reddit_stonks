import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  page: string;

  constructor(
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.page = e.url;
      }
    });
  }

  isLoggedIn() {
    return this.usersService.loadToken() != undefined;
  }

  logout() {
    this.usersService.logOut();
    this.router.navigate(['/login']);
  }

  isActive(url: string){    
    return this.page.includes(url);
  }
}
