import { CanActivate, ExecutionContext, ForbiddenException, forwardRef, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenRoleException } from "src/exception/role.exception";
import { UserService } from "src/user/user.service";

//SetMetadata helps set rows to users and admin

@Injectable()
export class RolesGuard implements CanActivate{
    constructor (private reflector:Reflector, private userService:UserService){}
    // a service that allowaccess to metadata attached to route handerler (such asthe role allow
    // access a route).

    async canActivate(context:ExecutionContext):Promise<boolean>{
        const roles = this.reflector.get<string[]>('roles', context.getHandler()); //the roles 
        // variable retieves the roles metadata attached to the handler (the function that will handleRetry
        //     the request).
            //console.log('role',roles);


        const request = context.switchToHttp().getRequest();

        if (request?.user){
            const headers:Headers=request.header;
            let user =this.userService.user(headers);

            if(!roles.includes((await user).role)){
                throw new ForbiddenRoleException(roles.join(' or '));
            }
            return true;
        }
        return false;
    }
}
