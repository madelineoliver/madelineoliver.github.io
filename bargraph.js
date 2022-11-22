d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){
    console.log(dataset)

    var dimensions = {
        width: 300,
        height: 400,
        margin:{
            top: 150,
            bottom: 100,
            right: 20,
            left: 100
        }
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    var svg = d3.select("#vis3")

            .style("width", dimensions.width)
            .style("height", dimensions.height)


    var g = svg.append("g")
            .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");


    var xScale = d3.scaleBand()
            .domain(dataset.map(function(d) { return d.Genre; }))
            .range([0,dimensions.boundedWidth])
            .padding([0.2])

    var yScale = d3.scaleLinear()
             //
            .domain([1, d3.max(dataset, function(d) { return d.Ranking;})])
            .range([dimensions.boundedHeight , 0]);
    // Append rectangles for bar chart
  /*svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.Genre); })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d) { return yScale(d.Ranking); })
        .attr("height", function(d) { return dimensions.height - yScale(d.Ranking); });
    */
    g.append("g")
            .attr("transform", "translate(0," + dimensions.height + ")")
            .call(d3.axisBottom(xScale));

    g.append("g")
            .call(d3.axisLeft(yScale));

})
