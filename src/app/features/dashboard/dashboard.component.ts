import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router'

// TODO - Remove these
import { User } from '../../interfaces/user.interface';
import { ExpenseService } from '../../services/expense.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private dbService: DbService,
    private http: HttpClient,
    private groupService: GroupService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUser();
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

  getUser() {
    let uid: any = this.authService.getUID();
    this.dbService.get('users', uid).subscribe(res => {
      this.user = res as User;
    });
  }

  // TODO - Remove this
  getFromDB() {
    let uid: any = this.authService.getUID();
    this.dbService.get('users', uid).subscribe(res => console.log("getFromDb: ", res));
    // this.dbService.get('users', uid);
  }
  
  // TODO - Remove this
  category: string;
  addCategory() {
    let groupId: string = this.user.groups[0].id;
    this.groupService.addCategory(groupId, this.category);
    this.category = '';
  }

  // TODO - Remove this
  getCategories() {
    // let uid: any = this.authService.getUID();
    // this.dbService.get('users', uid).subscribe(res => {
    //   let groupId = (res as User).groups[0];
    //   // let x = await this.groupService.getCategories(groupId);
    //   console.log(this.groupService.getCategories(groupId));
    // });
  }

  // TODO - Remove this
  group: string;
  createGroup() {
    let uid: any = this.authService.getUID();
    this.groupService.createGroup(uid, this.group).then(() => {
      this.group = '';
      this.getUser();
    });
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
