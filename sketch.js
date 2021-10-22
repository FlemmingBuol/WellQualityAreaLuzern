let geodata = [];
let voronoicoords = [];
let welldata = [];
let colorScale = d3
  .scaleSequential()
  //.range(0,1)
  .interpolator(d3.interpolatePlasma)
  .domain([90, 5000]);

let roadData = [];
let strassenNames = [];
let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};
function preload() {
  geodata = loadJSON('lucerne-roads.geojson')
  welldata = loadJSON('luzern-brunnen.json')

}
function setup() {
  createCanvas(900, 650);
  roadData = geodata.features
  noLoop();
  pixelDensity(3)
  angleMode(DEGREES);
  textAlign(CENTER);
  wells = welldata.features
}

function draw() {
  background(250);


  let parseLength = roadData.length
  for (let i = 0; i < parseLength; i++) {
    let roadObject = roadData[i];
    let geometry = roadObject.geometry;
    let coordinates = geometry.coordinates;
    let strassenNames = roadObject.properties
    let strassen = strassenNames.name


    noFill()

    beginShape();
    for (let j = 0; j < coordinates.length; j++) {
      stroke(240)
      let coord = coordinates[j]
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      vertex(x, y);
    }
    endShape();


  }
  for (let k = 0; k < wells.length; k++) {

    wellcoords = wells[k].GeoLocation
    wellx = map(wellcoords.longitude, bounds.left, bounds.right, 0, width)
    welly = map(wellcoords.latitude, bounds.top, bounds.bottom, 0, height)

    //console.log(wellx,welly)
    fill('blue')
    circle(wellx, welly, 3)

      voronoicoords.push([
         wellx,
         welly
      ])



  }

 let voronoi = d3.voronoi().extent([[0, 0], [width, height]])
 let d = voronoi(voronoicoords).polygons()
 
 noFill()

for (z = 0; z<d.length;z++){
let polygoncoords = d[z]
console.log(polygoncoords)


stroke('red')
  strokeWeight(0.5)
beginShape()
for (ö = 0; ö<polygoncoords.length; ö++){
  let polyindidualx= polygoncoords[ö][0]
  let polyindidualy= polygoncoords[ö][1]
  vertex(polyindidualx,polyindidualy)

}
endShape()



}




}




