import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, viewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var d3: any;

interface ChartData {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-analytics-chart',
  standalone: true,
  templateUrl: './analytics-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsChartComponent implements AfterViewInit {
  chartContainer = viewChild<ElementRef>('chartContainer');
  private platformId = inject(PLATFORM_ID);
  
  private data: ChartData[] = [
    { date: new Date('2025-01-01'), value: 65 },
    { date: new Date('2025-02-01'), value: 68 },
    { date: new Date('2025-03-01'), value: 72 },
    { date: new Date('2025-04-01'), value: 71 },
    { date: new Date('2025-05-01'), value: 75 },
    { date: new Date('2025-06-01'), value: 78 },
    { date: new Date('2025-07-01'), value: 82 },
    { date: new Date('2025-08-01'), value: 85 },
    { date: new Date('2025-09-01'), value: 88 },
    { date: new Date('2025-10-01'), value: 87 },
    { date: new Date('2025-11-01'), value: 91 },
    { date: new Date('2025-12-01'), value: 95 },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.chartContainer()) {
      this.createChart();
    }
  }

  private createChart(): void {
    const element = this.chartContainer()!.nativeElement;
    const margin = { top: 20, right: 40, bottom: 50, left: 50 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(this.data, (d: ChartData) => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([60, 100]) // Model accuracy percentage
      .range([height, 0]);

    // Gradient
    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "0%");
    linearGradient.append("stop").attr("offset", "0%").attr("stop-color", "#38bdf8"); // sky-400
    linearGradient.append("stop").attr("offset", "100%").attr("stop-color", "#818cf8"); // indigo-400

    // Line
    const line = d3.line()
      .x((d: ChartData) => x(d.date))
      .y((d: ChartData) => y(d.value))
      .curve(d3.curveMonotoneX);

    const path = svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate line
    const totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeSin)
        .attr("stroke-dashoffset", 0);

    // Axes
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat("%b %Y")));
      
    const yAxis = svg.append('g')
      .call(d3.axisLeft(y).tickFormat((d: any) => d + '%'));

    // Style Axes
    [xAxis, yAxis].forEach(axis => {
        axis.selectAll('path').style('stroke', '#4b5563'); // gray-600
        axis.selectAll('line').style('stroke', '#4b5563');
        axis.selectAll('text').style('fill', '#9ca3af').style('font-size', '12px'); // gray-400
    });

    // Tooltip
    const tooltip = d3.select(element).append('div')
        .style('position', 'absolute')
        .style('background', '#1f2937') // gray-800
        .style('border', '1px solid #4b5563') // gray-600
        .style('border-radius', '8px')
        .style('padding', '8px 12px')
        .style('color', 'white')
        .style('opacity', 0)
        .style('pointer-events', 'none')
        .style('transition', 'opacity 0.2s');

    const focusLine = svg.append('line')
        .attr('stroke', '#4b5563')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3')
        .style('opacity', 0);
        
    const focusCircle = svg.append('circle')
        .attr('r', 5)
        .attr('fill', '#38bdf8')
        .style('opacity', 0);

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mouseover', () => {
            tooltip.style('opacity', 1);
            focusLine.style('opacity', 1);
            focusCircle.style('opacity', 1);
        })
        .on('mouseout', () => {
            tooltip.style('opacity', 0);
            focusLine.style('opacity', 0);
            focusCircle.style('opacity', 0);
        })
        .on('mousemove', (event: any) => {
            const [mx] = d3.pointer(event);
            const date = x.invert(mx);
            const bisector = d3.bisector((d: ChartData) => d.date).left;
            const i = bisector(this.data, date, 1);
            const d0 = this.data[i - 1];
            const d1 = this.data[i];
            const d = date.getTime() - d0.date.getTime() > d1.date.getTime() - date.getTime() ? d1 : d0;
            
            focusLine.attr('x1', x(d.date)).attr('x2', x(d.date)).attr('y1', 0).attr('y2', height);
            focusCircle.attr('cx', x(d.date)).attr('cy', y(d.value));

            tooltip
                .html(`<strong>${d3.timeFormat("%b %d, %Y")(d.date)}</strong><br>Accuracy: ${d.value}%`)
                .style('left', `${x(d.date) + 60}px`)
                .style('top', `${y(d.value)}px`);
        });
  }
}