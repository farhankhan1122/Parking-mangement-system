import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  loginSrc = inject(LoginService)
  router = inject(Router)


  logout() {
    localStorage.removeItem('parkUser')
    this.router.navigateByUrl('/login')
  }


    
}
