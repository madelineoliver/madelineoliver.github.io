d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: size,
            height: size/3,
            margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    })

  console.log(dataset)

  var xAccessor = d => d.Year
  var xAccessor = d => d.Tracks


  var svg = d3.select("#vis1")
        .style("width", dimensions.width)
        .style("height", dimensions.height)

  var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])




  var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)


var yAxisGen = var xAxisGen = d3.axisBottom().scale(xScale)
      var xAxis = svg.append("g")
                     .call(yAxisGen)
                     .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)












})
