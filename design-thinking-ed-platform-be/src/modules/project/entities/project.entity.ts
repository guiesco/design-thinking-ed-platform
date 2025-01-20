import { GroupEntity } from 'src/modules/group/entities/group.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GroupEntity, (group) => group.project)
  @JoinColumn()
  group: GroupEntity;
}
