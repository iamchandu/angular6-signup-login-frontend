import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base = "http://localhost:3000";
  constructor(private http: Http) { }

  getUsersList(){
    return this.http.get(this.base+'/get-users').pipe(map(res=>res.json()));
  }
  signupuser(user){
    return this.http.post(this.base+"/create-user",user).pipe(map(res=>res.json()));
  }
}
