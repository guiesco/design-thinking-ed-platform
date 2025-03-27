import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ICreateGroup } from 'src/app/common/interfaces/group.interface';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupDialogComponent implements OnInit {
  classId!: string;
  userId!: number;
  createForm = this.fb.nonNullable.group({
    groupName: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    readonly fb: FormBuilder,
    readonly groupFacade: GroupFacade,
    readonly userFacade: UserFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.classId = user.studentClass.id;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  create() {
    const createPayload = this.createForm.getRawValue();
    const createDto: ICreateGroup = {
      ...createPayload,
      class: {
        id: this.classId,
      },
      students: [{ id: this.userId }],
    };
    this.groupFacade.create(createDto);
    this.onClose();
  }
}
