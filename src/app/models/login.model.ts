export class LoginRequestData {
    
  emailId : string
  password : string

  constructor () {
    this.emailId = '',
    this.password = ''
  }

}


export interface LoginResponseData {
  userId: number
  emailId: string
  password: string
  createdDate: string
  projectName: string
  fullName: string
  mobileNo: string
  extraId: number
}

export interface ResponseModel {
  message: string
  result: boolean
  data: any
}

export interface SiteData {
  siteId: number
  clientId: number
  siteName: string
  siteCity: string
  siteAddress: string
  sitePinCode: string
  totalBuildings: number
  createdDate: string
}


export interface BuildingData {
  buildingId: number
  siteId: number
  buildingName: string
  buildingManagerName: string
  contactNo: string
  siteName: string
}

export interface FloorData {
  floorId: number
  buildingId: number
  floorNo: string
  isOperational: boolean
  totalParkingSpots: number
}