import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as d3 from "d3";
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() public data: { value: number, date: string }[];

  private width = 700;
  private height = 700;
  private margin = 50;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;

  constructor(public chartElem: ElementRef) { }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data) {
      console.log(this.data)
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }

  ngOnInit(): void {
    // this.loadLineChart();
  }


  public lineChartData: ChartDataSets[] = [
    { data: [20.00, -10.00, 21.00, 30.00], label: 'Temperature' }, // 81, 56, 55, 40
  ];
  public lineChartLabels: Label[] = ['Dec 28 2020 12:00', 'Dec 29 2020 01:00', 'Dec 29 2020 04:30' , 'Dec 29 2020 05:30']; // 'April', 'May', 'June', 'July'

  // (ChartOptions & { annotation: any }) 
  public lineChartOptions: any = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'orange',
      backgroundColor: 'transparent', // rgba(255,0,0,0.3)
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  

  private initializeChart(): void {
  this.svg = d3
    .select(this.chartElem.nativeElement)
    .select('.linechart')
    .append('svg')
    .attr('height', this.height);
  this.svgInner = this.svg
    .append('g')
    .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

  this.yScale = d3
    .scaleLinear()
    .domain([d3.max(this.data, d => d.value) + 1, d3.min(this.data, d => d.value) - 1])
    .range([0, this.height - 2 * this.margin]);

  this.yAxis = this.svgInner
    .append('g')
    .attr('id', 'y-axis')
    .style('transform', 'translate(' + this.margin + 'px,  0)');

  this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.date)));

  this.xAxis = this.svgInner
    .append('g')
    .attr('id', 'x-axis')
    .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

  this.lineGroup = this.svgInner
    .append('g')
    .append('path')
    .attr('id', 'line')
    .style('fill', 'none')
    .style('stroke', 'orange')
    .style('stroke-width', '2px')
}

  private drawChart(): void {
  this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
  this.svg.attr('width', this.width);

  this.xScale.range([this.margin, this.width - 2 * this.margin]);

  const xAxis = d3
    .axisBottom(this.xScale)
    .ticks(10)
    .tickFormat(d3.timeFormat('%m / %Y'));

  this.xAxis.call(xAxis);

  const yAxis = d3
    .axisLeft(this.yScale);

  this.yAxis.call(yAxis);

  const line = d3
    .line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveMonotoneX);

  const points: [number, number][] = this.data.map(d => [
    this.xScale(new Date(d.date)),
    this.yScale(d.value),
  ]);

  this.lineGroup.attr('d', line(points));
}

}
