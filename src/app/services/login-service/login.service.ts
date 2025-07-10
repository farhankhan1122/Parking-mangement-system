import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequestData, LoginResponseData } from '../../models/login.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedUserData !: LoginResponseData
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId)

    if(this.isBrowser) {
      const loggedData = localStorage.getItem('parkUser')
      if(loggedData != null){
        this.loggedUserData = JSON.parse(loggedData)
      }
    }
   }

  loginUser(obj: LoginRequestData): Observable<LoginResponseData> {
    return this.http.post<LoginResponseData>("https://api.freeprojectapi.com/api/SmartParking/login", obj)
  }
}
