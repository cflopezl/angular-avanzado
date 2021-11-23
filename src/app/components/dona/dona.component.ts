import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  
  
  
  @Input() titulo: string = "Sin Titulo";
  @Input() labels: string[] = ['Etiqueta 1', 'Etiqueta 2']
  @Input() data: MultiDataSet = [     [350, 450],      ];
  
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: [ '#6857E6','#009FEE','#F02059']}
  ]
  
  ngOnInit(): void { 
    this.doughnutChartData = this.data;
    this.doughnutChartLabels = this.labels;
  }
  
}
