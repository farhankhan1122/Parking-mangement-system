import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { LoginService } from '../../services/login-service/login.service';
import { LoginRequestData, LoginResponseData } from '../../models/login.model';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: LoginRequestData = new LoginRequestData();
  loginService = inject(LoginService)
  router = inject(Router)

ngOnInit(): void {
    console.log(this.loginObj);
  }

  onLogin() {
    this.loginService.loginUser(this.loginObj).subscribe((res: LoginResponseData) => {
      localStorage.setItem('parkUser', JSON.stringify(res))
      this.loginService.loggedUserData = res;
      this.router.navigateByUrl('/dashboard')
    },error => {
      alert('wrong credentials')
    })
  }

}
