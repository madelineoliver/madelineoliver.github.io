d3.csv("Top 10 Albums By Year Album Length-Sheet1.csv").then(function (data){

    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: size,
            height: size/3,
            margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    })

    var svg = d3.select(#vis1)
        .style("width", dimensions.width)
        .style("height", dimensions.height)

})
