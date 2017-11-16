// var data = [12, 18, 24, 30, 36, 42, 48, 100];]

d3.csv("products.csv",function(data){

  data.forEach(function(d){

    d.value1 = +d.value1;

  });

//console.log(d3.max(data,function(d){return d.value1;}));
console.log(data);


// Once we have data, we now need to define variables used by D3
// Examples include chart dimensions, scales, and anything else that can be defined now and accessed later

// We will start with chart dimensions
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 100},
    width = 960 - margin.right,
    height = 500 - margin.top - margin.bottom;

// Then we can define the scale of the chart
// Domain takes your data interval and interpolates it fractionally to whatever you want the output range to be
// We use domain and range to essentially ensure that our data maps well to however we defined the svg (eg L x W)
// Pro tip: double check that scale funtions match D3 v4 convention as the namespace changed from v3-->v4
// Here we will use our max data point and map it to 

var yScale = d3.scaleLinear()
        .domain([0, d3.max(data,function(d){return d.value1;})])
        .range([height, 0]);
// Use range function and length of data set to pass a domain
var xScale = d3.scaleBand().domain(data.map(function(d){ return d.month; }))
        .rangeRound([0,width])
        .paddingInner(0.05);

// Define the axes as well
// The x & y axes.
var xAxis = d3.axisBottom(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.axisLeft(yScale);

// After we've defined all of our variables to be used later, we can start to paint
// In order to paint, we need an svg canvas
// We will assume that we have a single div located in our html with id="chart"
// Create the SVG container and set the origin allowing space for our margins (we'll put labels in this space later)
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    // .call invokes the specified function exactly once (aka DRY -- handy shortcut to reuse code)
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    // .call invokes the specified function exactly once (aka DRY -- handy shortcut to reuse code)
    .call(yAxis);

// Attach the data, draw rectangles, pass x, y, width, height
/*
svg.selectAll("bar")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", function(d,i) { return xScale(i); })
   .attr("y", function(d){return yScale(d); })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d){ return height - yScale(d); })
   .transition()
   .duration(1000)
   .attr("y", 0)
   .attr("height", height)
   .transition()
   .delay(function(d, i) { return i * 100; })
   .attr("y", function(d){return yScale(d); })
   .attr("height", function(d){ return height - yScale(d); })
   .style("fill","orange"); // Style changes are also supported -- notice that CSS attributes are not camelCase
*/

/*

 function endall(transition, callback) { 
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) { callback() }
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
  } 

  */

   svg.selectAll("bar")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", function(d,i) { return xScale(d.month); })
   .attr("width", xScale.bandwidth())
   .attr("y", height)
   .transition()
   .delay(function(d, i) { return i * 300; })
   .duration(500)
   .attr("y", function(d){return yScale(d.value1); })
   .attr("height", function(d, i){ return height - yScale(d.value1); })
   // .call(endall(),function(){alert("works");});




});