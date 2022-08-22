import {Address} from "./address";

export interface User{
  uid:number;
  userName: string;
  fullName: string;
  email: string;
  mobile:number;
  gender:string;
  dob:Date;
  address: Address;
  password:string;
}
export enum Gender{
  MALE,FEMALE,OTHERS
}
