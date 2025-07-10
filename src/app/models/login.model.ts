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