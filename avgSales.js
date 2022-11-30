
d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){
        console.log(dataset)

        var dimensions = {
            width: 700,
            height: 300,
            margin:{
                top: 100,
                bottom: 50,
                right: 10,
                left: 50
            }
        }
        dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
        
        var svg = d3.select("#vis2")
            .style("width", dimensions.width)
            .style("height", dimensions.height)
                   
        var g = svg.append("g")
                .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");      

        var xScale = d3.scaleBand()
                .domain(dataset.map(function(d) { return d.Year; }))
                .range([0,dimensions.boundedWidth])
                .padding([0.2])

        var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return +d.WorldwideSales})])
                .range([dimensions.boundedHeight , 0]);

        g.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

                ''
        g.append("g")
                .call(d3.axisLeft(yScale));
        
       /* var	valueline = d3.line()
            .x(function(d) { return xScale(d.Year); })
            .y(function(d) { return yScale(d.WorldwideSales); });

        
        // Add the valueline path.
        svg.append("path")	
            .attr("class", "line")
            .attr("d", valueline(dataset));*/

    })
    