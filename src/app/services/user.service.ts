import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { User } from '../interfaces/user.interface';
import { StoredCode } from '../interfaces/stored-code.interface';

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

            this.dbService.put('users', uid, newUser).subscribe();
        } else {
            // TODO
            console.log("Cannot create user. UID is undefined");
        }
    }

    addGroupToUser(uid: string, groupId: string, groupName: string) {
        // Get information on the user who created the group
        this.dbService.get('users', uid).subscribe(res => {
            // Adds the newly created group to the groups array
            let user: User = res as User;
            let groups: StoredCode[] = user.groups;
            if (!groups) {
                groups = [];
            }
            groups.push({
                id: groupId,
                name: groupName
            });
            user.groups = groups;

            // Updates the DB
            this.dbService.put('users', uid, user).subscribe();
        });
    }
}
