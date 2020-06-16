import * as d3 from 'd3'
import axios from 'axios'
import $ = require('jquery')
import { StratifyOperator } from 'd3';
import respData from './data'
/* ================================ FETCH PROPERTY DETAILS =============================== */
var propertyId = localStorage.getItem("PropertyId");
var url: string = 'http://localhost:8080/fetchPropertyDetails?propertyId=';
url = url.concat(propertyId);
axios.get(url).then(function (response) {
    //console.log(response.data);
    document.getElementById('propertyName').innerHTML = response.data.propertyName;
    document.getElementById('propertyAddress').innerHTML = response.data.propertyAddress;
}).catch(function (error) {
    console.log(error);
});

/* ===============================  GRAPHS =================================== */

var $j = jQuery.noConflict();
$j(function () {
    ($j('#dateRangeInput') as any).daterangepicker({
        opens: 'left'
    }, function (start, end, label) {
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        dateChanged(start.format('DD-MM-YYYY'), end.format('DD-MM-YYYY'));
    });
});


interface subDataType {
    grpName: string,    //Successful and failed packets
    grpValue: number    //number of packets
}
interface dataType {
    key: string,        //Date
    values: subDataType[]
    Tolerance: Number
}
interface finalDataType {
    size: string     //LOCKER SIZE
    lockerData: dataType[]
}

function createGraph(graphID, heading) {
    let allgraphs: HTMLElement = document.getElementById('allgraphs');
    let graph: HTMLElement = document.createElement('div');
    graph.innerHTML = `<h4 align="center"><b> ${heading} LOCKER</b></h4>
                        <div align="center">
                            <i class="fa fa-square" style="font-size:18px;color:#1F77B4"></i> Successful Packets &emsp;&emsp;
                            <i class="fa fa-square" style="font-size:18px;color:#FF7F0E"></i> Failed Packets &emsp;&emsp;
                            <p><b>T:</b> Tolerance % </p>
                        </div>
                        <div id="${graphID}" style="overflow-x: scroll;">
                            <div class="tooltip"></div>
                        </div>`;
    graph.classList.add('graph');
    allgraphs.appendChild(graph);
}

function getDate(date) {
    let year: number = date.split("-")[2];
    let month: number = date.split("-")[1];
    let day: number = date.split("-")[0];
    return new Date(year, month, day);
}

function createDate(date, format = 1) {
    var dd = date.getDate().toString().padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    let result: string = "";
    if (format === 1) {
        result = dd + '-' + mm + '-' + yyyy;
    }
    else if (format === 2) {
        result = mm + '/' + dd + '/' + yyyy;
    }
    return result;
}

//DD-MM-YYYY
function checkDates(start: string, end, key) {
    let keydate = getDate(key).getTime();
    let startdate = getDate(start).getTime();
    let enddate = getDate(end).getTime();
    return (keydate >= startdate && keydate <= enddate);
}

function convertData(resp: any) {

    response = [];
    resp.forEach(e => {
        let obj: finalDataType = {
            size: "0",
            lockerData: []
        };
        obj["size"] = e.size;
        let ldata: dataType[] = [];
        e.lockerData.forEach(data => {
            const tolerance: number = data.values[2].grpValue;
            data.values = data.values.slice(0, -1);
            data["tolerance"] = tolerance;
            let d: dataType = {
                values: [],
                key: "0",
                Tolerance: 0
            };
            d["values"] = data.values;
            d["Tolerance"] = tolerance;
            d["key"] = data.key;
            ldata.push(d);
        })
        obj["lockerData"] = ldata;
        response.push(obj);
    });
    console.log(resp);
}

let response: finalDataType[] = [];

function dateChanged(start, end) {

    console.log("[main3.ts] dateChanged");
    document.getElementById('allgraphs').innerHTML = "";

    //axios request

    let resp = new respData();
    let mydata = [...resp.getData()];
    convertData(mydata);

    for (let i: number = 0; i < 6; i++) {
        let graphID = '#graph' + i.toString();
        let heading: string = response[i].size;
        let Ldata: dataType[] = response[i].lockerData;
        let groupData: dataType[] = [...Ldata].filter((data) => {
            return checkDates(start, end, data.key);
        });
        if (groupData.length > 0) {
            createGraph(graphID.slice(1), heading);
            updateGraph(groupData, graphID);
        }

    }
}




function updateGraph(groupData: dataType[], idName: string) {

    let baseWidth: number = 550;
    baseWidth = Math.max(baseWidth, baseWidth * (groupData.length / 6));

    let margin = { top: 20, right: 15, bottom: 20, left: 35 },
        width = Math.max((600 * groupData.length) / 6, 600) - margin.left - margin.right,
        //height = Math.min(window.innerHeight / 3, 300) - margin.top - margin.bottom;
        height = 300 - margin.top - margin.bottom;

    let x0: any = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    let x1 = d3.scaleBand().padding(0.08);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let xAxis = d3.axisBottom(x0)/*.tickFormat(d3.timeFormat("%V"))
     .tickValues(groupData.map(d => d.key)) */;

    let yAxis = d3.axisLeft(y).ticks(null, "s");

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    //const color = d3.scaleOrdinal().range(['#66c2a5','#fc8d62','#8da0cb']);

    var divTooltip = d3.select("div.tooltip")

    d3.select(idName).select("svg").remove();
    let svg = d3.select(idName).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let categoriesNames = groupData.map(function (d) { return (d.key + "  " + "T:" + d.Tolerance + "%") });
    let rateNames = groupData[0].values.map(function (d) { console.log(d.grpName); return d.grpName; });

    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y.domain([0, 20 + d3.max(groupData, function (key) { return d3.max(key.values, function (d) { return d.grpValue; }); })]).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

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

    let slice: any = svg.selectAll(".slice")
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
        .style("fill", function (d) { return color(d.grpName) })
        .attr("y", function (d) { return y(0); })
        .attr("height", function (d) { return height - y(0); })
        .on("mouseover", function (d) {
            console.log("in");
            //console.log(this);
            d3.select(this)
                .select('rect').style('fill', 'white');
            divTooltip.style("left", d3.event.pageX - 10 + "px")
            divTooltip.style("top", d3.event.pageY + 10 + "px")
            divTooltip.style("display", "inline-block")
            divTooltip.style("opacity", "1");

            let s1: string = d.grpName;
            let s2: string = d.grpValue.toString();
            divTooltip.html(function (d) {
                console.log("TOOLTIP")
                let str: string = s1 + "<br>" + s2;
                return str;
            })
            d3.select(this)
                .attr("fill", "#FFFFFF")
                .style("opacity", "1")
                .style("stroke", "Black")
                .style("stroke-width", "2px")
                .style("stroke-opacity", "1");
        })
        .on("mouseout", function (d, i) {
            console.log("out")
            d3.select(this).style("fill", color(d.grpName)).style("stroke-width", "0px");

            divTooltip.style("display", "none")

        });


    slice.selectAll("rect")
        .transition()
        .delay(function (d) { return Math.random() * 1000; })
        .duration(1000)
        .attr("y", function (d) { return y(d.grpValue); })
        .attr("height", function (d) { return height - y(d.grpValue); });


}
let today: Date = new Date();
let dateStart: Date = new Date(Date.now() - (7 * 864e5));
let dateEnd: Date = new Date(Date.now() - 864e5);
(<HTMLInputElement>document.getElementById('dateRangeInput')).value = createDate(dateStart, 2) + ' - ' + createDate(dateEnd, 2);
dateChanged(createDate(dateStart), createDate(dateEnd));