import define1 from "./a2166040e5fb39a6@229.js";
import define2 from "./7764a40fe6b83ca1@427.js";
import define3 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["CPL VISITOR MAP INFO.csv",new URL("./files/8ee788bc1f4679daa8624660dbb744d7da88db7204f6d6b7681adaf4a8471b4edffb054bcccd72633b2c1feeddbe6c859717dc02bc5e43cd367c0b4cb41265dc",import.meta.url)],["CPL DATA.csv",new URL("./files/4d98332189caae4bb06a7f1469b8684240b7903d511a310c7c4eae5a1487d12926a78fd2e4dd2d37e362cc8286bb5419be8002b6087d0bddfa12e5e3396fb57f",import.meta.url)],["Chicago_neighborhoods_map.png",new URL("./files/9f3960b1505ef27888e5aec5c65c32e801238aa2dcf932e295c45b6eebd53fa54dae50ec0e1635bd31c122cb44724dac055bdb27f1b27ad000cb956b8883f1df",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Chicago Library Data Notebook

This notebook will provide information on the circulation and computer usage data in Chicago Libraries.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Map

The scatter plot below depicts a map of public libraries in Chicago. The libraries appear to be evenly scattered.
`
)});
  main.variable(observer("mapDataSource")).define("mapDataSource", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("CPL VISITOR MAP INFO.csv")
)});
  main.variable(observer("map")).define("map", ["d3","mapDataSource"], async function(d3,mapDataSource){return(
d3.csvParse(await mapDataSource.text())
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("Chicago_neighborhoods_map.png")
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`${await FileAttachment("Chicago_neighborhoods_map.png").image()}`
)});
  main.variable(observer()).define(["vl","map","width"], function(vl,map,width){return(
vl.markCircle({size: 75})
  .data(map)
  .encode(
  vl.longitude().fieldQ("LONGITUDE"),
  vl.latitude().fieldQ("LATITUDE")
)
.config({ view: { stroke: null } })
.width(width)
.render()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Circulation

The data below displays circulation data, which is essentially the number of times a book is checked out or renewed.
`
)});
  main.variable(observer("dataSource")).define("dataSource", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("CPL DATA.csv")
)});
  main.variable(observer("data")).define("data", ["d3","dataSource"], async function(d3,dataSource){return(
d3.csvParse(await dataSource.text())
)});
  main.variable(observer()).define(["vl","data"], function(vl,data){return(
vl.markCircle()
    .data(data)
    .encode(
      vl.x().fieldN("MONTH").sort("Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov"),
      vl.y().fieldN("LOCATION"),
      vl.color().fieldQ("CIRCULATION")
)
  .render()
)});
  main.variable(observer()).define(["vl","data"], function(vl,data)
{
  const brush = vl.selectInterval()
  
  const circles = vl.markCircle()
  .select(brush)  
  .encode(
      vl.y().fieldN("MONTH"),
      vl.x().fieldN("LOCATION"),
      vl.size().fieldQ("CIRCULATION"),
      vl.color().value("lightgray").if(brush, vl.color().fieldQ("CIRCULATION"))
)
  const bars = vl.markBar()
  .transform(vl.filter(brush))
  .encode(
    vl.x().fieldN("LOCATION"),
    vl.y().fieldN("MONTH"),
    vl.color().fieldQ("CIRCULATION")
    )
  return vl.vconcat(circles, bars)
  .data(data)
  .render()
 }
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Computer Sessions

The data below displays computer sessions.
`
)});
  main.variable(observer()).define(["vl","data"], function(vl,data){return(
vl.markCircle()
    .data(data)
    .encode(
  vl.x().fieldN("MONTH").sort("Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov"),
      vl.y().fieldN("LOCATION"),
      vl.color().fieldQ("COMPUTER SESSIONS")
)
  .render()
)});
  main.variable(observer()).define(["vl","data"], function(vl,data)
{
  const brush = vl.selectInterval()
  
  const circles = vl.markCircle()
  .select(brush)  
  .encode(
      vl.y().fieldN("MONTH"),
      vl.x().fieldN("LOCATION"),
      vl.size().fieldQ("COMPUTER SESSIONS"),
      vl.color().value("lightgray").if(brush, vl.color().fieldQ("COMPUTER SESSIONS"))
)
  const bars = vl.markBar()
  .transform(vl.filter(brush))
  .encode(
    vl.x().fieldN("LOCATION"),
    vl.y().fieldN("MONTH"),
    vl.color().fieldQ("COMPUTER SESSIONS")
    )
  return vl.vconcat(circles, bars)
  .data(data)
  .render()
 }
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Challenges

There were a few interactive elements I struggled achieving. The first was the mouse over of the map. I also originally planned to have an interactive menu where users can select the library and retrieve data in the print table and graph. However, I was unable to connect these. This way of selection can be a more efficient way to visualize data from specific Chicago Public Libraries.
`
)});
  main.variable(observer()).define(["vl","map","width"], function(vl,map,width)
{
const hover = vl.selectSingle().nearest(true).on("mousemove").fields("LOCATION").empty("none")

const points = vl.markCircle({ size: 75 })
.select(hover)
.encode(
    vl.longitude().fieldQ("LONGITUDE"),
    vl.latitude().fieldQ("LATITUDE")
)

return vl
  .data(map)
  .encode(
    vl.longitude().fieldQ("LONGITUDE").if(hover, vl.value(2)),
    vl.latitude().fieldQ("LATITUDE").if(hover, vl.value(1)),
  vl.detail().fieldN("LOCATION"),  
  vl.tooltip("LOCATION")
)
.layer(points)
.width(width)
.render()
  
}
);
  main.variable(observer("viewof library")).define("viewof library", ["select","getLibraries","data"], function(select,getLibraries,data){return(
select({options: getLibraries(data), title: "Choose library", multiple:true, size:10})
)});
  main.variable(observer("library")).define("library", ["Generators", "viewof library"], (G, _) => G.input(_));
  main.variable(observer()).define(["printTable","data"], function(printTable,data){return(
printTable(data.slice(0,5))
)});
  main.variable(observer()).define(["vl","data"], function(vl,data)
{
  const line = vl.markLine().data(data).encode(
    vl.y().fieldN('MONTH'),
    vl.x().fieldQ('CIRCULATION').scale({type: 'log'}).title('Circulation (log scale)'),
    vl.color().fieldN('LOCATION')

  );

  const point = vl.markCircle().data(data).encode(
    vl.y().fieldN('MONTH'),
    vl.x().fieldQ('CIRCULATION').scale({type: 'log'}),
    vl.color().fieldN('LOCATION')
  );
  
  return vl.layer(line,point).render();
}
);
  main.variable(observer("getLOCATIONS")).define("getLOCATIONS", function(){return(
function getLOCATIONS(table) { // select the country/region column
  let result = [];
  table.forEach(function(line) {
     const c = line["LOCATION"]
     if (!result.includes(c)) result.push(c) // earliest countries at the top
  });
  return result.sort();
}
)});
  main.variable(observer("getLibraries")).define("getLibraries", function(){return(
function getLibraries(table) {
  let result = [];
  table.forEach(function(line) {
     const c = line["LOCATION"]
     if (!result.includes(c)) result.push(c)
  });
  return result.sort();
}
)});
  const child1 = runtime.module(define1);
  main.import("printTable", child1);
  const child2 = runtime.module(define2);
  main.import("vl", child2);
  const child3 = runtime.module(define3);
  main.import("select", child3);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
