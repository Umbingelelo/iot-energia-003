import { Component, ChangeDetectionStrategy, input, effect, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Device } from '../../models/device.model';

declare var d3: any;

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyChartComponent implements AfterViewInit, OnDestroy {
  device = input<Device | null>();
  chartContainer = viewChild.required<ElementRef>('chart');
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const currentDevice = this.device();
      if (currentDevice && this.chartContainer()) {
        this.createChart(currentDevice.hourlyHistoryKWh);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
        const currentDevice = this.device();
        if (currentDevice) {
            this.createChart(currentDevice.hourlyHistoryKWh);
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

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('gradientTransform', 'rotate(90)');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#67e8f9');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#22d3ee');

    const x = d3.scaleBand()
      .domain(d3.range(data.length).map(String))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data) * 1.2 || 0.1])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d: string, i: number) => (i % 6 === 0 ? `${i}:00` : '')).tickSize(0).tickPadding(10))
      .selectAll('text')
      .style('fill', '#94a3b8');
    svg.selectAll('.domain').remove();

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-width))
      .selectAll('text')
      .style('fill', '#94a3b8');
    svg.selectAll('.tick line').style('stroke', '#475569').style('stroke-dasharray', '2,2');
    svg.selectAll('.domain').remove();

    const tooltip = d3.select(element)
      .append("div")
      .style("opacity", 0)
      .attr("class", "absolute bg-slate-950 border border-slate-700 text-white px-3 py-1.5 rounded-md text-sm pointer-events-none shadow-lg")
      .style("transform", "translate(-50%, -110%)");

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: number, i: number) => x(String(i)))
      .attr('width', x.bandwidth())
      .attr('y', y(0))
      .attr('height', 0)
      .attr('fill', 'url(#bar-gradient)')
      .attr('rx', 3)
      .attr('ry', 3)
      .on('mouseover', function(event: any) {
        d3.select(this).style('fill', '#a5f3fc');
        tooltip.style('opacity', 1);
      })
      .on('mousemove', (event: any, d: number) => {
        const [xPos, yPos] = d3.pointer(event, element);
        tooltip
          .html(`<strong>${d.toFixed(3)} kWh</strong>`)
          .style('left', `${xPos}px`)
          .style('top', `${yPos}px`);
      })
      .on('mouseout', function() {
        d3.select(this).style('fill', 'url(#bar-gradient)');
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .delay((d: number, i: number) => i * 15)
      .attr('y', (d: number) => y(d))
      .attr('height', (d: number) => height - y(d));
      
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 38)
      .style('fill', '#94a3b8')
      .style('font-size', '12px')
      .text('Hora del día');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 12)
      .attr('x', -height / 2)
      .style('fill', '#94a3b8')
      .style('font-size', '12px')
      .text('Consumo (kWh)');
  }
}