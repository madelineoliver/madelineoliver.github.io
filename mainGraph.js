

d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (dataset){

    var dimensions = {
        width: 700,
        height: 300,
        margin:{
            top: 30,
            bottom: 80,
            right: 80,
            left: 30
        }
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom


    //sort data by year in ascending order
    dataset.sort(function(a,b) { return +a.Year - +b.Year })


  //  var xAccessor = d => +d.WorldwideSales


  //  var yAccessor = d => +d.Ranking

//    console.log(dataset)

//group data by year
var allGroup = Array.from(d3.group(dataset, d => d.Year), ([key, value]) => ({key, value}), )

//get years for dropdown
var keys = []
for(var i in allGroup)
       keys.push(allGroup[i].key)

//get albums for Each year
var  ranking = []
for(var i in allGroup)
        ranking.push(Array.from(d3.group( allGroup[i].value, d => d.Ranking ), ([key, value]) => ({key, value})))

//console.log( allGroup[0].value, d => d.Ranking )
//console.log(ranking)
//combine years and ranking into new data
var newData ={}
for (var i=0; i < keys.length; i++) {
        newData[keys[i]] = ranking[i];
}
var c = newData[1990]
console.log(c)
//console.log(c[0].value)

//console.log(newData)
//console.log(allGroup[0].value[0].Ranking)




    var svg4 = d3.select("#vis4")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .append("g")
        .attr("transform","translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

        var bounds = svg4.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, d => +d.WorldwideSales))
        .range([dimensions.margin.left ,dimensions.width - dimensions.margin.right])


    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, d => +d.Ranking))
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


        var initial = newData[1990]

        var bars = bounds
        .selectAll("bars")
        .data(initial)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("x", function(d, i) { return xScale(d.key); })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d, i) { return yScale(d.value.length); })
        .attr("height", function(d,i) { return dimensions.boundedHeight - yScale(d.value.length); })
        //.style("fill", function(d,i){return myColor(i)})
        .attr("transform", function(d, i) {
                return "translate(0," + yScale(d.Ranking) + ")";
            });


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
            .text(function (d, i) { return keys[i];})

    */
})
