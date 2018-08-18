import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:user;
  showalert : boolean;
  alertmsg : string;
  profile : prof;
  constructor(private api : ApiService) { }

  ngOnInit() {
    this.user = {
      name : '',
      password : ''
    };
    this.profile = {
      status : false,
      message : '',
      data : []
    }
    this.showalert = false;
    this.alertmsg = '';
    if(this.api.getToken()){
      this.profiledets();
    }
  }

  login(){
    if(this.user.name && this.user.password){
      this.api.login(this.user).subscribe(res=>{
        if(res.status){
          this.api.storageuserdata(res.token,res.user);
          this.user = {
            name : '',
            password : ''
          };
          this.profiledets();
        }else{
          this.showalert = true;
          this.alertmsg = 'Login Fail...';
          this.user.password = '';
        }
      });
    }else{
      this.showalert = true;
      this.alertmsg = 'Please check all the fields.';
    }
  }

  profiledets(){
    this.api.getprofile().subscribe(res=>{
      if(res.status){
        this.profile = res;
      }else{
        this.profile = res;
        this.showalert = true;
        this.alertmsg =this.profile.message;
      }
    });
  }

  logout(){
    this.api.logout();
    this.user = {
      name : '',
      password : ''
    };
    this.profile = {
      status : false,
      message : '',
      data : []
    }
  }
}
interface user{
  name : string,
  password : string
}
interface prof{
  status : boolean,
  message : string,
  data : any
}
