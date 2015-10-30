var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([5,100]).range([5,120]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){


    /*var year = 1900;
    rows.sort(function(a,b){
        return b[year] - a[year];
    });
    var top5 = rows.slice(0,5);
    draw(top5, year);*/



    //TODO: fill out this function
    d3.selectAll('.btn-group .year').on('click',function(){



        var year = d3.select(this).attr('id');



        if (year=='year-1900')
        {   var year = 1900;
            rows.sort(function(a,b){
                return b[year] - a[year];
            });
            var top5 = rows.slice(0,5);
            draw(top5, year);}

        else if (year =='year-1960'){
            var year = 1960;
            rows.sort(function(a,b){
                return b[year] - a[year];
            });
            var top5 = rows.slice(0,5);
            draw(top5, year);
        }
        else if(year=='year-2012'){
            var year = 2012;
            rows.sort(function(a,b){
                return b[year] - a[year];
            });
            var top5 = rows.slice(0,5);
            draw(top5, year);

        }
        console.log("Show top 5 medal count for: " + year);
        console.log(top5);
    });
}





function draw(rows, year){
    //TODO: Complete drawing function, accounting for enter, exit, update
    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on
    //update selection
    var nodes = canvas.selectAll('.country')
        .data(rows, function(d){
            return d.country;
        });


    //enter set
    var nodesEnter = nodes.enter()
        .append('g')
        .attr('class','country')
        .attr('transform','translate('+width/2+','+height/2+')');
        /*.attr('transform',function(d,index){
            return width/5*index;
        });*/

    nodesEnter
        .append('circle')
        .attr('r',0)
        .style('fill','rgba(80,80,80,.1)')
        .style('stroke','rgb(50,50,50)')
        .style('stroke-width','1px');


    nodesEnter
        .append('text')
        .text(function(d){return d.country});


    //exit
    nodes.exit().remove();

// update set
    nodes
        .transition()
        .select('circle')
        .attr('r',function(d){return scaleR(d[year])})





}

function parse(row){
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    };
}