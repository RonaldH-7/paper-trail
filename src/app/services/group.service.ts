import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { UserService } from './user.service';
import { Group } from '../interfaces/group.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(
        private dbService: DbService,
        private userService: UserService
    ) { }

    async createGroup(creatorUID: string, name?: string) {
        let newGroup: Group = {
            name: name ? name : 'personal',
            members: [],
            creator: creatorUID,
            expenses: [],
            income: [],
            categories: [],
            isDeletable: name ? true : false
        };

        // Creates the group and adds it to the gorup array for the user
        this.dbService.post('groups', newGroup).then(groupRes => {
            let groupId: string = (groupRes as any).name;
            this.userService.addGroupToUser(creatorUID, groupId);
        });
    }
}
