<script lang="ts">

  export let streamflow: any;
  export let formattedData: any;

  const data = [
  {value: '22000', qualifiers: Array(1), dateTime: '2023-05-08T12:45:00.000-07:00'},
{value: '21400', qualifiers: Array(1), dateTime: '2023-05-08T13:00:00.000-07:00'},
{value: '21700', qualifiers: Array(1), dateTime: '2023-05-08T13:15:00.000-07:00'},
{value: '21800', qualifiers: Array(1), dateTime: '2023-05-08T13:30:00.000-07:00'},
{value: '21700', qualifiers: Array(1), dateTime: '2023-05-08T13:45:00.000-07:00'},
{value: '21400', qualifiers: Array(1), dateTime: '2023-05-08T14:00:00.000-07:00'},
{value: '20900', qualifiers: Array(1), dateTime: '2023-05-08T14:15:00.000-07:00'},
{value: '21200', qualifiers: Array(1), dateTime: '2023-05-08T14:30:00.000-07:00'},
{value: '21200', qualifiers: Array(1), dateTime: '2023-05-08T14:45:00.000-07:00'},
{value: '20900', qualifiers: Array(1), dateTime: '2023-05-08T15:00:00.000-07:00'},
{value: '20900', qualifiers: Array(1), dateTime: '2023-05-08T15:15:00.000-07:00'},
{value: '21000', qualifiers: Array(1), dateTime: '2023-05-08T15:30:00.000-07:00'},
{value: '20600', qualifiers: Array(1), dateTime: '2023-05-08T15:45:00.000-07:00'},
{value: '21000', qualifiers: Array(1), dateTime: '2023-05-08T16:00:00.000-07:00'},
{value: '20800', qualifiers: Array(1), dateTime: '2023-05-08T16:15:00.000-07:00'},
{value: '20800', qualifiers: Array(1), dateTime: '2023-05-08T16:30:00.000-07:00'},
{value: '20800', qualifiers: Array(1), dateTime: '2023-05-08T16:45:00.000-07:00'},
{value: '20600', qualifiers: Array(1), dateTime: '2023-05-08T17:00:00.000-07:00'},
{value: '20600', qualifiers: Array(1), dateTime: '2023-05-08T17:15:00.000-07:00'},
{value: '20400', qualifiers: Array(1), dateTime: '2023-05-08T17:30:00.000-07:00'},
]

const transformedData = data.map(item => ({
  x: new Date(item.dateTime).getFullYear(),
  y: parseFloat(item.value)
}));


  import { line, curveLinear, Delaunay, range, scaleLinear, scaleUtc, timeParse } from 'd3';
  
  const marginTop = 40; // the top margin, in pixels
  const marginRight = 0; // the right margin, in pixels
  const marginBottom = 30; // the bottom margin, in pixels
  const marginLeft = 50; // the left margin, in pixels
  const inset = 0; // inset the default range, in pixels
  const width = 600; // the outer width of the chart, in pixels
  const height = 350; // the outer height of the chart, in pixels
  const xLabel = ''; // a label for the y-axis
  const yLabel = '↑ Population (in millions)'; // a label for the y-axis
  const xFormat = ''; // a format specifier string for the y-axis
  const yFormat = 'm'; // a format specifier string for the y-axis
  const horizontalGrid = true; // show horizontal grid lines
  const verticalGrid = true; // show vertical grid lines
  const colors = ['#F50057','#42A5F5','#26A69A','#9575CD']; // fill color for dots && number of colors in fill array MUST match number of subsets in data
  const showDots = false; // whether dots should be displayed
  const dotsFilled = true; // whether dots should be filled or outlined
  const r = 5; // (fixed) radius of dots, in pixels
  const strokeWidth = 2; // stroke width of line, in pixels
  const strokeOpacity = 0.8; // stroke opacity of line
  const tooltipBackground = 'white'; // background color of tooltip
  const tooltipTextColor = 'black'; // text color of tooltip
  const strokeLinecap = 'round'; // stroke line cap of the line
  const strokeLinejoin = 'round'; // stroke line join of the line
  const xScalefactor = width / 80; //y-axis number of values
  const yScalefactor = height / 40; //y-axis number of values
  const curve = curveLinear; // method of interpolation between points
  const xType = scaleUtc; // type of x-scale
  const insetTop = inset; // inset from top
  const insetRight = inset; // inset from right
  const insetBottom = inset; // inset fro bottom
  const insetLeft = inset; // inset from left
  const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  const yType = scaleLinear; // type of y-scale
  const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]
  const parseDate = timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');

  let x, y, dotInfo, lines, xVals = [], yVals = [], points = [], subsets = [], colorVals = [];
  
  // For a single set of data
  if (!('data' in data[0])) {
    x = Object.keys(data[0])[2];
    y = Object.keys(data[0])[0];
    xVals = data.map((el) => parseDate(el[x]));
    // xVals = data.map((el) => el[x]);
    yVals = data.map((el) => el[y]);
    colorVals = data.map((el) => 0);
    points = data.map((el) => ({
      x: el[x],
      y: el[y],
      color: 0
    }));
  }
  // For data with subsets (NOTE: expects 'id' and 'data' keys)
  else {
    x = Object.keys(data[0]?.data[0])[2];
    y = Object.keys(data[0]?.data[0])[0];
    data.forEach((subset, i) => {
    subset.data.forEach((coordinate) => {
      xVals.push(coordinate[x]);
      yVals.push(coordinate[y]);
      colorVals.push(i);
      points.push(
        { 
          x: coordinate[x],
          y: coordinate[y],
          color: i
        });
    });
    subsets.push(subset.id);
  });
  }

  const I = range(xVals.length);
  const gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
  const cleanData = points.map(gaps);

  const xDomain = [xVals[0], xVals[xVals.length - 1]];
  const yDomain = [0, Math.max(...yVals)];
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const niceY = scaleLinear().domain([0, Math.max(...yVals)]).nice();

  const chartLine = line()
    .defined(i => cleanData[i])
    .curve(curve)
    .x(i => xScale(xVals[i]))
    .y(i => yScale(yVals[i]));

  $: {
    lines = [];
    colors.forEach((color, j) => {
      const filteredI = I.filter((el, i) => colorVals[i] === j);
      lines.push(chartLine(filteredI));
    });
  }

  const pointsScaled = points.map((el) => [xScale(el.x), yScale(el.y), el.color]);
  const delaunayGrid = Delaunay.from(pointsScaled);
  const voronoiGrid = delaunayGrid.voronoi([0, 0, width, height]);
  
  const  xTicks = xScale.ticks(xScalefactor);
  // const  xTicksFormatted = xTicks.map((el) => el.getFullYear());
  const xTicksFormatted = xTicks.map((el) => el.toISOString().slice(0, 10));
  const  yTicks = niceY.ticks(yScalefactor);

</script>

<div class="chart-container">
  <svg {width} {height} viewBox="0 0 {width} {height}"
    cursor='crosshair'
    on:mouseout="{() => dotInfo = null}"
    on:blur="{() => dotInfo = null}"
  >
    <!-- Dots (if enabled) -->
    {#if showDots && !dotInfo}
      {#each I as i}
        <g class='dot' pointer-events='none'>
          <circle
            cx={xScale(xVals[i])}
            cy={yScale(yVals[i])}
            r={r}
            stroke={colors[colorVals[i]]}
            fill={dotsFilled ? colors[colorVals[i]] : 'none'}
          />
        </g>
      {/each}
    {/if}
    <!-- Chart lines -->
    {#each lines as subsetLine, i}
    <g class='chartlines' pointer-events='none'>
      {#if dotInfo}
        <path class="line" fill='none' stroke-opacity={points[dotInfo[1]].color === i ? '1' : '0.1'} stroke={colors[i]} d={subsetLine} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin}/>
        <circle cx={xScale(points[dotInfo[1]].x)} cy={yScale(points[dotInfo[1]].y)} r={r} stroke={colors[points[dotInfo[1]].color]} fill={dotsFilled} />
      {:else}
        <path class="line" fill='none' stroke={colors[i]} d={subsetLine}
          stroke-opacity={strokeOpacity} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin} />
      {/if}
    </g>
    {/each}
    
    <!-- Y-axis and horizontal grid lines -->
    <g class="y-axis" transform="translate({marginLeft}, 0)" pointer-events='none'>
      <path class="domain" stroke="black" d="M{insetLeft}, {marginTop} V{height - marginBottom + 6}"/>
      {#each yTicks as tick, i}
        <g class="tick" transform="translate(0, {yScale(tick)})">
          <line class="tick-start" x1={insetLeft - 6} x2={insetLeft}/>
          {#if horizontalGrid}
            <line class="tick-grid" x1={insetLeft} x2={width - marginLeft - marginRight}/>
          {/if}
          <text  x="-{marginLeft}" y="5">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop - 10}>{yLabel}</text>
    </g>
    <!-- X-axis and vertical grid lines -->
    <g class="x-axis" transform="translate(0,{height - marginBottom - insetBottom})" pointer-events='none'>
      <path class="domain" stroke="black" d="M{marginLeft},0.5 H{width - marginRight}"/>
      {#each xTicks as tick, i}
        <g class="tick" transform="translate({xScale(tick)}, 0)">
          <line class="tick-start" stroke='black' y2='6' />
          {#if verticalGrid}
            <line class="tick-grid" y2={-height + 70} />
          {/if}
          <text font-size='8px' x={-marginLeft/4} y="20">{xTicksFormatted[i] + xFormat}</text>
        </g>
      {/each}
      <text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
    </g>

    {#each pointsScaled as point, i}
      <path
        stroke="none"
        fill-opacity="0"
        class="voronoi-cell"
        d={voronoiGrid.renderCell(i)}
        on:mouseover="{(e) => dotInfo = [point] }"
        on:focus="{(e) => dotInfo = [point] }"
      ></path>
    {/each}
  </svg>
</div>
<!-- Tooltip -->
{#if dotInfo}
  <div class="tooltip" style='position:absolute; left: 15px; top: 15px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {subsets ? subsets[points[dotInfo[1]].color] : ''}:  
    {#if typeof points[dotInfo[1]].x === 'string'}
      {new Date(points[dotInfo[1]].x).toLocaleString()}: {parseFloat(points[dotInfo[1]].y).toFixed(2)}{yFormat}
    {:else}
      {points[dotInfo[1]].x}: {points[dotInfo[1]].y.toFixed(2)}{yFormat}
    {/if}
  </div>
{/if}

<style>
  .chart-container {
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-left: 8
    0px;
  }
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
    margin: auto;
  }
  path {
    fill: "green"
  }
  .y-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }
  .x-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }
  .tick {
    opacity: 1;
  }
  .tick-start {
    stroke: black;
    stroke-opacity: 1;
  }
  .tick-grid {
    stroke: black;
    stroke-opacity: 0.2;
    font-size: "11px";
    color: black;
  }
  .tick text {
    fill: black;
    text-anchor: start;
  }

  .tooltip{
    border-radius: 5px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
</style>