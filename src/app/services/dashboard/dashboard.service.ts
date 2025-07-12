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
  apiUrl: string = 'https://api.freeprojectapi.com/api/SmartParking/'

  constructor(private http: HttpClient) { }

  getSitesByClientId(): Observable<ResponseModel> {
    const userData = this.loginService.loggedUserData;
    if (!userData) {
      throw new Error('User is not logged in.');
    }

    // const clientId = this.loginService.loggedUserData.extraId
    const clientId = userData.extraId;
    return this.http.get<ResponseModel>(this.apiUrl + "GetSitesByClientId?id=" + clientId)
  }

  getBuildingsBySiteId(siteId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetBuildingBySiteId?id=${siteId}`)
  }

  getFloorsByBuildingId(buildingId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetFloorsByBuildingId?id=${buildingId}`)
  }

  getAllParkingByFloor(floorId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetAllParkingByFloor?id=${floorId}`)
  }

  bookSpot(obj: any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}AddParking`, obj)
  }

  releaseSpot(obj: any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}MarExit`, obj)
  }
}

