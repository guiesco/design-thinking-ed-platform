import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/common/interfaces/project.interface';

@Injectable()
export class ProjectService {
  api = 'http://localhost:3000'; //todo: add to env
  constructor(private readonly http: HttpClient) {}

  // create(createObject: ICreateProject): Observable<Project> {
  //   return this.http.post<Project>(this.api + '/project', createObject);
  // }

  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.api + '/project');
  }

  // find(findProjectDto: IFindProject) {
  //   return this.http.post<Project[]>(
  //     this.api + '/project/find',
  //     findProjectDto
  //   );
  // }

  delete(id: string) {
    return this.http.delete<Project>(this.api + '/project/' + id);
  }

  update(id: string, project: Partial<Project>) {
    return this.http.patch<Project>(this.api + '/project/' + id, project);
  }
}
