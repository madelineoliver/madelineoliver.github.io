d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var dimensions = {
        width: 700,
        height: 300,
        margin:{
        top: 30,
        bottom: 50,
        right: 20,
        left: -10
        }
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    //sort data by year in ascending order
    dataset.sort(function(a,b) { return +a.Year - +b.Year })
    console.log(dataset)

    var groupedData = d3.rollup(dataset, d => d.Artist, d => +d.Year)
   // console.log(dataset,  d.Artist)
    var newData = Array.from(groupedData)
    console.log(newData)

    var svg = d3.select("#vis4")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("class", "line-background")
        .attr("transform","translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

    var xScale = d3.scaleBand()
        .domain(d3.map(newData.map(function(d) { return d[0];} )) )
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
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(dimensions.height/2))
        .attr("y",15)
        .style("text-anchor", "middle")
        .text("Avg. # of Tracks (per Year)");

    var dots = svg.append("g")
        .selectAll("circle")
        .data(newData)
        .enter()
        .append("circle")
        .on("mouseover", function(){
            d3.select(this)
            .attr("fill", "pink")
        })
        .on("mouseout", function(){
            d3.select(this)
            .attr("fill", "black")
        })
        .attr("cx", d => xScale(d.key))
        .attr("cy", d => yScale( d.value))
        .attr("r", 6)
      .attr("fill", "black")

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
