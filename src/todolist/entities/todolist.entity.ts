import { Base } from "src/user/Entity/base.entity"; 
import { User } from "src/user/Entity/user.entity";
import { Column,Entity, ManyToOne } from "typeorm";

@Entity()
export class Todolist extends Base{

    @Column()
    title:string;

    @Column()
    describtion:string;

    @ManyToOne(()=>User, (User) => User.todo)
    user:User[]
  userId: string;
  description: any;
}
