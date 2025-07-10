import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/login.model';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  loginService = inject(LoginService);

  constructor(private http: HttpClient) { }

  getSitesByClientId(): Observable<ResponseModel> {
    const clientId = this.loginService.loggedUserData.extraId
     return this.http.get<ResponseModel>('https://api.freeprojectapi.com/api/SmartParking/GetSitesByClientId?id='+clientId)
  }
}
