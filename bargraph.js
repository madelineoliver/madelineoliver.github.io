
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
        var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}), )
        console.log(allGroup)

        //get years for dropdown
        var keys = []
        for(var i in allGroup) 
               keys.push(allGroup[i].key)
        //console.log(keys)

        //get Genres for Each year
        var genreOccur = []
        for(var i in allGroup) 
                genreOccur.push(Array.from(d3.group( allGroup[i].value, d => d.Genre ), ([key, value]) => ({key, value}))) 
                //genreOccur.push(Array.from(d3.group( allGroup[i].value, d => d.Genre )) )

        console.log(genreOccur)

        //combine years and genre into new data
        var newData ={}
        for (var i=0; i < keys.length; i++) {
                newData[keys[i]] = genreOccur[i];
        }
        console.log(newData)
      

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

        var myColor = d3.scaleOrdinal(["yellow", "steelblue", "green", "purple", " #E1AD9D","orange","red", "blue", "darkgreen"])
        
        // function to update bars
        var updateBars = function(data){
                var bars = bounds
                        .selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return xScale(d); })
                        .attr("width", xScale.bandwidth())
                        .attr("y", function(d) { return yScale(d); })
                        .attr("height", function(d,i) { return dimensions.boundedHeight - yScale(d[i]); })
                        .style("fill", function(d,i){return myColor(i) });
                
                g.append("g")
                        .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                        .call(d3.axisBottom(xScale));

                g.append("g")
                        .call(d3.axisLeft(yScale));

                bars.transition()
                        .attr('x', function(d) { return xScale(d); })
                        .attr('width', xScale.bandwidth)
                        .attr('y', function(d, i) { return yScale(d); })
                        .attr('height', function(d){return dimensions.boundedHeight - yScale(d)})
                        .style("fill", function(d,i){return myColor(i) });

                bars.exit().remove();
        }
  
        //create drop down and update based on dropdown selection
        var dropdownChange = function(){
                var newYear = d3.select(this).property('value')  
                var drop = newData[newYear]
                var Genr = []
                for(var i=0; i < drop.length; i++){
                        Genr.push(drop[i].key)
                        if(drop[i].value.length > 1){
                        var len = drop[i].value.length;
                                while(len > 1){
                                        Genr.push(drop[i].key) 
                                        len =  len - 1 
                                }
                        }
                }
                                     
                updateBars(Genr)
        }
         
        var dropdown = d3.select('#dropdown')
              //  .insert("select", "svg")
                .on("change", dropdownChange);

        dropdown.selectAll('myOptions')
                .data(allGroup)
                .enter()
                .append("option")     
                .attr("Year",function (d,i) { return keys[i];})
                .text(function (d, i) { return keys[i];})   
                
        //error happening bc of this
        var init = newData[1990]
        var initialData = []
                for(var i=0; i < init.length; i++){
                        initialData.push(init[i].key)  
                        if(init[i].value.length > 1)
                        var len = init[i].value.length;
                                while(len > 1){
                                        initialData.push(init[i].key) 
                                        len =  len - 1 
                                }

                }                      
        //updateBars(initialData)


        console.log(initialData)
    


})
