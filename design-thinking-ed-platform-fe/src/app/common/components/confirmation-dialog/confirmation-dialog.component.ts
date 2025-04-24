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

export interface EntityField {
  key: string;
  label: string;
  value: any;
  type: 'simple' | 'array' | 'object';
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  entityFields: EntityField[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.processEntityFields();
  }

  processEntityFields(): void {
    if (!this.data.entity) return;

    this.entityFields = Object.entries(this.data.entity)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        // Tentar traduzir o campo
        const label = this.getTranslatedLabel(key);
        const type = this.getValueType(value);

        return {
          key,
          label,
          value: value,
          type: type,
        };
      });
  }

  getTranslatedLabel(key: string): string {
    if (Object.keys(ChallengeResponseTypeLabel).includes(key)) {
      return ChallengeResponseTypeLabel[
        key as keyof typeof ChallengeResponseTypeLabel
      ];
    }

    // 2. Verificar no enum ResponseTypeLabel
    if (Object.keys(EmpathyMapResponseTypeLabel).includes(key)) {
      return EmpathyMapResponseTypeLabel[
        key as keyof typeof EmpathyMapResponseTypeLabel
      ];
    }

    // 3. Verificar no enum ProblemDefinitionQuadrantLabel
    if (Object.keys(ProblemDefinitionQuadrantLabel).includes(key)) {
      return ProblemDefinitionQuadrantLabel[
        key as keyof typeof ProblemDefinitionQuadrantLabel
      ];
    }

    // 4. Fallback: transformar camelCase para formato legível
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  getValueType(value: any): 'simple' | 'array' | 'object' {
    if (value === null || value === undefined) {
      return 'simple';
    }

    if (Array.isArray(value)) {
      return 'array';
    }

    if (typeof value === 'object' && !(value instanceof Date)) {
      return 'object';
    }

    return 'simple';
  }

  formatValue(value: any): any {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'object' && value !== null) {
      if (value instanceof Date) {
        return value.toLocaleDateString('pt-BR');
      }

      if (!Array.isArray(value)) {
        return '[Objeto]';
      }
    }

    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Não';
    }

    return value;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  getFormattedEntity(): string {
    return JSON.stringify(this.data.entity, null, 2);
  }
}
