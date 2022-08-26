import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private dbService: DbService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']))
      .catch((err) => console.log(err.message));
  }

  // TODO - Remove this
  printUID() {
    console.log(this.authService.getUID());
  }

  // TODO - Remove this
  getFromDB() {
    let uid: any = this.authService.getUID();
    this.dbService.get('users', uid).subscribe(res => console.log("getFromDb: ", res));
    // this.dbService.get('users', uid);
  }
  
  // TODO - Remove this
  test() {
    // let x = this.authService.currentUser();
    // console.log(x);
    // this.http.get('https://paper-trail-20094-default-rtdb.firebaseio.com/').subscribe((res) => {
    //   console.log(res)
    // });

    // POST Request
    // let data = {
    //   "1231dfnpou3": {
    //     name: "John",
    //     email: "john@email.com" 
    //   } 
    // };
    // let table = 'users.json';
    // this.http.post("https://paper-trail-20094-default-rtdb.firebaseio.com/" + table, data).subscribe(res => {
    //   console.log(res);
    // });

    // PUT Request
    this.http.put('https://paper-trail-20094-default-rtdb.firebaseio.com/users/apple.json', {"one": 1}).subscribe();

    // GET Request
    // this.http.get("https://paper-trail-20094-default-rtdb.firebaseio.com/myTable/N6hInUAUPPh9UfIZe8D.json").subscribe(res => {
    //   console.log(res);
    // })
  }
}
