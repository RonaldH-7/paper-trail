import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { UserService } from './user.service';
import { Group } from '../interfaces/group.interface';
import { User } from '../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

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
        this.dbService.post('groups', newGroup).subscribe(res => {
            let groupId: string = (res as any).name;
            this.userService.addGroupToUser(creatorUID, groupId);
        });
    }

    addCategory(groupId: string, category: string) {
        this.dbService.get('groups', groupId).subscribe(res => {
            let group = res as Group;

            if (!group.categories) {
                group.categories = [];
            }

            if (!group.categories.includes(category)) {
                group.categories.push(category);
                this.dbService.put('groups', groupId, group).subscribe();
            }
        });
    }

    getCategories(groupId: string) {
        // let group: Group = await firstValueFrom(this.dbService.get('groups', groupId)) as Group;
        // console.log(group);
        // return group.categories;
        // firstValueFrom(this.dbService.get('groups', groupId)).then(res => {
        //     return (res as Group).categories;
        // })
    }
}
