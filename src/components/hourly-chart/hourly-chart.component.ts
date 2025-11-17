
import { Component, ChangeDetectionStrategy, input, effect, viewChild, ElementRef } from '@angular/core';
import { Device } from '../../models/device.model';

declare var d3: any;

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyChartComponent {
  device = input<Device | null>();
  chartContainer = viewChild<ElementRef>('chart');

  constructor() {
    effect(() => {
      const currentDevice = this.device();
      const container = this.chartContainer();
      if (currentDevice && container) {
        this.createChart(currentDevice.hourlyHistoryKWh);
      }
    });
  }

  private createChart(data: number[]): void {
    const element = this.chartContainer()!.nativeElement;
    d3.select(element).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: number) => d) * 1.2 || 0.1])
      .range([height, 0]);

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d: number) => (d % 6 === 0 ? `${d}:00` : '')).tickSize(0).tickPadding(10))
      .selectAll('text')
      .style('fill', '#94a3b8');
      
    svg.selectAll(".domain").remove();

    // Y Axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-width))
      .selectAll('text')
      .style('fill', '#94a3b8');

    svg.selectAll(".tick line").style("stroke", "#475569");
    svg.selectAll(".domain").remove();

    // Tooltip
    const tooltip = d3.select(element)
      .append("div")
      .style("opacity", 0)
      .attr("class", "absolute bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-md text-sm pointer-events-none")
      .style("transform", "translate(-50%, -100%)");

    // Bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => x(i))
      .attr('y', (d: number) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d: number) => height - y(d))
      .attr('fill', '#22d3ee')
      .attr('rx', 2)
      .on('mouseover', (event: any, d: number) => {
        d3.select(event.currentTarget).style('fill', '#67e8f9');
        tooltip.style('opacity', 1);
      })
      .on('mousemove', (event: any, d: number) => {
        const [xPos, yPos] = d3.pointer(event, element);
        tooltip
          .html(`${d.toFixed(3)} kWh`)
          .style('left', `${xPos}px`)
          .style('top', `${yPos - 10}px`);
      })
      .on('mouseout', (event: any, d: number) => {
        d3.select(event.currentTarget).style('fill', '#22d3ee');
        tooltip.style('opacity', 0);
      });
      
      svg.append('text')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height + 35)
        .style('fill', '#94a3b8')
        .style('font-size', '12px')
        .text('Hora del día');

      svg.append('text')
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -margin.top + 10)
        .style('fill', '#94a3b8')
        .style('font-size', '12px')
        .text('Consumo (kWh)');
  }
}
