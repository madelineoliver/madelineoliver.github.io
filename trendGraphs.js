
d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

        //sort data by year in ascending order
       //dataset.sort(function(a,b) { return +a.Year - +b.Year })


        //group data by year
        var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}), )


        //get years for dropdown
        var keys = []
        for(var i in allGroup)
               keys.push(allGroup[i].key)
        var currentData1 = 0
        var lineOne = NaN
        var currentData2 = 0
        var lineTwo= NaN


        /**********************************************code for Genre bar graph*******************************************************************************/
                
                //get Genres for Each year 
                var genreOccur = []
                for(var i in allGroup){
                        genreOccur.push(Array.from(d3.group( allGroup[i].value, d => d.Genre ), ([key, value]) => ({key, value})))
                }
                 //sort genres
               /* for(var i =0; i< genreOccur.length; i++){
                        genreOccur[i].sort(function(a,b){return d3.ascending(a.key, b.key)})
                       }*/
                
                //creating new data
                var Genres = []
                var newData ={}
                for (var i=0; i < keys.length; i++) {
                        newData[keys[i]] = genreOccur[i];

                        for (var j=0; j < genreOccur[i].length; j++) {
                                var l = genreOccur[i][j].key
                                Genres.push(l)        
                        }
                        //adding place holders for all genres in each year
                        var newGenres = JSON.parse(JSON.stringify(genreOccur));
                        if (Genres.indexOf('R&B')=== -1){
                                var RB = newGenres[4][1];
                                RB.value.length = 0
                                genreOccur[i].push(RB)
                        }
                        if (Genres.indexOf('Jazz')=== -1){
                                var Jazz = newGenres[2][1]
                                Jazz.value.length = 0
                                genreOccur[i].push(Jazz)
                        }
                        if (Genres.indexOf('Pop')=== -1){
                                var Pop = newGenres[0][3]
                                Pop.value.length = 0
                                genreOccur[i].push(Pop)
                        }
                        if (Genres.indexOf('Country') === -1){
                                var country = newGenres[0][1]
                                country.value.length = 0
                                genreOccur[i].push(country)
                        }
                        if (Genres.indexOf('Hip Hop') === -1){
                                var Hiphop = newGenres[0][2]
                                Hiphop.value.length = 0
                                genreOccur[i].push(Hiphop)
                        }
                        if (Genres.indexOf('Rock') === -1){
                                var Rock = newGenres[2][3]
                                Rock.value.length = 0
                                genreOccur[i].push(Rock)
                        }
                        if (Genres.indexOf('Classical') === -1){
                                var classical = newGenres[0][0]
                                classical.value.length = 0
                                genreOccur[i].push(classical)
                        }
                        if (Genres.indexOf('World') === -1){
                                var world = newGenres[0][5]
                                world.value.length = 0
                                genreOccur[i].push(world)
                        }
                        if (Genres.indexOf('Blues') === -1){
                                var blues = newGenres[24][0]
                                blues.value.length = 0
                                genreOccur[i].push(blues)
                        }
                        if (Genres.indexOf('EDM') === -1){
                                var edm = newGenres[23][1]
                                edm.value.length = 0
                                genreOccur[i].push(edm)
                        }
                        Genres.length  = 0
                }
               // console.log(newData)
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
                        .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");

                var g = svg1.append("g")
                        .attr("transform", "translate(" + dimensions.margin.left+ "," + dimensions.margin.top +  ")");
                    
               
                var bounds = svg1.append("g")
                        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

                var xScale = d3.scaleBand()
                        .domain(dataset.map(function(d) { return d.Genre }))
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
                //add grid
                g.append('g')
                        .attr('class', 'grid')
                        .call(d3.axisLeft()
                            .scale(yScale)
                            .tickSize(-dimensions.boundedWidth, 0, 0)
                            .tickFormat(''))
                        .style("stroke-width", .5)
                        .style("stroke-opacity", 0.5)
                        

                //graph labels
                svg1.append("text")
                        .attr('class', 'text')
                        .attr("transform", "translate(" + (dimensions.boundedWidth/2) + " ," + (dimensions.boundedHeight+70) + ")")
                        .style("text-anchor", "middle")
                        .text("Genre");

                svg1.append("text")
                        .attr('class', 'text')
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions.boundedHeight-20))
                        .attr("y", 15)
                        .style("text-anchor", "middle")
                        .text("# of Genres (per Year)");
                        
                        ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]
                        ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]
                        function colorPicker(v) 
                        {
                                if (v == "R&B")
                                        return "#7fc97f"
                                if (v == "Pop" )
                                        return "#beaed4"
                                if(v=="Country")
                                        return "#ffff99"
                                if(v == "Blues")
                                        return "#386cb0"
                                if(v == "Hip Hop")
                                        return "#CDF0EA"
                                if(v == "Classical")
                                        return "#bf5b17"
                               if(v== "Rock")
                                        return "#898AA6" 
                               if(v== "World")
                                        return "#B7C4CF"  
                                if (v== "Jazz")
                                        return "#DEB6AB"                        }

                var init = newData[1990]
                //console.log(init)
                        var bars = bounds
                                .selectAll("bars")
                                .data(init)
                                .enter()
                                .append("rect")
                                .attr("class", "bar")
                                .attr("x", function(d, i) { return xScale(d.key); })
                                .attr("y", function(d, i) { return yScale(d.value.length); })
                                .attr("width", xScale.bandwidth())
                                .attr("height", function(d,i) { return dimensions.boundedHeight - yScale(d.value.length); })
                                .style("fill", function(d,i) {return colorPicker(d.key)})
                                .style("stroke", "black")
                                .on('mouseover', function(d,i){
                                        d3.select(this).style('stroke', 'white')
                                })
                                .on('mouseout', function (d, i) {
                                        d3.select(this).style('stroke', 'black')
                                        d3.select(this).transition()
                                })
             
                               // .style("fill", function(d,i){return myColor(i)});*/
                // console.log(init)
                 function updateBars(data){  
                        console.log(data)
                        bars.data(data)
                        .transition()
                        .attr("x", function(d, i) { return xScale(d.key); })
                        .attr("width", xScale.bandwidth())
                        .attr("y", function(d, i) { return yScale(d.value.length); })
                        .attr("height",  function(d,i) { return dimensions.boundedHeight - yScale(d.value.length)})   
                        .style("fill", function(d,i) {return colorPicker(d.key)})
                        //console.log(data => data.value.length)       
                }
            
                //var init = newData[1990]
                //updateBars(init)         
        
        /**********************************************code for avg world wide sales graph****************************************************************************/
        
        var avg_sales = d3.rollup(dataset, v => d3.mean(v, d => +d.WorldwideSales), d=>+d.Year)
        //creating array
        var avg_array = Array.from(avg_sales)

        createGraph2(0)
        function createGraph2(index){
                var dimensions2 = {
                        width: 550,
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
                        .paddingOuter(1.4)
                        .paddingInner(0.9)

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
                        .attr('class', 'text')
                        .attr("transform", "translate(" + (dimensions2.boundedWidth/2) + " ," + (dimensions2.boundedHeight+50) + ")")
                        .style("text-anchor", "middle")
                        .text("Year");

                svg2.append("text")
                        .attr('class', 'text')
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions2.boundedHeight/2))
                        .attr("y", -80)
                        .style("text-anchor", "middle")
                        .text(" Avg. Worldwide Sales (per Year)");
                //graph text box
                
                        
                const tooltip = d3.select("body")
                        .append("div")
                        .attr("class","d3-tooltip")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("width", "210px")
                        .style("padding", "10px")
                        .style("background", "Navy")
                        .style("border-radius", "5px")
                        .style("top", "62%")
                        .style("left", "75%")
                        .style("color", "#fff")
                        .text("a simple tooltip");
              
                //lines
                svg2.append("path")
                        .datum(avg_array)
                        .attr("fill", "none")
                        .attr("stroke", "#C5C5C5")
                        .attr("stroke-width", 3 )
                        .attr("d", d3.line()
                        .x(function(d) { return xScale(d[0]) })
                        .y(function(d) { return yScale(d[1]) }))

                //vertical line

                if(currentData2 != data && lineTwo!= NaN){
                        lineTwo.style("stroke-width", 0)
                        currentData2 = data
                }
                var line2 = svg2.append('line')
                       .attr("x1", xScale(avg_array[currentData2][0]))  //<<== change your code here
                        .attr("y1", dimensions2.boundedHeight )
                        .attr("x2", xScale(avg_array[currentData2][0]))  //<<== and here
                        .attr("y2", 0)
                        .style("stroke-dasharray", 2)
                        .style("stroke-width", 3)
                        .style("stroke", "#FDFD96")
                        .style("fill", "none");
                lineTwo = line2
                
                //dots
                        
                        var circles = svg2.selectAll('.circle')
                        .data(avg_array)
                        .enter()
                        .append('circle')
                        .attr("class", "update") 
                        .attr("cx",d=> xScale(d[0]))
                        .attr("cy", d => yScale(d[1]))
                        .attr("r", 4.5)
                        .attr("fill", "#2E8BC0") 
                        .style("stroke", "navy")
                        .on('mouseover', function(d,i){
                                tooltip.text("Year: " + i[0] + " \nAvg. Sales: " +i[1]).style("visibility", "visible");
                                d3.select(this)
                                .attr("r", 6)
                                .attr("fill", "#FDFD96") 
                        })
                        .on('mouseout', function (d, i) {
                                tooltip.html(``).style("visibility", "hidden");
                                d3.select(this).transition()
                                .attr("r", 5)
                                .attr("fill", "#2E8BC0") 
                                
                        })
        }
 

        /************************************************code for avg Tracks graph****************************************************************************/
        
        //array of objects grouped by year
        var avg_map = d3.rollup(dataset, v => d3.mean(v, d => +d.Tracks), d=>+d.Year)
        //creating array
        let avg_array2 = Array.from(avg_map)

        createGraph3(0)
        function createGraph3(index){
                var dimensions3 = {
                        width: 550,
                        height: 240,
                        margin:{
                            top: 50,
                           bottom:55,
                            right: 50,
                            left: 110
                        }
                }
                drawGraph3(dimensions3, index)    
        }
        function drawGraph3(dimensions3, data){
                dimensions3.boundedWidth = dimensions3.width - dimensions3.margin.right - dimensions3.margin.left
                dimensions3.boundedHeight = dimensions3.height - dimensions3.margin.top - dimensions3.margin.bottom

                var svg3 = d3.select("#vis1")
                        .style("width", dimensions3.width)
                        .style("height", dimensions3.height)
                        .append("g")
                        .attr("transform","translate(" + dimensions3.margin.left + "," + dimensions3.margin.top + ")");
                
                var xScale = d3.scaleBand()
                        .domain(d3.map(avg_array2, d => d[0]))
                        .range([0,dimensions3.boundedWidth])
                        .paddingOuter(1.4)
                        .paddingInner(0.9)
                
                var yScale = d3.scaleLinear()
                        .domain([10, d3.max(avg_array2, function(d) { return +d[1]})])
                        .range([dimensions3.boundedHeight, 0])  
        
                //graph labels
                svg3.append("text")
                        .attr('class', 'text')
                        .attr("transform", "translate(" + (dimensions3.boundedWidth/2) + " ," + (dimensions3.boundedHeight +50) + ")")
                        .style("text-anchor", "middle")
                        .text("Year");
                
                svg3.append("text")
                        .attr('class', 'text')
                        .attr("transform", "rotate(-90)")
                        .attr("x", -(dimensions3.boundedHeight/2 ))
                        .attr("y",-80)
                        .style("text-anchor", "middle")
                        .text("Avg. # of Tracks (per Year)");

                //Text box label
                const tooltip = d3.select("body")
                        .append("div")
                        .attr("class","d3-tooltip")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("width", "100px")
                        .style("padding", "10px")
                        .style("background", "purple")
                        .style("border-radius", "5px")
                        .style("top", "9%")
                        .style("left", "54%")
                        .style("color", "#fff")
                        .text("a simple tooltip");
                
                svg3.append("path")
                        .datum(avg_array2)
                        .attr("fill", "none")
                        .attr("stroke", "#C5C5C5")
                        .attr("stroke-width", 3)
                        .attr("d", d3.line()
                                .x(function(d) {return xScale(d[0]) })
                                .y(function (d) { return yScale(d[1])})
                        ) 
                     
                if(currentData1 != data && lineOne != NaN){
                        lineOne .style("stroke-width", 0)
                        currentData1 = data
                }
                var line1 = svg3.append('line')
                       .attr("x1", xScale(avg_array2[currentData1][0]))  //<<== change your code here
                        .attr("y1", dimensions3.boundedHeight )
                        .attr("x2", xScale(avg_array2[currentData1][0]))  //<<== and here
                        .attr("y2", 0)
                        .style("stroke-dasharray", 2)
                        .style("stroke-width", 3)
                        .style("stroke", "#FDFD96")
                        .style("fill", "none");
                lineOne = line1
                
                //console.log(xScale(avg_array2[data]))
                
                //adding scatterplot
                var dots = svg3.selectAll("circle")
                        .data(avg_array2)
                        .enter()
                        .append("circle")
                        .on('mouseover', function(d,i){
                                tooltip.text("Year: " + i[0] +  "Avg. Tracks: " +i[1]).style("visibility", "visible");
                                d3.select(this)
                                .attr("r", 6);
                        })
                        .on('mouseout', function (d, i) {
                                tooltip.html(``).style("visibility", "hidden");
                                d3.select(this).transition()
                                .attr("r", 5);
                        })
                        .attr("cx", d => xScale(d[0]))
                        .attr("cy", d => yScale( d[1]))
                        .attr("r", 5)
                        .attr("fill", "black")

                
                svg3.append("g")
                        .attr("transform", "translate(0," + dimensions3.boundedHeight + ")")
                        .call(d3.axisBottom(xScale))
                        .selectAll("text")  
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)");
        
                svg3.append("g")
                        .call(d3.axisLeft(yScale));

                
         }
       


        /************************************** code for main ranking graph ***********************************************/
       
        //get rankings for Each year
        
        var  ranking = []
        for(var i in allGroup)
                ranking.push(Array.from(d3.group( allGroup[i].value, d => +d.Ranking ), ([key, value]) => ({key, value})))
        
       // console.log(ranking)
        

        var newData_main ={}
        for (var i=0; i < keys.length; i++) {
                newData_main[keys[i]] = ranking[i];
        }
        //console.log(newData_main)

        
        //console.log(newData_main[1990][0].value[0].Tracks)

        //console.log(allGroup)
                var dimensions4 = ({
                        width: 700,
                        height: 300,
                        margin: {
                        top: 0,
                        right: 20,
                        bottom: 60,
                        left: 42
                    }
                })
        
                dimensions4.boundedWidth = dimensions4.width - dimensions4.margin.right - dimensions4.margin.left
                dimensions4.boundedHeight = dimensions4.height - dimensions4.margin.top - dimensions4.margin.bottom
        
        var svg4 = d3.select("#vis4")
                .style("width", dimensions4.width) 
                .style("height", dimensions4.height)
                .append("g")
                .attr("transform","translate(" + dimensions4.margin.left + "," + dimensions4.margin.top + ")");

        var bounds2 = svg4.append("g")
                .style("transform", `translate(${dimensions4.margin.left}px, ${dimensions4.margin.top}px)`)

        const tooltip = d3.select("body")
                .append("div")
                .attr("class","d3-tooltip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("width", "300px")
                .style("padding", "10px")
                .style("background", "#eddaca")
                .style("border-radius", "5px")
                .style("top", "30%")
                .style("left", "50%")
                .style("color", "#fff")
                .text("a simple tooltip");

        var xScale1 = d3.scaleLinear()
                .domain(d3.extent(dataset, d => +d.WorldwideSales))
               // .range([dimensions4.margin.left ,dimensions4.boundedWidth - dimensions4.margin.right])
                .range([0, dimensions4.boundedWidth])
                
        var yScale1 = d3.scaleBand()
             .domain(dataset.map(function(d){ return +d.Ranking}))
             .range([dimensions4.boundedHeight , 0])
             //.padding(.2)
             .paddingOuter(.4)
             .paddingInner(.2)
        
        //graph labels
        svg4.append("g")
                .attr("transform", "translate(0," + dimensions4.boundedHeight + ")")
                .call(d3.axisBottom(xScale1))
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

        svg4.append("g")
                .call(d3.axisLeft(yScale1).tickSize(0));

        //remove y axis bar
        yScale1.call(d => d.select(".domain").remove)

        var initial = newData_main[1990]
        console.log(initial)

        //console.log(initial)
        //myColor = [ "navy", "Blue", "Green", "pink","black", "yellow", "white", "orange", "red","purple"]
        //myColor = ["#f7fbff","#e3eef9","#cfe1f2","#b5d4e9","#93c3df","#6daed5","#4b97c9","#2f7ebc","#1864aa","#0a4a90","#08306b"]
        myColor = ["#08306b","#0b4d94","#1c6aaf","#3787c0","#59a1cf","#82badb","#abcfe6","#cadef0","#e1edf8","#f7fbff"]
        var bars2 = bounds2
                .append("g")
                //.attr("transform", `translate(${margin.left}, ${margin.top})`)
                .selectAll("rect")
                .data(initial)
                .join("rect")
                .attr("width",function(d,i) {return xScale1(d.value[0].WorldwideSales);})
                .attr("height", yScale1.bandwidth())
                .attr("y", function(d,i) {return yScale1(d.key)})
                .attr("x", xScale1(0))
                .attr("fill", function(d, i){return myColor[i]})
                .style("stroke", "#000")
                .on('mouseover', function(d,i){
                        
                        d3.select(this).style('stroke', 'white')
                        tooltip.text("Album Name: " + i.value[0].Album + "\n" + "Artist: " + i.value[0].Artist + "  CD's: " +  i.value[0].CDs + "Tracks:" +  i.value[0].Tracks + "Album Length:" +  i.value[0].AlbumLength + "Genre:" + i.value[0].Genre).style("visibility", "visible");
                        d3.select(this)
                        .attr("r", 6);
                }
                )
                .on('mouseout', function(d,i){
                        d3.select(this).style('stroke', 'black')
                        tooltip.html(``).style("visibility", "hidden");
                        d3.select(this).transition()
                        .attr("r", 5);
                })
                

        function updateBars2(data){  
                console.log(data)
                bars2.data(data)
                .transition()
                .attr("width",function(d,i) {return xScale1(d.value[0].WorldwideSales);})
                .attr("height", yScale1.bandwidth())
                .attr("y", function(d,i) {return yScale1(d.key)})
                .attr("x", xScale1(0))  
                //console.log(data => data.value.length)       
                }
        
        
               
        //console.log(newData_main[1990][0].value[0].Tracks)


        //graph labels
        /*
        svg4.append("text")
                .attr("transform", "translate(" + (dimensions4.width/2) + " ," + (dimensions4.height-5) + ")")
                .style("text-anchor", "middle")
                .text("space");
        */
       /*
        svg4.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -(dimensions4.height/2))
                .attr("y",15)
                .style("text-anchor", "middle")
                .text("space");
        */
        
        

        /*********************************create drop down and update based on dropdown selection***************************************************************************/
        //note to update other graphs you need to go through creategraph -> drawgraph -> and then the updating/ changing function is called
        var dropdownChange = function(){
                var newYear = d3.select(this).property('value')
                var drop = newData[newYear]
                var drop2 = newData_main[newYear]
                var index = keys.indexOf(newYear)
                createGraph2(index)
                createGraph3(index)
                updateBars(drop) 
                updateBars2(drop2)

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
