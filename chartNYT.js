// Chart dimensions

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

// Notable states = Hawaii and states with highest number of cases
// Each state's value will be populated with date of first case, today's date, and population
const notableStates = {
    "New York": {population: ''},
    "New Jersey": {population: ''},
    "California": {population: ''},
    "Michigan": {population: ''},
    "Massachusetts": {population: ''},
    "Florida": {population: ''},
    "Washington": {population: ''},
    "Illinois": {population: ''},
    "Louisiana": {population: ''},
    "Pennsylvania": {population: ''},
    "Hawaii": {population: ''}
};

const lineColors = [
    '#e57373',
    '#ba68c8',
    '#5ddef4',
    '#9575cd',
    '#fffd61',
    '#ff7043',
    '#81c784',
    '#f06292',
    '#8e99f3',
    '#be9c91',
    '#a7c0cd'
];

const getStatePopulation = () => {
    d3.csv('./SCPRC-EST2019-18+POP-RES.csv') // CSV from https://www2.census.gov/programs-surveys/popest/datasets/2010-2019/state/detail/
        .then(data => {
            Object.keys(notableStates).forEach(state => {
                notableStates[state].population = parseInt(data.filter(d => d.NAME === state)[0].POPESTIMATE2019);
            });
        })
};

const getData = () => {
    // Get data
    d3.csv('./us-states.csv')
        .then(data => {
            
            // Clean data: 
                // 1. Change date to date value
                // 2. Change fips, cases, deaths to integer values
            const dateParser = d3.timeParse('%Y-%m-%d');
            const dateFormatter = d3.timeFormat('%m-%d-%y')

            data.forEach(d => {
                d.date = dateParser(d.date);
                d.fips = parseInt(d.fips);
                d.cases = parseInt(d.cases);
                d.deaths = parseInt(d.deaths);
            });

            // Filter only notable states
            // Prior to 02-27-20, Washington had 1 or 2 cases from January. 
            // However, these were isolated cases and this graph is trying to track Covid-19 spread 
            data = data.filter((d) => Object.keys(notableStates).includes(d.state) && d.date > new Date("02-26-2020"));

            // Normalize data: 
                // 1. Add "dayOfOutbreak" to show elapsed time
                // 2. Add state population
                // 3. Add "casesPerThousand" and "deathsPerThousand"
            
            // First case date for each state
            Object.keys(notableStates).forEach(state => {
                const stateData = data.filter(d => d.state === state)
                stateData.forEach(d => {
                    d.dayOfOutbreak = (d.date - stateData[0].date) / (24*60*60*10*10*10) + 1; // day - day one, convert ms to days
                    d.casesPerThousand = d.cases / notableStates[state].population * 1000;
                    d.deathsPerThousand = d.deaths / notableStates[state].population * 1000;
                })
            });

            // Canvas
            const svg = d3.select("#wrapper-nyt")
                .append('svg')
                    .attr('width', width)
                    .attr('height', height);
    
            const bounds = svg.append('g')
                .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

            // overlay and bisector for tooltip (later)
            const bisectDate = d3.bisector(d => d.dayOfOutbreak).left;

            const focus = bounds.append('g')
                .attr('class', 'focus')
                .style('display', 'none');

            bounds.append('rect')
                .attr('class', 'overlay')
                .attr('width', boundedWidth)
                .attr('height', boundedHeight)
                .on('mouseover', () => focus.style('display', null))
                .on('mouseout', () => focus.style('display', 'none'))
                .on('mousemove', mousemove);

            // Scales
            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, (d) => d.dayOfOutbreak))
                .range([0, boundedWidth]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.casesPerThousand))
                .range([boundedHeight, 0]);

            // Graph
            Object.keys(notableStates).sort().forEach((state, i) => {
                const stateData = data.filter(d => d.state === state);
                const stateHTML = state.toLowerCase().replace(" ", "-");

                // lines
                const lineGenerator = d3.line()
                    .x(d => xScale(d.dayOfOutbreak))
                    .y(d => yScale(d.casesPerThousand))

                bounds.append('path')
                    .attr('id', `line-${stateHTML}`)
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke-linejoin', 'round')
                    .attr('stroke-linecap', 'round')
                    .attr('d', lineGenerator(stateData))
                    .attr('stroke', `${lineColors[i]}`)

                // line labels
                const lastDayOfOutbreak = stateData[stateData.length - 1].dayOfOutbreak;
                const lastCasesPerThousand = stateData[stateData.length - 1].casesPerThousand

                bounds.append('text')
                    .attr('id', `line-label-${stateHTML}`)
                    .attr('x', () => xScale(lastDayOfOutbreak) + 3)
                    .attr('y', d => yScale(lastCasesPerThousand))    
                    .text(state)
                    .attr('fill', '#f2ffcc')
                    .attr('font-size', 11)

                // legend
                bounds.append('text')
                    .attr('class', 'legend')
                    .attr('id', `legend-${stateHTML}`)
                    .attr('x', 20)
                    .attr('y', 10 + i * 50)
                    .style('fill', () => lineColors[i])
                    .style('font-size', 14)
                    .on('click', () => {
                        let active = stateData.active ? false : true,
                            lineOpacity = active ? 0 : 1,
                            legendOpacity = active ? .3 : 1;

                        d3.selectAll(`#line-label-${stateHTML}, #line-${stateHTML}`)
                            .transition().duration(100)
                            .style('opacity', lineOpacity);
                        d3.select(`#circle-${stateHTML}`)
                            .transition().duration(100)
                            .style('opacity', lineOpacity);
                        d3.select(`#legend-${stateHTML}`)
                            .transition().duration(100)
                            .style('opacity', legendOpacity);
                        d3.select(`#d-label-${stateHTML}`)
                            .transition().duration(100)
                            .style('opacity', legendOpacity);
                        d3.select(`#d-label-b-${stateHTML}`)
                            .transition().duration(100)
                            .style('opacity', legendOpacity);
                        stateData.active = active;
                    })
                    .text(state);
                
                // for mousemove
                focus.append('circle')
                    .attr('r', 5)
                    .attr('fill', 'none')
                    .attr('stroke', 'white')
                    .attr('id', `circle-${stateHTML}`);

                focus.append('text')
                    .attr('id', `d-label-${stateHTML}`)
                    .attr('x', 20)
                    .attr('y', 25 + i * 50)
                    .style('font-size', 12);

                focus.append('text')
                    .attr('id', `d-label-b-${stateHTML}`)
                    .attr('x', 20)
                    .attr('y', 40 + i * 50)
                    .style('font-size', 12);
            });

            // tooltip markers
            function mousemove() {
                let x0 = xScale.invert(d3.mouse(this)[0]);

                Object.keys(notableStates).sort().forEach((state, index) => {
                    const stateData = data.filter(d => d.state === state);
                    const stateHTML = state.toLowerCase().replace(" ", "-");
                    const i = bisectDate(stateData, x0, 0)
                    let stateDataRangeY = stateData[i] 
                        ? stateData[i].casesPerThousand 
                        : stateData[stateData.length - 1].casesPerThousand;
                    let stateDataRangeX = stateData[i] 
                        ? stateData[i].dayOfOutbreak 
                        : stateData[stateData.length - 1].dayOfOutbreak;
                    let stateDataRangeDate = stateData[i] 
                        ? dateFormatter(stateData[i].date) 
                        : dateFormatter(stateData[stateData.length - 1].date);
                    let stateDataRangeCases = stateData[i] 
                        ? stateData[i].cases 
                        : stateData[stateData.length - 1].cases;

                    focus.select(`#circle-${stateHTML}`)
                        .attr('fill', lineColors[index])
                        .attr('cy', yScale(stateDataRangeY))
                        .attr('cx', xScale(stateDataRangeX))

                    focus.select(`#d-label-${stateHTML}`)
                        .text(`Cases: ${stateDataRangeCases} -> Per 1000: ${stateDataRangeY.toFixed(3)}`)
                        .attr('fill', lineColors[index])

                    focus.select(`#d-label-b-${stateHTML}`)
                        .text(`${stateDataRangeDate} -> Day: ${stateDataRangeX}`)
                        .attr('fill', lineColors[index])
                })
            };

            // Axes
            const yAxisGenerator = d3.axisLeft()
                .scale(yScale)
    
            const yAxis = bounds.append("g")
                .call(yAxisGenerator)
                .attr('id', 'y-axis');
        
            const xAxisGenerator = d3.axisBottom()
                .scale(xScale)
        
            const xAxis = bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${boundedHeight}px)`)
                .attr('id', 'x-axis')

            // Titles, footnotes, axes labels
            svg.append('text')
                .attr('class', 'title')
                .attr('text-anchor', 'middle')
                .attr("transform", () => {
                    let xText = margin.left + boundedWidth / 2;
                    let yText = margin.top / 2;
                    return `translate (${xText}, ${yText})`;
                    })
                .text('COVID-19 US State Comparison')

            svg.append('text')
                .attr("class", "axes-label")
                .attr('text-anchor', 'middle')
                .attr("transform", () => {
                    let xText = margin.left / 2;
                    let yText = boundedHeight / 2;
                    return `translate (${xText}, ${yText}) rotate(-90)`;
                    })
                .text('Cases per 1000 people');

            svg.append('text')
                .attr("class", "axes-label")
                .attr('text-anchor', 'middle')
                .attr("transform", () => {
                    let xText = margin.left + boundedWidth / 2;
                    let yText = boundedHeight + margin.top + margin.bottom / 2;
                    return `translate (${xText}, ${yText})`;
                    })
                .text('Day of outbreak');

            bounds.append('text')
                .attr('class', 'notes')
                .attr('id', 'legend-notes')
                .attr('x', 20)
                .attr('y', boundedHeight - 20)
                .attr('font-size', 12)
                .text('*Click state name to hide');

            svg.append('text')
                .attr('class', 'notes')
                .attr('id', 'source-notes-nyt')
                .attr('x', margin.left)
                .attr('y', height - 20)
                .attr('font-size', 10)
                .html('*Data from The New York Times, based on reports from state and local health agencies.');

            svg.append('text')
                .attr('class', 'notes')
                .attr('id', 'source-notes-nyt')
                .attr('x', margin.left)
                .attr('y', height - 5)
                .attr('font-size', 10)
                .html('*Population data from US Census Bureau (2019).');
        })
        .catch(err => console.log(err));
}
getStatePopulation();
getData();