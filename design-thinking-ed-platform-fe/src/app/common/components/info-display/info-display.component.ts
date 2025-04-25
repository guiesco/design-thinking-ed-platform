import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface KeyValuePair {
  key: string;
  value: any;
  isArray: boolean;
}

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.scss'],
})
export class InfoDisplayComponent implements OnChanges {
  @Input() dataObject: any;
  @Input() title: string = '';
  @Input() keyLabels: Record<string, string> = {};

  displayData: KeyValuePair[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataObject'] && this.dataObject) {
      this.processData();
    }
  }

  private processData() {
    this.displayData = [];
    for (const key in this.dataObject) {
      if (this.dataObject.hasOwnProperty(key)) {
        const value = this.dataObject[key];
        const isArray = Array.isArray(value);
        this.displayData.push({
          key,
          value,
          isArray,
        });
      }
    }
  }

  getDisplayKey(key: string): string {
    return this.keyLabels[key] || this.formatKey(key);
  }

  private formatKey(key: string): string {
    // Transforma camelCase em palavras separadas e capitaliza a primeira letra
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
