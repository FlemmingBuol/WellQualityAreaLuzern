let geodata = [];
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

}
function setup() {
  createCanvas(900, 650);
  roadData = geodata.features
  noLoop();
  pixelDensity(3)
  angleMode(DEGREES);
  textAlign(CENTER)

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
    //console.log(strassen)

    noFill()

    beginShape();
    for (let j = 0; j < coordinates.length; j++) {
      let coord = coordinates[j]
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      vertex(x, y);
    }
    endShape();
    
     
    }

  }

