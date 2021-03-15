import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {User} from "src/auth/user.entity";
@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    // @Column()
    // userId?:number | null ;

    @ManyToOne(type => User, user => user.tasks)
    user?: User;
}