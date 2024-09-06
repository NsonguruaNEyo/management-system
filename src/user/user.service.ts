import { HttpException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/Entity/user.entity';
import * as argon2 from "argon2"
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtservice : JwtService){}

 async create(payload: CreateUserDto) {
    const{email, password, ...rest} =payload
    const user = await this.userRepo.findOne({where:{email:email}});
    if (user){
      throw new HttpException('sorry user with this email already exist', 400)
    }

    //for the user or hackers not to kn whz param is , throw the same httpexception message e.g: mail or password incorrect

    const hashPassword = await argon2.hash(password);

      const userDetails = await this.userRepo.save({
        email,
        password:hashPassword,
        ...rest
      })
      delete userDetails.password;
      const userpayload = {id: userDetails.id,email: userDetails.email};
      return{
        access_token:await this.jwtservice.signAsync(userpayload),
      };
  }

async findEmail(email:string){
  const mail =await this.userRepo.findOneByOrFail({email})
  if(!mail){
    throw new UnauthorizedException()
  }
  return mail;
}


async signIn(payload:LoginDto, @Req()req:Request, @Res()res:Response){
const {email, password}=payload
const user =await this.userRepo.findOneBy({email})

if(!user){
  throw new HttpException('no email found', 400)
}

const checkedpassword  = await this.verifypassword(user.password, password);
if(!checkedpassword){
  throw new HttpException('sorry password not exist', 400)
}

const token = await this.jwtservice.signAsync({
  email:user.email,
  id:user.id
});

res.cookie(`isAuthenticated`, token,{
  httpOnly:true,
  maxAge: 1 * 60 * 60 * 1000
});

// delete user.password
return res.send({
  success:true,
  userToken:token
})
}

async logout(@Req()req:Request, @Res()res:Response){
const clearCookie = res.clearCookie('isAuthenticated');

const response = res.send(`user successfully logged out`)

return{
  clearCookie,
  response
}
}


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifypassword(
    hashedpassword: string, 
    plainpassword: string,
  ): Promise<boolean>{
    try{
      return await argon2.verify(hashedpassword, plainpassword);
    }catch(err){
      return false;
    }
  }

  async user(header:any) :Promise<any>{
    const authorizationHeader = header.authorization;//it triesto extract the authorization
    //from the incoming request header. this header typically contains the tokn for authorization.

    if (authorizationHeader){
      const token = authorizationHeader.replace('Bearer ', '');
      const secret = process.env.JWTSCRET;
      //Checks if the authrization header exists. if not, it will skip to the else bloch and throw
      //an error.

      try{
        const decoded = this.jwtservice.verify(token);
        let id = decoded['id']; //after verifying the token, the function extracts the user's id 
        //fromthe decoded token payload
        let user= await this.userRepo.findOneBy({id});

        return { id:id, name:user.name, email:user.email, role:user.role };
      } catch (error){
        throw new UnauthorizedException('Invalid token');
      }
    }
    else{
        throw new UnauthorizedException('Invalid or missing Bearer token');
      }
  }
}

