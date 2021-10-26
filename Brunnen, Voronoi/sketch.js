let geodata = [];
let voronoicoords = [];
let welldata = [];
let colorScale = d3

  .scaleSequential()
  //.range(0,1)
  .interpolator(d3.interpolatePlasma)
  .domain([90, 5000]);
let waterdata = [];
let roadData = [];
let colBrunnenfläche;
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
  waterdata = loadJSON('lucerne-water.geojson')

}
function setup() {
  createCanvas(900, 650);
  roadData = geodata.features
  noLoop();
  pixelDensity(4)
  angleMode(DEGREES);
  textAlign(CENTER);
  wells = welldata.features
  noFill()

  water = waterdata.features
}





function draw() {
  background(250);
  //Farben
  let brunnenPunkt = color('rgba(154, 99, 199,1)');
  let colGutesWasser = color('rgba(5, 148, 250,0.3)');
  let colSchlechtesWasser = color('rgba(227, 97, 16,0.3)');
  let colPrivatesWasser = color('rgba(0,0,0,0.1)')


  // Zum die Strasse Zeichnen
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
      stroke(200)
      let coord = coordinates[j]
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      vertex(x, y);
    }
    endShape();
  }

  //Um die Position der Brunnen zu Zeichnen + Export der Coordinaten für das Voronoi Netz
  for (let k = 0; k < wells.length; k++) {
    wellcoords = wells[k].GeoLocation
    let wasserquali = wells[k].Quality
    if (wasserquali == "WATER_QUALITY_GOOD"){
    wellx = map(wellcoords.longitude, bounds.left, bounds.right, 0, width)
    welly = map(wellcoords.latitude, bounds.top, bounds.bottom, 0, height)
    fill(brunnenPunkt)
    noStroke()
    circle(wellx, welly, 3)
    voronoicoords.push([
      wellx,
      welly
    ])}else{
      console.log("No")
    }
  }

  // Um das Voronoi Netz zu zeichnen und einzufärben
  let voronoi = d3.voronoi().extent([[0, 0], [width, height]])
  let d = voronoi(voronoicoords).polygons()
  noFill()
  for (z = 0; z < d.length; z++) {
    
    let polygoncoords = d[z]
    let wasserquali = wells[z].Quality
    if (wasserquali == "WATER_QUALITY_GOOD"){
    if (wasserquali == "WATER_QUALITY_BAD") {
      colBrunnenfläche = colSchlechtesWasser;
    }
    if (wasserquali == "WATER_QUALITY_GOOD") {
      colBrunnenfläche = colGutesWasser;
    }
    if (wasserquali == undefined) {
      colBrunnenfläche = colPrivatesWasser
    }
    stroke('red')
    strokeWeight(0.5)
    beginShape()
    for (ö = 0; ö < polygoncoords.length; ö++) {
      fill(colBrunnenfläche)
      let polyindidualx = polygoncoords[ö][0]
      let polyindidualy = polygoncoords[ö][1]
      vertex(polyindidualx, polyindidualy)
    }
    endShape()
  }}




  for (b = 0; b < water.length; b++) {
    blendMode(LIGHTEST);
    fill('WHITE')
    noStroke()
    let watergeo = water[b].geometry.coordinates[0][0]
    beginShape()
    for (n = 0; n < watergeo.length; n++) {
      let waterpoly = watergeo[n]


      let x = map(waterpoly[0], bounds.left, bounds.right, 0, width)
      let y = map(waterpoly[1], bounds.top, bounds.bottom, 0, height)

      



      vertex(x, y)
    }
    endShape()
  }

}







