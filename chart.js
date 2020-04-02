const drawBarPlot = async () => {
    // 1. Access data
    const data = await d3.json('./data.json');
    const dateParser = d3.timeParse('%m-%d-%y');

    const yAccessor = d => d.total;
    const xAccessor = d => dateParser(d.date);
    
    //for tooltip
    const bisectDate = d3.bisector(xAccessor).left;

    // Dimensions
    const width = window.innerWidth * .9;
    const height = 800;
    const margin = {
        top: 50,
        right: 80,
        bottom: 80,
        left: 80
    };

    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

    // Canvas
    const svg = d3.select("#wrapper")
        .append('svg')
            .attr('width', width)
            .attr('height', height);

    const bounds = svg.append('g')
        .style('transform', `translate(${margin.left}px, ${margin.top}px)`);
    
    // Axes labels
    svg.append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr("transform", () => {
            let xText = margin.left + boundedWidth / 2;
            let yText = margin.top / 2;
            return `translate (${xText}, ${yText})`;
            })
        .text('COVID-19 Hawaii Cases')

    svg.append('text')
        .attr("class", "axes-label")
        .attr('text-anchor', 'middle')
        .attr("transform", (d,i) => {
          let xText = margin.left * .3;
          let yText = boundedHeight / 2;
          return `translate (${xText}, ${yText}) rotate(-90)`;
        })
        .text('Total number of cases');

    svg.append('text')
        .attr('class', 'notes')
        .attr('id', 'source-notes-nyt')
        .attr('x', margin.left)
        .attr('y', height - 5)
        .attr('font-size', 10)
        .html('*Data from Hawaii State Department of Health.')

    // Scales
    const today = new Date();

    const xScale = d3.scaleTime()
        .domain([d3.min(data, d => dateParser(d.date)), d3.max(data, d => dateParser(d.date))])
        .range([0, boundedWidth]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.total), d3.max(data, d => d.total) * 1.05])
        .range([boundedHeight, 0]);

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)

    const yAxis = bounds.append("g")
        .call(yAxisGenerator)
        .attr('id', 'y-axis');

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat("%m/%d"))

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${boundedHeight}px)`)
        .attr('id', 'x-axis')
        .selectAll('text')
            .style('text-anchor', 'end')
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr('transform', 'rotate(-65)');

    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))

    bounds.append('path')
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator(data))
        .attr('id', 'line-total')

    //Tooltip code
    const focus = bounds.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    focus.append('line')
        .attr('class', 'x-hover-line hover-line')
        .attr('y1', 0)
        .attr('y2', boundedHeight)
        .attr('stroke', '#f2ffcc')
        .style('stroke-dasharray', (3,3));

    focus.append('line')
        .attr('class', 'y-hover-line hover-line')
        .attr('x1', 0)
        .attr('x2', boundedWidth)
        .attr('stroke', '#f2ffcc')
        .style('stroke-dasharray', (3,3));

    focus.append('circle')
        .attr('r', 7.5)
        .attr('fill', 'none')
        .style('stroke', '#f2ffcc');

    focus.append('text')
        .attr('x', 15)
        .attr('dy', '.31em')
        .style('stroke', '#f2ffcc');

    bounds.append('rect')
        .attr('class', 'overlay')
        .attr('width', boundedWidth)
        .attr('height', boundedHeight)
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => focus.style('display', 'none'))
        .on('mousemove', mousemove);

    function mousemove() {
        const x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr('transform', `translate(${xScale(xAccessor(d))}, ${yScale(d.total)})`);
        focus.select('text').text(d.total);
        focus.select('.x-hover-line').attr('y2', boundedHeight - yScale(d.total));
        focus.select('.y-hover-line').attr('x2', -xScale(xAccessor(d)));
    };
};

drawBarPlot();