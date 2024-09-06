import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/Entity/user.entity";
import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor (private userService:UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: {email}):Promise<User>{
        const {email} = payload;
        const user = await this.userService.findEmail(email);
        if(!user){
            throw new UnauthorizedException(`login first to access this`)
        }
        return user;
    }
    }