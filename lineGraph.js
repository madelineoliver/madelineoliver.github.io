d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: 700,
            height: 240,
            margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    })

    //array of objects grouped by year
    var year_map = d3.groups(dataset, d => +d.Year)
    var avg_map = d3.rollup(dataset, v => d3.mean(v, d => +d.Tracks), d=>+d.Year)

    console.log(avg_map)


    //creating array
    let avg_array = Array.from(avg_map)

    console.log(avg_array)

    //sorting years ascending
    sorted_array = avg_array.sort((a,b) => d3.ascending(a[0], b[0]))

    console.log(sorted_array)


  var svg = d3.select("#vis1")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("class", "line-background")
        .attr("transform",
              "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

  var xScale = d3.scaleBand()
        .domain(d3.map(sorted_array, d => d[0]))
        .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])
        .padding([1])

  var yScale = d3.scaleLinear()
        .domain([10, d3.max(sorted_array, d => d[1])])
        //.domain(d3.extent(sorted_array, d => d[1]))
        .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
 //graph labels
  svg.append("text")
      .attr("transform", "translate(" + (dimensions.width/2) + " ," + (dimensions.height-5) + ")")
      .style("text-anchor", "middle")
      .text("Year");

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(dimensions.height/2))
      .attr("y",15)
      .style("text-anchor", "middle")
      .text("Avg. # of Tracks (per Year)");



  svg.append("path")
          .datum(avg_array)
          .attr("fill", "none")
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 4)
          .attr("d", d3.line()
              .x(function(d) {return xScale(d[0]) })
              .y(function (d) { return yScale(d[1])})
          )



  //adding scatterplot
  var dots = svg.append("g")
          .selectAll("circle")
          .data(sorted_array)
          .enter()
          .append("circle")
          .attr("cx", d => xScale(d[0]))
          .attr("cy", d => yScale( d[1]))
          .attr("r", 5)
          .attr("fill", "black")
          .on('mouseover', function(){
            d3.select(this)
              .duration('100')
              .attr("r", 6);
          })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
              .duration('200')
              .attr("r", 5);
        });



  var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                      .call(xAxisGen)
                      .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                      .selectAll("text")
                      .style("text-anchor", "end")
                      .attr("dx", "-.8em")
                      .attr("dy", ".15em")
                      .attr("transform", "rotate(-65)" );


  var yAxisGen =  d3.axisLeft().scale(yScale)
  var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translateX(${dimensions.margin.left}px)`)
})
