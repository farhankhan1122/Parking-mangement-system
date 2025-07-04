import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { LoginService } from '../../services/login-service/login.service';
import { LoginRequestData, LoginResponseData } from '../../models/login.model';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: LoginRequestData = new LoginRequestData();
  loginService = inject(LoginService)

ngOnInit(): void {
    console.log(this.loginObj);
  }

  onLogin() {
    this.loginService.loginUser(this.loginObj).subscribe((res: LoginResponseData) => {
      alert('user found ... navigating')
    },error => {
      alert('wrong credentials')
    })
  }

}
