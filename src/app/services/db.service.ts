import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    url = 'https://paper-trail-20094-default-rtdb.firebaseio.com/';

    constructor(
        private http: HttpClient
    ) { }

    get(table: string, key: string) {
        const target = table + '/' + key + '.json';
        return this.http.get(this.url + target);
    }

    put(table: string, key: string, data: object) {
        const target = table + '/' + key + '.json';
        return this.http.put(this.url + target, data);
    }

    post(table: string, data: object) {
        const target = table + '.json';
        return this.http.post(this.url + target, data);
    }

    patch(table: string, key: string, data: object) {
        const target = table + '.json';
        return this.http.patch(this.url + target, data);
    }
}
