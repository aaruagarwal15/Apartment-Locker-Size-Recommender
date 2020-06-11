"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var d3 = require("d3");
var axios_1 = require("axios");
/* ================================ FETCH PROPERTY DETAILS =============================== */
var propertyId = localStorage.getItem("Property_id");
var url = 'http://localhost:8080/fetch_details?P_id=';
url = url.concat(propertyId);
axios_1["default"].get(url).then(function (response) {
    //console.log(response.data);
    document.getElementById('p_name').innerHTML = response.data.p_name;
    document.getElementById('p_address').innerHTML = response.data.p_address;
})["catch"](function (error) {
    console.log(error);
});
/* ===============================  GRAPHS =================================== */
var $j = jQuery.noConflict();
$j(function () {
    $j('#dateRangeInput').daterangepicker({
        opens: 'left'
    }, function (start, end, label) {
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        dateChanged(start.format('DD-MM-YYYY'), end.format('DD-MM-YYYY'));
    });
});
function createGraph(graphID, heading) {
    var allgraphs = document.getElementById('allgraphs');
    var graph = document.createElement('div');
    graph.innerHTML = "<h4 align=\"center\"><b> " + heading + " LOCKER</b></h4>\n                        <div align=\"center\">\n                            <i class=\"fa fa-square\" style=\"font-size:18px;color:#1F77B4\"></i> Successful Packets &emsp;&emsp;\n                            <i class=\"fa fa-square\" style=\"font-size:18px;color:#FF7F0E\"></i> Failed Packets &emsp;&emsp;\n                            <p><b>T:</b> Tolerance % </p>\n                        </div>\n                        <div id=\"" + graphID + "\" style=\"overflow-x: scroll;\">\n                            <div class=\"tooltip\"></div>\n                        </div>";
    graph.classList.add('graph');
    allgraphs.appendChild(graph);
}
function getDate(date) {
    var year = date.split("-")[2];
    var month = date.split("-")[1];
    var day = date.split("-")[0];
    return new Date(year, month, day);
}
//DD-MM-YYYY
function checkDates(start, end, key) {
    var keydate = getDate(key).getTime();
    var startdate = getDate(start).getTime();
    var enddate = getDate(end).getTime();
    return (keydate >= startdate && keydate <= enddate);
}
function dateChanged(start, end) {
    document.getElementById('allgraphs').innerHTML = "";
    for (var i = 0; i < 6; i++) {
        var graphID = '#graph' + i.toString();
        var heading = response[i].size;
        var Ldata = response[i].lockerData;
        var groupData = __spreadArrays(Ldata).filter(function (data) {
            //console.log("DATA");
            //console.log(data);
            return checkDates(start, end, data.key);
        });
        console.log("GROUP");
        console.log(groupData);
        if (groupData.length > 0) {
            createGraph(graphID.slice(1), heading);
            updateGraph(groupData, graphID);
        }
    }
}
var response = [
    {
        size: "Lockertype1",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    },
    {
        size: "Lockertype2",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 40 },
                    { grpName: 'Failed packets', grpValue: 20 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    },
    {
        size: "Lockertype3",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 10 },
                    { grpName: 'Failed packets', grpValue: 20 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    },
    {
        size: "Lockertype4",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 23 },
                    { grpName: 'Failed packets', grpValue: 10 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    },
    {
        size: "Lockertype5",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 35 },
                    { grpName: 'Failed packets', grpValue: 25 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    },
    {
        size: "Lockertype6",
        lockerData: [
            {
                key: "06-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 2 },
                ],
                Tolerance: 48
            },
            {
                key: "07-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 30 },
                ],
                Tolerance: 48
            },
            {
                key: "08-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 14 },
                    { grpName: 'Failed packets', grpValue: 23 },
                ],
                Tolerance: 15
            },
            {
                key: "09-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 32 },
                    { grpName: 'Failed packets', grpValue: 19 },
                ],
                Tolerance: 25
            },
            {
                key: "10-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 55 },
                ],
                Tolerance: 26
            },
            {
                key: "11-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 41 },
                    { grpName: 'Failed packets', grpValue: 50 },
                ],
                Tolerance: 26
            },
            {
                key: "12-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 20 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 26
            },
            {
                key: "13-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 48
            },
            {
                key: "14-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 67
            },
            {
                key: "15-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 21
            },
            {
                key: "16-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 22
            },
            {
                key: "17-01-2019", values: [
                    { grpName: 'Successful packets', grpValue: 30 },
                    { grpName: 'Failed packets', grpValue: 5 },
                ],
                Tolerance: 16
            }
        ]
    }
];
function updateGraph(groupData, idName) {
    var baseWidth = 550;
    baseWidth = Math.max(baseWidth, baseWidth * (groupData.length / 6));
    var margin = { top: 20, right: 15, bottom: 20, left: 35 }, width = Math.max((600 * groupData.length) / 6, 600) - margin.left - margin.right, 
    //height = Math.min(window.innerHeight / 3, 300) - margin.top - margin.bottom;
    height = 300 - margin.top - margin.bottom;
    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    var x1 = d3.scaleBand().padding(0.08);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var xAxis = d3.axisBottom(x0) /*.tickFormat(d3.timeFormat("%V"))
     .tickValues(groupData.map(d => d.key)) */;
    var yAxis = d3.axisLeft(y).ticks(null, "s");
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    //const color = d3.scaleOrdinal().range(['#66c2a5','#fc8d62','#8da0cb']);
    var divTooltip = d3.select("div.tooltip");
    d3.select(idName).select("svg").remove();
    var svg = d3.select(idName).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var categoriesNames = groupData.map(function (d) { return (d.key + "  " + "T:" + d.Tolerance + "%"); });
    var rateNames = groupData[0].values.map(function (d) { console.log(d.grpName); return d.grpName; });
    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y.domain([0, 20 + d3.max(groupData, function (key) { return d3.max(key.values, function (d) { return d.grpValue; }); })]).nice();
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        //.attr("y", 3)
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", ".91em")
        .attr("fill", "#000")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("font-weight", "bold")
        .text("Number of packets");
    svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');
    var slice = svg.selectAll(".slice")
        .data(groupData)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) { return "translate(" + x0(d.key + "  " + "T:" + d.Tolerance + "%") + ",0)"; });
    slice.selectAll("rect")
        .data(function (d) { return d.values; })
        .enter().append("rect")
        .attr("width", "40")
        .attr("transform", function (d) {
        return "translate(" + x0(d.key) + ",0)";
    })
        .attr("class", "bar")
        .attr("x", function (d) {
        return x1(d.grpName);
    })
        .style("fill", function (d) { return color(d.grpName); })
        .attr("y", function (d) { return y(0); })
        .attr("height", function (d) { return height - y(0); })
        .on("mouseover", function (d) {
        console.log("in");
        //console.log(this);
        d3.select(this).style("fill", "#FC8D62")
            .select('rect').style('fill', 'white');
        divTooltip.style("left", d3.event.pageX - 10 + "px");
        divTooltip.style("top", d3.event.pageY + 10 + "px");
        divTooltip.style("display", "inline-block");
        divTooltip.style("opacity", "1");
        var s1 = d.grpName;
        var s2 = d.grpValue.toString();
        divTooltip.html(function (d) {
            console.log("TOOLTIP");
            var str = s1 + "<br>" + s2;
            return str;
        });
        d3.select(this)
            .attr("fill", "#FFFFFF")
            .style("opacity", "1")
            .style("stroke", "Black")
            .style("stroke-width", "2px")
            .style("stroke-opacity", "1");
    })
        .on("mouseout", function (d, i) {
        console.log("out");
        d3.select(this).style("fill", color(d.grpName)).style("stroke-width", "0px");
        divTooltip.style("display", "none");
    });
    slice.selectAll("rect")
        .transition()
        .delay(function (d) { return Math.random() * 1000; })
        .duration(1000)
        .attr("y", function (d) { return y(d.grpValue); })
        .attr("height", function (d) { return height - y(d.grpValue); });
}
var today = new Date();
var dd = today.getDate().toString().padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todaydate = dd + '-' + mm + '-' + yyyy;
dateChanged(todaydate, todaydate);
