
/*d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){
        var dimensions = {
            width: 700,
            height: 240,
            margin:{
                top: 50,
                bottom:55,
                right: 50,
                left: 110
            }
        }
        dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

        dataset.sort(function(a,b) { return +a.Year - +b.Year })

        var year_map = d3.groups(dataset, d => +d.Year)
        var avg_sales = d3.rollup(dataset, v => d3.mean(v, d => +d.WorldwideSales), d=>+d.Year)
       
         //creating array
        var avg_array = Array.from(avg_sales)

        var keys = []
        for(var i in avg_array) 
               keys.push(avg_array[i][0])

       // console.log(keys) 

       // console.log(avg_array.indexOf["1990"])

        var svg = d3.select("#vis2")
                .style("width", dimensions.width)
                .style("height", dimensions.height)
                .append("g")
                .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");   

        //x and y scales
        var xScale = d3.scaleBand()
                .domain(avg_array.map(function(d) { return d[0]; }))
                .range([0,dimensions.boundedWidth])
                .padding([0.2])

        var yScale = d3.scaleLinear()
                .domain([0, d3.max(avg_array, function(d) { return +d[1]})])
                .range([dimensions.boundedHeight , 0]);

        svg.append("g")
                .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
      
        svg.append("g")
                .call(d3.axisLeft(yScale));

        //graph labels
        svg.append("text")
                .attr("transform", "translate(" + (dimensions.boundedWidth/2) + " ," + (dimensions.boundedHeight+50) + ")")
                .style("text-anchor", "middle")
                .text("Year");

        svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -(dimensions.boundedHeight/2))
                .attr("y", -80)
                .style("text-anchor", "middle")
                .text(" Avg. Worldwide Sales (per Year)");
        
        //lines
        svg.append("path")
                .datum(avg_array)
                .attr("fill", "none")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                .x(function(d) { return xScale(d[0]) })
                .y(function(d) { return yScale(d[1]) })
                )

        //dots
        var dots = svg.selectAll("circle")
                .data(avg_array)
                .enter()
                .append("circle")
                .on("mouseover", function(){
                        d3.select(this)
                        .attr("fill", "purple")
                })
                .on("mouseout", function(){
                d3.select(this)
                .attr("fill", "red")
                })
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => yScale( d[1]))
                .attr("r", 3)
                .attr("fill", "red")
        //erases previous dots and only placed 1
        var highlightData = function(data){
                console.log(avg_array[data][1])
                dots
                .data(avg_array)
                .attr("cx", xScale(avg_array[data][0]))
                .attr("cy", yScale( avg_array[data][1]))
                .attr("r", 6)
                .attr("fill", "red")
                console.log("reached4")
        }
        var dropdownChange = function(){
                var newYear =  parseInt(d3.select(this).property('value') )
                var index = keys.indexOf(newYear)
                var drop = avg_array[index][0]                
                highlightData(index)
                console.log("reached3")
        }

        var dropdown = d3.select('#dropdown')
        //  .insert("select", "svg")
                .on("change", dropdownChange);
                console.log("reached1")
        
      /*  dropdown.selectAll('myOptions')
                  .data(avg_array)
                  .enter()
                  .append("option")     
                  .attr("Year",function (d,i) { return keys[i];})
                  .text(function (d, i) { return keys[i];})   
                  console.log("reached2")
    })*/
    