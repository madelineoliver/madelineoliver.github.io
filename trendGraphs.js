
d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

        //sort data by year in ascending order
        dataset.sort(function(a,b) { return +a.Year - +b.Year })

        //group data by year
        var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}), )

        //get years for dropdown
        var keys = []
        for(var i in allGroup)
               keys.push(allGroup[i].key)

        //get Genres for Each year
        var genreOccur = []
        for(var i in allGroup)
                genreOccur.push(Array.from(d3.group( allGroup[i].value, d => d.Genre ), ([key, value]) => ({key, value})))

        //combine years and genre into new data
        var newData ={}
        for (var i=0; i < keys.length; i++) {
                newData[keys[i]] = genreOccur[i];
        }

        var avg_sales = d3.rollup(dataset, v => d3.mean(v, d => +d.WorldwideSales), d=>+d.Year)
        //creating array
        var avg_array = Array.from(avg_sales)

        /**********************************************code for Genre bar graph*******************************************************************************/
        
                var dimensions = {
                        width: 500,
                        height: 200,
                        margin:{
                        top: 30,
                        bottom: 50,
                        right: 20,
                        left: 50
                        }
                }
           
                dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
                dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

                var svg1 = d3.select("#vis3")
                        .style("width", dimensions.width)
                        .style("height", dimensions.height)

                var g = svg1.append("g")
                        .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");

                var bounds = svg1.append("g")
                        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

                var xScale = d3.scaleBand()
                        .domain(dataset.map(function(d) { return d.Genre; }))
                        .range([0,dimensions.boundedWidth])
                        .padding([0.2])

                var yScale = d3.scaleLinear()
                        .domain([0, 10])
                        .range([dimensions.boundedHeight , 0]);

                var myColor = d3.scaleOrdinal(["yellow", "steelblue", "green", "purple", " #E1AD9D","orange","red", "blue", "darkgreen"])

                g.append("g")
                        .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                        .call(d3.axisBottom(xScale));

                g.append("g")
                        .call(d3.axisLeft(yScale));

                //graph labels
                svg1.append("text")
                        .attr("transform", "translate(" + (dimensions.boundedWidth/2) + " ," + (dimensions.boundedHeight+70) + ")")
                        .style("text-anchor", "middle")
                        .text("Genre");

                svg1.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions.boundedHeight-20))
                        .attr("y", 15)
                        .style("text-anchor", "middle")
                        .text("# of Genres (per Year)");

                // function to update bars
                var updateBars = function(data){
                        //console.log(data)
                        var bars = bounds
                                .selectAll("bars")
                                .data(data)
                                .enter()
                                .append("rect")
                                .attr("class", "bar")
                                .attr("x", function(d, i) { return xScale(d.key); })
                                .attr("width", xScale.bandwidth())
                                .attr("y", function(d, i) { return yScale(d.key); })
                                .attr("height", function(d,i) { return dimensions.boundedHeight - yScale(d.value.length); })
                                .style("fill", function(d,i){return myColor(i)});

                        bars.transition()
                                .attr('x', function(d) { return xScale(d.key); })
                                .attr('width', xScale.bandwidth)
                                .attr('y', function(d, i) { return yScale(d.value.length); })
                                .attr('height', function(d){return dimensions.boundedHeight - yScale(d.value.length)})
                                .style("fill", function(d,i){return myColor(i)});

                        //console.log(bars.exit().remove())
                        bars.exit().remove()
                }
                //initial data
                var init = newData[1990]
                updateBars(init)
        
                
        
        /**********************************************code for avg world wide sales graph****************************************************************************/
        createGraph2(0)
        function createGraph2(index){
                var dimensions2 = {
                        width: 700,
                        height: 240,
                        margin:{
                            top: 50,
                            bottom:55,
                            right: 50,
                            left: 110
                        }
                }
                drawGraph2(dimensions2, index)    
        }

        function drawGraph2(dimensions2, data){
                dimensions2.boundedWidth = dimensions2.width - dimensions2.margin.right - dimensions2.margin.left
                dimensions2.boundedHeight = dimensions2.height - dimensions2.margin.top - dimensions2.margin.bottom
               
                var svg2 = d3.select("#vis2")
                        .style("width", dimensions2.width)
                        .style("height", dimensions2.height)
                        .append("g")
                        .attr("transform", "translate(" + dimensions2.margin.left+ "," + dimensions2.margin.top +  ")");   

                //x and y scales
                var xScale = d3.scaleBand()
                        .domain(avg_array.map(function(d) { return d[0]; }))
                        .range([0,dimensions2.boundedWidth])
                        .padding([0.2])

                var yScale = d3.scaleLinear()
                        .domain([0, d3.max(avg_array, function(d) { return +d[1]})])
                        .range([dimensions2.boundedHeight , 0]);

                svg2.append("g")
                        .attr("transform", "translate(0," + dimensions2.boundedHeight + ")")
                        .call(d3.axisBottom(xScale))
                        .selectAll("text")  
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)");
        
                svg2.append("g")
                        .call(d3.axisLeft(yScale));

                //graph labels
                svg2.append("text")
                        .attr("transform", "translate(" + (dimensions2.boundedWidth/2) + " ," + (dimensions2.boundedHeight+50) + ")")
                        .style("text-anchor", "middle")
                        .text("Year");

                svg2.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions2.boundedHeight/2))
                        .attr("y", -80)
                        .style("text-anchor", "middle")
                        .text(" Avg. Worldwide Sales (per Year)");
                
                //lines
                svg2.append("path")
                        .datum(avg_array)
                        .attr("fill", "none")
                        .attr("stroke", "#69b3a2")
                        .attr("stroke-width", 3)
                        .attr("d", d3.line()
                        .x(function(d) { return xScale(d[0]) })
                        .y(function(d) { return yScale(d[1]) })
                        )
                //dots
                var dots = svg2.selectAll("circle")
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
                highlightData(dots, data, xScale, yScale)


        }

        function highlightData(dots,data, xScale, yScale){
                ///dots.exit().remove()
                dots
                .data(avg_array)
                .attr("cx", xScale(avg_array[data][0]))
                .attr("cy", yScale( avg_array[data][1]))
                .attr("r", 4)
                .attr("fill", "red")
        }

        /************************************************code for avg Tracks graph****************************************************************************/
        createGraph3(0)
        function createGraph3(index){
                var dimensions3 = ({
                        width: 700,
                        height: 260,
                        margin: {
                        top: 10,
                        right: 10,
                        bottom: 30,
                        left: 40
                    }
                })
                drawGraph3(dimensions3, index)    
        }
        function drawGraph3(dimensions3, data){
                dimensions3.boundedWidth = dimensions3.width - dimensions3.margin.right - dimensions3.margin.left
                dimensions3.boundedHeight = dimensions3.height - dimensions3.margin.top - dimensions3.margin.bottom
                //array of objects grouped by year
                var avg_map = d3.rollup(dataset, v => d3.mean(v, d => +d.Tracks), d=>+d.Year)

                //creating array
                let avg_array2 = Array.from(avg_map)

                var svg = d3.select("#vis1")
                        .style("width", dimensions3.width)
                        .style("height", dimensions3.height)
                        .append("g")
                        .attr("class", "line-background")
                        .attr("transform",
                                "translate(" + dimensions3.margin.left + "," + dimensions3.margin.top + ")");
                
                var xScale = d3.scaleBand()
                        .domain(d3.map(avg_array2, d => d[0]))
                        .range([dimensions3.margin.left ,dimensions3.boundedWidth - dimensions3.margin.right])
                        .padding([1])
                
                var yScale = d3.scaleLinear()
                        .domain([10, d3.max(avg_array2, d => d[1])])
                        .range([dimensions3.boundedHeight-dimensions3.margin.bottom, dimensions3.margin.top])     

                //graph labels
                svg.append("text")
                        .attr("transform", "translate(" + (dimensions3.boundedWidth/2) + " ," + (dimensions3.boundedHeight +20) + ")")
                        .style("text-anchor", "middle")
                        .text("Year");
                
                svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions3.boundedHeight/2))
                        .attr("y",15)
                        .style("text-anchor", "middle")
                        .text("Avg. # of Tracks (per Year)");
                
                svg.append("path")
                        .datum(avg_array2)
                        .attr("fill", "none")
                        .attr("stroke", "#69b3a2")
                        .attr("stroke-width", 4)
                        .attr("d", d3.line()
                                .x(function(d) {return xScale(d[0]) })
                                .y(function (d) { return yScale(d[1])})
                        )      
                
                //adding scatterplot
                var dots = svg.selectAll("circle")
                        .data(avg_array2)
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
                                .style("transform", `translateY(${dimensions3.boundedHeight-dimensions3.margin.bottom}px)`)
                                .selectAll("text")
                                .style("text-anchor", "end")
                                .attr("dx", "-.8em")
                                .attr("dy", ".15em")
                                .attr("transform", "rotate(-65)" );
                
                var yAxisGen =  d3.axisLeft().scale(yScale)
                var yAxis = svg.append("g")
                        .call(yAxisGen)
                        .style("transform", `translateX(${dimensions3.margin.left}px)`)

                highlightData(dots, data, xScale, yScale)
         }


        /*********************************create drop down and update based on dropdown selection***************************************************************************/
        //note to update other graphs you need to go through creategraph -> drawgraph -> and the the updating/ changing function is called
        var dropdownChange = function(){
                var newYear = d3.select(this).property('value')
                var drop = newData[newYear]
                var index = keys.indexOf(newYear)
                createGraph2(index)
                createGraph3(index)
                updateBars(drop)           
        }
        var dropdown = d3.select('#dropdown')
        //  .insert("select", "svg1")
                .on("change", dropdownChange);

        dropdown.selectAll('myOptions')
                .data(allGroup)
                .enter()
                .append("option")
                .attr("Year",function (d,i) { return keys[i];})
                .text(function (d, i) { return keys[i];})




})
