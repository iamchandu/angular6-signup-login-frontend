import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : usr;
  showalert : boolean;
  alertmsg : string;
  constructor(private api : ApiService) { }

  ngOnInit() {
    this.showalert = false;
    this.alertmsg = '';
    this.user = {
      name : '',
      password : '',
      email : '',
      phone : '',
      roleId : 2
    };
  }
  saveuser(){
    if(this.user.name && this.user.email && this.user.password && this.user.phone){
      this.api.signupuser(this.user).subscribe((res)=>{
        this.showalert = true;
        if(res.status){
          this.alertmsg = 'User Created Successfully.';
          this.user = {
            name : '',
            password : '',
            email : '',
            phone : '',
            roleId : 2
          };
        }else{
          this.alertmsg = 'User Not Created.';
        }
      });
    }else{
      this.showalert = true;
      this.alertmsg = "Please fill all the fields..";
    }
  }
}
interface  usr  {
  name : string,
  password : string,
  email : string,
  phone : string,
  roleId : number
}
