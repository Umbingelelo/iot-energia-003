import { Component, ChangeDetectionStrategy, input, effect, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

declare var d3: any;

@Component({
  selector: 'app-sparkline-chart',
  template: `<div #chart class="w-full h-12"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklineChartComponent implements AfterViewInit, OnDestroy {
  data = input.required<number[]>();
  chartContainer = viewChild.required<ElementRef>('chart');
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const chartData = this.data();
      if (chartData && this.chartContainer()) {
        this.createChart(chartData);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
        const chartData = this.data();
        if (chartData) {
            this.createChart(chartData);
        }
    });
    this.resizeObserver.observe(this.chartContainer().nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private createChart(data: number[]): void {
    const element = this.chartContainer().nativeElement;
    d3.select(element).selectAll('*').remove();
    
    if (!element.clientWidth) return;

    const margin = { top: 2, right: 2, bottom: 2, left: 2 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 48 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data), d3.max(data) || 1])
      .range([height, 0]);
      
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'sparkline-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#22d3ee')
      .attr('stop-opacity', 0.4);
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#22d3ee')
      .attr('stop-opacity', 0);

    const area = d3.area()
      .x((d: any, i: number) => x(i))
      .y0(height)
      .y1((d: any) => y(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#sparkline-gradient)')
      .attr('d', area);

    const line = d3.line()
      .x((d: any, i: number) => x(i))
      .y((d: any) => y(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#22d3ee')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}
