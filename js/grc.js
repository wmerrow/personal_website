//these vars are the dimensions of the svg canvas (in pixels)
    var w = 800;
    var h = 600;
    
//PADDING:
//padding will leave blank space between the chart area and the svg edges 
    var padding = [35, 25, 75, 100];
    
//SCALES:
//creates an ordinal scale for the x axis (years), sets range bands (in pixels)
    var xScale = d3.scale.linear().range([padding[3], w-padding[1]]);
//creates a linear scale for the y axis (# PACs), sets range (in pixels)
    var yScale = d3.scale.linear().range([h-padding[2]-padding[0],0]);

//AXES:
//creates a var for an x axis at the bottom of the chart
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(4).tickSize(-h+padding[0]+padding[2]).tickPadding(8);
//creates a var for a y axis at the left of the chart
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(4,"%").tickSize(-w+padding[1]+padding[3]).tickPadding(6);
    
//creates a var for an SVG
    var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
    
    
    d3.csv("data/grc_scatterplot_data.csv", function(data) {
   
    //sets x axis domain (ordinal scale)
        xScale.domain([0, d3.max(data, function(d){return +d.frl; })    ]);
        
    //sets y axis domain from 0 to max number of super pacs (linear scale) - expressed as an array of two numbers, 0 to max.
        yScale.domain([0, d3.max(data, function(d){return +d.national_math; })    ]);
    
    // //DRAW AXES:
    //     svg.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0," + (h - padding[2]) + ")")
    //         .call(xAxis);

    //     svg.append("g")
    //         .attr("class", "y axis")
    //         .attr("transform", "translate(" + padding[3] + "," + padding[0] + ")")
    //         .call(yAxis); 
        
    //     svg.append("text")
    //         .attr("x",w/2-15)
    //         .attr("y",h-padding[2]+50)
    //         .text("FRL Rate");
        
    //     svg.append("text")
    //       .attr("text-anchor", "middle")
    //         .attr("y", padding[3]/2-15)
    //         .attr("x",-h/2+20)
    //         .attr("transform", "rotate(-90)")
    //         .text("Math Percentile");
       
    //DRAW CIRCLES: 
        var circles = 
            svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle");
        
        circles
        //sets circle center using x and y
            .attr("cx",function(d){return xScale(d.frl);})
            .attr("cy",function(d){return padding[0]+yScale(d.national_math);})
        //sets radius (9 is scale factor)
            .attr("r", function(d){return Math.sqrt(d.enroll / Math.PI) / 9;})
          //start here:  .attr("fill", function(d){return rgb()})
            .attr("opacity",.15)
            ;

    } );