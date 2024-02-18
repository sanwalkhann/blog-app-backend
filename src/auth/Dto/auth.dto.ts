/* eslint-disable prettier/prettier */

import { Role } from "../schemas/user.schema"


export class CreateUserDto{
  
    readonly username:string
    readonly email:string
    readonly password:string
    readonly blogId:Array<string>
    readonly role:Role
}

