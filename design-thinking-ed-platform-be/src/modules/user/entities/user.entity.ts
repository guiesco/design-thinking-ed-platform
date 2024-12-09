import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { GroupsEntity } from 'src/modules/groups/entities/group.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['student', 'professor'] })
  userType: string;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.professor)
  classes: ClassEntity[];

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.professor)
  groups: GroupsEntity;
}
