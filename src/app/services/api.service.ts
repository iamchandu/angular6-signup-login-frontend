import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import * as CryptoJS from 'crypto-js';
import { unwrapResolvedMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base = "http://localhost:3000";
  key : any;
  iv : any;

  auth_token : any;
  user : any;
  options;

  constructor(private http: Http) { 
    this.key = CryptoJS.enc.Hex.parse("8500641681234567");
    this.iv  = CryptoJS.enc.Hex.parse("2811da22377d62fcfdb02f29aad77d9e");
  }

  getUsersList(){
    return this.http.get(this.base+'/get-users').pipe(map(res=>res.json()));
  }
  signupuser(user){
    user.password = this.encryptdata(user.password);
    return this.http.post(this.base+"/create-user",user).pipe(map(res=>res.json()));
  }
  encryptdata(values): string {
    var encrypted ;
    encrypted = CryptoJS.AES.encrypt(values, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding
    });
    return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
  }
  
  login(user) : any{
    user.password = this.encryptdata(user.password);
    return this.http.post(this.base+'/login',user).pipe(map(res => res.json()));
  }

  storageuserdata(token,user) : void{
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.auth_token = token;
    this.user = user;
  }
  createauthenticatioheader(){
    this.loadToken();
    this.options = new RequestOptions({
      headers : new Headers({
        'Content-Type' : 'application/json',
        'auth' : this.auth_token,
      })
    });
  }

  loadToken(){
    this.auth_token = localStorage.getItem('token');
  }
  logout(){
    this.auth_token = null;
    this.user = null;
    localStorage.clear();
  }
  getToken():string{
    return localStorage.getItem('token');
  }

  getprofile(){
    this.createauthenticatioheader();
    return this.http.get(this.base+'/profile',this.options).pipe(map(res => res.json()));
  }

}
