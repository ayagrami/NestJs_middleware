
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('todo')
export class TodoEntity  {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    
    @Column()
    userId: number;
}