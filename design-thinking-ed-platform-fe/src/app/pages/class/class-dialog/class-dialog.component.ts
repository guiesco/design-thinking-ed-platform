import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { IClass } from 'src/app/common/interfaces/class.interface';
import { IGroup } from 'src/app/common/interfaces/group.interface';
import { __values } from 'tslib';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IClass,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  parseProjectStep(projectStep: any) {
    return ProjectSteps[projectStep];
  }

  parseGroupName(groups: any) {
    return groups.map((gp: IGroup) => gp.groupName)
  }

}
