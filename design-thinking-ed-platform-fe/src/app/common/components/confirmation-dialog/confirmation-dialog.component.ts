import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseTypeLabel as EmpathyMapResponseTypeLabel } from '../../interfaces/empathy-map.interface';
import { ResponseTypeLabel as ChallengeResponseTypeLabel } from '../../interfaces/challenge-definition-response.interface';
import { ProblemDefinitionQuadrantLabel } from '../../enum/problem-definition-quadrant.enum';

export interface DialogData {
  title: string;
  message: string;
  entity: any;
  fieldTranslations?: Record<string, string>;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  keyLabelsMap: Record<string, string> = {};

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildKeyLabelsMap();
  }

  buildKeyLabelsMap(): void {
    if (!this.data.entity) return;

    // Mesclar todos os mapas de tradução em um único objeto
    this.keyLabelsMap = {
      ...this.getEnumLabels(ChallengeResponseTypeLabel),
      ...this.getEnumLabels(EmpathyMapResponseTypeLabel),
      ...this.getEnumLabels(ProblemDefinitionQuadrantLabel),
      ...this.data.fieldTranslations,
    };
  }

  private getEnumLabels(enumObj: any): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key of Object.keys(enumObj)) {
      result[key] = enumObj[key];
    }
    return result;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
