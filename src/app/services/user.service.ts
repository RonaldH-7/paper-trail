import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private dbService: DbService
    ) { }

    createUser(uid: string, name: string, email: string) {
        if (uid) {
            let newUser: User = {
                name: name,
                email: email,
                groups: [],
                notifications: [],
                expenses: [],
                income: []
            };

            this.dbService.put('users', uid, newUser);
        } else {
            // TODO
            console.log("Cannot create user. UID is undefined");
        }
    }

    addGroupToUser(uid: string, groupId: string) {
        // Get information on the user who created the group
        this.dbService.get('users', uid).then(userRes => {
            // Adds the newly created group to the groups array
            let user: User = userRes as User;
            let groups: string[] = user.groups;
            if (!groups) {
                groups = [];
            }
            groups.push(groupId);
            user.groups = groups;

            // Updates the DB
            this.dbService.put('users', uid, user);
        });
    }
}
