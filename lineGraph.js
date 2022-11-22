d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: size,
            height: size / 3,
            margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    })

  console.log(dataset)

  var xAccessor = d => d.Year
  var yAccessor = d => d.Tracks

  var svg = d3.select("#vis1")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("class", "line-background")

  var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])

 var yScale = d3.scaleLinear()
        .domain([0,25])
        .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

var dots = svg.append("g")
          .selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", d => xScale(xAccessor(d)))
          .attr("cy", d => yScale(yAccessor(d)))
          .attr("r", 3)
          .attr("fill", "black")

  var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                      .call(xAxisGen)
                      .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)

                      
  var yAxisGen =  d3.axisLeft().scale(yScale)
  var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translateX(${dimensions.margin.left}px)`)

})
