

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

//combine years and genre into new data
var newData ={}
for (var i=0; i < keys.length; i++) {
        newData[keys[i]] = ranking[i];
}

console.log(newData)


    //console.log(year_groups)
    //
    // //get Artist for Each year
    // var Art = []
    // for(var i in allGroup)
    //     Art.push(Array.from(d3.group( allGroup[i].value, d => d.Ranking ), ([key, value]) => ({key, value})))
    // console.log(Art)
    //
    // //combine years and genre into new data
    // var newData ={}
    // for (var i=0; i < keys.length; i++) {
    //     newData[keys[i]] = Art[i];
    // }
    // //console.log(newData)

    var svg = d3.select("#vis4")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .append("g")
        .attr("transform","translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

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




})
