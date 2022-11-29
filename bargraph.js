
d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){
        console.log(dataset)

        var dimensions = {
                width: 500,
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

        //sort data by year in ascending order
        dataset.sort(function(a,b) { return +a.Year - +b.Year })

        //group data by year
        var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}))
       // var allGroup = Array.from(d3.group(dataset, d => d.Year));
       // var allGroup = d3.group(dataset, d => d.Year);
        console.log(allGroup)

        //get years for dropdown
        var keys = []
        for(var i in allGroup) 
               keys.push(allGroup[i].key)        
        console.log(keys)

        //how to get genre from group
        console.log(allGroup[0].value[1].Genre)
        
        var dropdown = d3.select('#dropdown')
                dropdown.selectAll('myOptions')
                .data(dataset)
                .enter()
                .append("option")     
                .attr("Year",function (d,i) { return keys[i];})
                .text(function (d, i) { return keys[i];})
               // .attr("Year",function (d,i) { return d.year;})
                //.text(function (d, i) { return d.year;})

        var svg = d3.select("#vis3")
                .style("width", dimensions.width)
                .style("height", dimensions.height)

         var g = svg.append("g")
                .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");

        var bounds = svg.append("g")
                .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

        var xScale = d3.scaleBand()
                .domain(dataset.map(function(d) { return d.Genre; }))
                .range([0,dimensions.boundedWidth])
                .padding([0.2])

        var yScale = d3.scaleLinear()
                .domain([0, 10])
                .range([dimensions.boundedHeight , 0]);

        //var color = ["yellow", "steelblue", "green", "purple", "pink","orange","red", "blue", "peach" ]
        var myColor = d3.scaleOrdinal(["yellow", "steelblue", "green", "purple", " #E1AD9D","orange","red", "blue", "darkgreen"])

        // Append rectangles for bar chart
        var bars = bounds
                .selectAll(".bar")
                .data(dataset)
                .datum(dataset.filter(function(d){return d.year == 1990}))
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return xScale(d.Genre); })
                .attr("width", xScale.bandwidth())
                .attr("y", function(d) { return yScale(d.Ranking); })
                .attr("height", function(d) { return dimensions.boundedHeight - yScale(d.Ranking); })
                .style("fill", function(d,i){return myColor(i) });
        
        g.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(xScale));

        g.append("g")
                .call(d3.axisLeft(yScale));

        bars.transition()
                .attr('x', function(d) { return xScale(d.Genre); })
                .attr('width', xScale.bandwidth)
                .attr('y', function(d) { return yScale(d.Ranking); })
                .attr('height', function(d){return dimensions.boundedHeight - yScale(d.Ranking)})
                .style("fill", function(d,i){return myColor(i) });

        //A function that update the chart
       



})
