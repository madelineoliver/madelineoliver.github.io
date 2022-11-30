d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: 1400,
            height: 500,
            margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    })

    //array of objects grouped by year
    var year_map = d3.groups(dataset, d => d.Year)
    var data_map = d3.rollup(dataset, v => d3.mean(v, d => d.Tracks), d=>d.Year)



    //creating an array from the key value pairs
    let array_data = Array.from(data_map)

    console.log(array_data)

    //formatting the array
     var new_array = sorted_data.map(function(d) {
      return {

        Year: +d[0],
        Tracks: d[1]
      };
    });


    //sorting years ascending
    new_array.sort((a,b) => {
      return +a.Year - +b.Year;
    });

    //console.log(new_array)

    let usethis = Array.from(new_array)

  //console.log(usethis)


  var svg = d3.select("#vis1")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
      //  .append("g")
        .attr("class", "line-background")
        .attr("transform",
              "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

  var xScale = d3.scaleBand()
        .domain(d3.map(new_array, d => d.Year))
        .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])

  var yScale = d3.scaleLinear()
        .domain([0, 20])
        .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

  var dots = svg.append("g")
          .selectAll("circle")
          .data(new_array)
          .enter()
          .append("circle")
          .attr("cx", function (d){
            return xScale(d[1]);
          })
          .attr("cy", function (d){
            return xScale(d[0]);
          })
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
