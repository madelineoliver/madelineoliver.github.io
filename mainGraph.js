d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var dimensions = {
        width: 500,
        height: 300,
        margin:{
            top: 30,
            bottom: 50,
            right: 80,
            left: 30
        }
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    //sort data by year in ascending order
    dataset.sort(function(a,b) { return +a.Year - +b.Year })

    var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}), )

    //get years for dropdown
    var keys = []
    for(var i in allGroup) 
        keys.push(allGroup[i].key)

    //get Artist for Each year
    var Art = []
    for(var i in allGroup) 
        Art.push(Array.from(d3.group( allGroup[i].value, d => d.WorldwideSales ), ([key, value]) => ({key, value}))) 
    //console.log(Art)

    //combine years and genre into new data
    var newData ={}
    for (var i=0; i < keys.length; i++) {
        newData[keys[i]] = Art[i];
    }
    //console.log(newData)

    var svg = d3.select("#vis4")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .append("g")
        .attr("transform","translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

    var xScale = d3.scaleBand()
        .domain(dataset.map(function(d) { return d.WorldwideSales; }))
        .range([0,dimensions.boundedWidth])
        .padding([0.2])
              

    var yScale = d3.scaleLinear()
        .domain([0, 10])
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
        .attr("transform", "translate(" + (dimensions.width/2) + " ," + (dimensions.height-5) + ")")
        .style("text-anchor", "middle")
        .text("space");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensions.height/2))
        .attr("y",15)
        .style("text-anchor", "middle")
        .text("space");

    
/*
    var dropdownChange = function(){
        var newYear = d3.select(this).property('value')  
        var drop = newData[newYear]
        //console.log(drop)
        updateBars(drop)
    }       
 
    var dropdown = d3.select('#dropdown2')
        //  .insert("select", "svg")
            .on("change", dropdownChange);

    dropdown.selectAll('myOptions')
            .data(allGroup)
            .enter()
            .append("option")     
            .attr("Year",function (d,i) { return keys[i];})
            .text(function (d, i) { return keys[i];})   */
            
            

    
})
