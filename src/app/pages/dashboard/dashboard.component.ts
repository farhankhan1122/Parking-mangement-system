import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { BuildingData, FloorData, ResponseModel, SiteData } from '../../models/login.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  router = inject(Router)
  siteList: SiteData[] = []
  buildingList: BuildingData[] = []
  floorList: FloorData[] = []
  dashboardService = inject(DashboardService)
  siteId: string = ''
  buildingId: string = ''
  floorId: string = ''
  parkingSpotArray: number[] = []
  bookSpotObj: any = {
    "parkId": 0,
    "floorId": 0,
    "custName": "",
    "custMobileNo": "",
    "vehicleNo": "",
    "parkDate": new Date(),
    "parkSpotNo": 0,
    "inTime": new Date(),
    "outTime": null,
    "amount": 0,
    "extraCharge": 0,
    "parkingNo": "string"
  }

  markExitObj: any =  {
  "parkId": 0,
  "outTime": new Date(),
  "extraCharge": 0
}
  bookedSpotList: any[] = []

  //  in angular there are many ways to open modal but viewchild is considered to be best one
  @ViewChild('bookSpot') bookModal!: ElementRef;
  // lets add ! because we dont want to initalize it
  @ViewChild('releaseSpot') releaseModal !: ElementRef;

  ngOnInit() {
    if (this.dashboardService.loginService.loggedUserData) {
      this.getSites();
    } else {
      // Optionally redirect to login or show a message
      this.router.navigate(['/login']);
    }
  }

  checkIfSpotBooked(spotNo: number) {
    const isExist = this.bookedSpotList.find((m: any) => m.parkSpotNo == spotNo && m.outTime == null)
    if(isExist != undefined) {
      return isExist
    } else {
      return undefined;
    }
  }

  onBookSpot() {
    this.dashboardService.bookSpot(this.bookSpotObj).subscribe((res: any) => {
      this.getBooking()
      this.closeModal()
    })
  }

  onExitCar() {
    this.dashboardService.releaseSpot(this.markExitObj).subscribe((res: any) => {
      this.getBooking()
      this.closeReleaseModal()
    })
  }

  getSites() {
    this.dashboardService.getSitesByClientId().subscribe((res: ResponseModel) => {
      this.siteList = res.data
    })
  }

  getBuildings() {
    this.parkingSpotArray = []
    this.floorList = []
    this.dashboardService.getBuildingsBySiteId(this.siteId).subscribe((res: any) => {
      this.buildingList = res.data
    })
  }

  getFloors() {
    this.parkingSpotArray = []
    this.floorList = []
    this.dashboardService.getFloorsByBuildingId(this.buildingId).subscribe((res: any) => {
      this.floorList = res.data
    })
  }

  onSelectFloor() {
    this.parkingSpotArray = []
    this.bookedSpotList = []
    const floor = this.floorList.find((m: any) => m.floorId == this.floorId);
    if (floor) {
      for (let index = 1; index <= floor.totalParkingSpots; index++) {
        this.parkingSpotArray.push(index);
      }
    }
    this.getBooking()
    
  }
  getBooking() {
    this.dashboardService.getAllParkingByFloor(this.floorId).subscribe((res: any) => {
      this.bookedSpotList = res.data
    })
  }

  openModal(spotNumber: number) {
    this.bookSpotObj.parkSpotNo = spotNumber
    this.bookSpotObj.floorId = this.floorId
    // whenever we are dealing with the viewchild use null check
    if (this.bookModal) {
      this.bookModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    // whenever we are dealing with the viewchild use null check
    if (this.bookModal) {
      this.bookModal.nativeElement.style.display = 'none';
    }
  }

  openReleaseModal(parkId: number) {
    this.markExitObj.parkId = parkId
    // whenever we are dealing with the viewchild use null check
    if (this.releaseModal) {
      this.releaseModal.nativeElement.style.display = 'block';
    }
  }

  closeReleaseModal() {
    // whenever we are dealing with the viewchild use null check
    if (this.releaseModal) {
      this.releaseModal.nativeElement.style.display = 'none';
    }
  }


}
