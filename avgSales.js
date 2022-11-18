
d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){
        console.log(dataset)

        var dimensions = {
            width: 400,
            height: 400,
            margin:{
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }

        var svg = d3.select("#vis2")
            .style("width", dimensions.width)
            .style("height", dimensions.height)
            .append("g")
            .attr("transform",
                  "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

        
        var xScale = d3.scaleBand()
            .domain(d3.extent(dataset, function(d) { return d.Year; }))
            .range([0,dimensions.boundedWidth])
            .padding([0.2])
        
        var yScale = d3.scaleLinear()
            .domain([1, d3.max(dataset, function(d) { return d.WorldwideSales; })])
            .range([dimensions.boundedHeight ,0]);
       
        // Define the axes
       /* var	xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);
        
        var	yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);*/
        
        var	valueline = d3.line()
            .x(function(d) { return xScale(d.Year); })
            .y(function(d) { return yScale(d.WorldwideSales); });

        
        // Add the valueline path.
        svg.append("path")	
            .attr("class", "line")
            .attr("d", valueline(dataset));

        svg.append("g")		
            .attr("class", "x axis")
            .attr("transform", "translate(0," + dimensions.height + ")")
            .call(xScale);
     
        // Add the Y Axis
        svg.append("g")		
            .attr("class", "y axis")
            .call(yScale);
})
    