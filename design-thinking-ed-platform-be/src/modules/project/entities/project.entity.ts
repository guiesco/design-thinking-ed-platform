import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { GroupEntity } from '../../group/entities/group.entity';
import { EmpathyMap } from '../../empathy-map/entities/empathy-map.entity';
import { EmpathyMapResponse } from '../../empathy-map/entities/empathy-map-response.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GroupEntity, (group) => group.project)
  @JoinColumn()
  group: GroupEntity;

  @OneToMany(() => EmpathyMap, (empathyMap) => empathyMap.project)
  empathyMaps: EmpathyMap[];

  @OneToMany(() => EmpathyMapResponse, (response) => response.project)
  empathyMapResponses: EmpathyMapResponse[];
}
