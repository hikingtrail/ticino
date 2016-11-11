                                        //Inhoud van de kaart toevoegen:

// Achtergrond kaarten (met per basemap onze auteursnamen toegevoegd):
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | made by <a target="_blank" href="https://www.linkedin.com/in/bartleemeijer?trk=hp-identity-name">Bart Leemeijer</a> & <a target="_blank" href="http://bosmagrafiek.nl/">Bosma Grafiek</a>'}),
   
    transport = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {attribution: '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | made by <a target="_blank" href="https://www.linkedin.com/in/bartleemeijer?trk=hp-identity-name">Bart Leemeijer</a> & <a target="_blank" href="http://bosmagrafiek.nl/">Bosma Grafiek</a>'}),
    
    stamenTerrain =
    L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',      {attribution: '<a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | made by <a target="_blank" href="https://www.linkedin.com/in/bartleemeijer?trk=hp-identity-name">Bart Leemeijer</a> & <a target="_blank" href="http://bosmagrafiek.nl/">Bosma Grafiek</a>'}),
    
    stamenToner =
    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png',      {attribution: '<a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | made by <a target="_blank" href="https://www.linkedin.com/in/bartleemeijer?trk=hp-identity-name">Bart Leemeijer</a> & <a target="_blank" href="http://bosmagrafiek.nl/">Bosma Grafiek</a>'}),
    
    stamenWatercolor =
    L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',      {attribution: '<a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | made by <a target="_blank" href="https://www.linkedin.com/in/bartleemeijer?trk=hp-identity-name">Bart Leemeijer</a> & <a target="_blank" href="http://bosmagrafiek.nl/">Bosma Grafiek</a>'}),

// Variabelen van de routes:  
    Hoofdroute = L.geoJson(null, {style:stijlfunctie, onEachFeature:onEachFeature}),
    LokaleVariant = L.geoJson(null, {style:stijlfunctie, onEachFeature:onEachFeature}),
    Swiss02 = L.geoJson(null, {style:stijlfunctie, onEachFeature:onEachFeature}),
    Swiss07 = L.geoJson(null, {style:stijlfunctie, onEachFeature:onEachFeature}),
    ViaF = L.geoJson(null, {style:stijlfunctie, onEachFeature:onEachFeature}),
    Aanbevolen = L.geoJson(null, {style:stijlfunctie});



// Variabelen van de Points of Interest. 
// Voor elk soort POI / legenda-eenheid een afzonderlijke geoJson
// Sommige puntsymbolen (zoals Bruggen) worden hier ter plekke gedefinieerd,
// voor andere puntsymbolen worden de iconen zoals (var trainIcon = L.icon) verderop gemaakt.

    Stations = L.geoJson(null, {
                pointToLayer: function(feature, latlng){
                    return L.marker(latlng, {
                        icon: trainIcon
                        })
                    }
            });
            
    Bruggen = L.geoJson(null, {
                style: function(feature) {
                    return {
                        color: '#000000', 
                        fillColor: '#ffff00'
                        };
                    },
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng, {
                            radius: 5, 
                            fillOpacity: 0.85
                            });
                        }
                });

    FerryFunicular = L.geoJson(null, {
                style: function(feature) {
                    return {
                        color: '#000000', 
                        fillColor: '#ffffff'
                        };
                    },
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng, {
                            radius: 5, 
                            fillOpacity: 0.85
                            });
                        }, onEachFeature: ferryOnEachFeature
                });

// Hieronder staan de "voetstapjes" van "Navigation details"
    opmerkingen = L.geoJson(null, {
                pointToLayer: function(feature, latlng){
                    return L.marker(latlng, {
                        icon: opmerkingenIcoon
                        })
                    }, onEachFeature: footstepOnEachFeature
            });

//__________________________________________________________________________________________________________________    
                                        //Esri basemap toevoegen:

var Esri = L.esri.basemapLayer('Topographic');
var Imagery = L.esri.basemapLayer('Imagery');
//Esri Basemaps zijn onder anderen: Topographic, Imagery, NationalGeographic, Streets, Oceans, Gray, DarkGray, SchadedRelief

//__________________________________________________________________________________________________________________    
                                        //GeoJsons oproepen:
//Routes:
    jQuery.getJSON("GeoJson/E1_hoofdroute_italie.json", function (data) { Hoofdroute.addData(data)}),
    jQuery.getJSON("GeoJson/E1_lokale_varianten.json", function (data) { LokaleVariant.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route02.geojson", function (data) { Swiss02.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route07.geojson", function (data) { Swiss07.addData(data)}),
    jQuery.getJSON("GeoJson/Via Francigena.geojson", function (data) { ViaF.addData(data)}),
    jQuery.getJSON("GeoJson/Bosma_aanbevolen.geojson", function (data) { Aanbevolen.addData(data)});

//Points of Interest:
    jQuery.getJSON("GeoJson/POI_stations_langs_route.geojson", function (data) { Stations.addData(data)}),
    jQuery.getJSON("GeoJson/POI_brug_voor_voetgangers.geojson", function (data) { Bruggen.addData(data)}),
    jQuery.getJSON("GeoJson/POI_pont_en_trein.geojson", function (data) { FerryFunicular.addData(data)}),
    jQuery.getJSON("GeoJson/POI_navigation.geojson", function (data) { opmerkingen.addData(data)});

//__________________________________________________________________________________________________________________      
                                        //Maken van de kaart:
//Map + layers + eigenschappen 
// {layers: [osm, Hoofdroute] zorgt er voor dat de osm basemap en de Hoofdroute lijn direct al AAN staan
// .setView([45.654464,  9.164932], 10) bepaalt de plek op aarde en de zoomfactor van het begin-beeld

    var map = L.map('map', {layers: [osm, Hoofdroute], 
            minZoom: 9,
            maxBounds: [[46.160594, 8.1672119140625],   //NW punt
                        [44.991221, 8.1672119140625],   //ZW punt
                        [44.991221, 9.698682],          //ZO punt
                        [46.160594, 9.698682] ]         //NO punt
    }).setView([45.654464,  9.164932], 10);

//Met de regel hieronder voeg je de locatie button toe
L.control.locate({position: 'bottomright'}).addTo(map);


//__________________________________________________________________________________________________________________  
                                        //Popups voor lijnen en evt losse illustraties

// NB: De popups van de geoJson POI's worden hiermee NIET geregeld; dat gebeurt verderop in deze Script.js, bij de Functies

//Vernoem per popup je variabele en zet er '.bindPopup' achter om de popup te maken. Alles tussen de haakjes () is de inhoud van de popup; zichtbare tekst en evt url's.

//Routelijnen:
Hoofdroute.bindPopup('<b>German Site for E1:</b> <a target="_blank" href="https://e1.hiking-europe.eu/">Hiking Europe</a> <br> <b>All hiking trails in Europe:</b> <a target="_blank" href="http://waymarkedtrails.org/">Waymarked Trails</a>')

LokaleVariant.bindPopup('<a target="_blank" href="http://web.archive.org/web/20160405141619/http://www.enrosadira.it/e1/">Local E1 Alternatives</a>')

ViaF.bindPopup('<b>Site:</b> <br> <a target="_blank" href="http://www.dewegvandefranken.nl/">Via Francigena</a>')

Aanbevolen.bindPopup('Recommended bij BosmaGrafiek.nl for a part of the pilgrimage from the St. Gottthard pass to Roma')

Swiss02.bindPopup('<b>Site:</b> <a target="_blank" href="http://www.wanderland.ch/en/routes/route-02.html">Trans Swiss Trail</a> <br> <b>App:</b> Search for <i>Switzerland Mobility</i>')

Swiss07.bindPopup('<b>Site:</b> <a target="_blank" href="http://www.wanderland.ch/en/routes/route-07.html">Via Gottardo</a> <br> <b>App:</b> Search for <i>Switzerland Mobility</i>');



//__________________________________________________________________________________________________________________  
                                        //Lagen menu toevoegen

// Dit gebeurt d.m.v. de plugin Leaflet.StyledLayerControl

//Variabelen voor het lagen menu
// false = niet opengeklapt in het menu
// true = direct al wel opengeklapt in het menu


//basemaps = kaarten, dat zijn de achtergrondkaarten:
    var kaarten = [
                    {
                    groupName:  "Basemaps",
                    expanded: false,
                    layers: {
            "OSM Basic"         : osm,
            "OSM Transport"     : transport,
            "Stamen Terrain"    : stamenTerrain,
            "Stamen Toner"      : stamenToner,
            "Stamen Watercolor" : stamenWatercolor,
            "Esri Topographic"  : Esri,
            "Esri Imagery"      : Imagery
            }
        }];

//overlays = data, dat zijn de Routes en Punten:
    var data = [
                    {
                    groupName: "Hiking Trails",
                    expanded: true,
                    layers: {
            "E1 Hiking trail"           : Hoofdroute,
            "E1 Local alternatives"     : LokaleVariant,
            "Swiss 2: Trans Swiss Trail": Swiss02,
            "Swiss 7: Via Gottardo"     : Swiss07,
            "Via Francigena"            : ViaF,
            "Recommended"               : Aanbevolen
            }
        },
        
        
                    {
                    groupName: "Hiking Info",
                    expanded: true,
                    layers: {   
            "Pedestrian bridges"        : Bruggen,
            "Train stations"            : Stations,
            "Ferry and funicular"       : FerryFunicular
            }
        },
    
                    {
                    groupName: "Tourist Info",
                    expanded: true,
                    layers: {
            "Navigation details"        : opmerkingen,
        //  "Eat & sleep"               : horeca ??
            
            }
        }
    ];


//Uitklapmenu = het Lagen menu
// NB: Bij de variabele Control kan je maximaal 2 variabelen zichtbaar maken
    var uitklapmenu = L.Control.styledLayerControl(kaarten, data).addTo(map);

//NB: Alles wat je in deze Layer Control wilt hebben moet je boven deze functie L.Control.styledLayerControl plaatsen, anders gaat het mis.



//__________________________________________________________________________________________________________________ 
                                        //Titel 

var titel = L.control({position: 'topleft'});

titel.onAdd = function (map) {
    var titelicoon = L.DomUtil.create('titelicoon');
    titelicoon.innerHTML = '<div> <img style="width:90%; height:100%" src="images/E1_ticino_title_up01_rgb.png"/> </div>';
   return titelicoon;
};
titel.addTo(map);


//__________________________________________________________________________________________________________________ 
                                        //Legenda

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var legendaicoon = L.DomUtil.create('legendaicoon');
    legendaicoon.innerHTML = '<div> <img style="width:46%; height:50%"src="images/Legenda.png" /> </div>';
   return legendaicoon;
};
legend.addTo(map);


//__________________________________________________________________________________________________________________ 
                                        //Schaalbalk
// Schaalbalk wordt gemaakt d.m.v. de standaard Leaflet functie L.control.scale

// Staat nu UIT, haal om de schaalbalk weer aan te zetten de '//' weg voor .addTo(map)

var scale = L.control.scale({position: 'bottomright'})//.addTo(map); 

// Get the label, dit zijn de getallen van km en miles.
var metres = scale._getRoundNum(map.containerPointToLatLng([0, map.getSize().y / 2 ]).distanceTo( map.containerPointToLatLng([scale.options.maxWidth,map.getSize().y / 2 ])))
  label = metres < 1000 ? metres + ' m' : (metres / 1000) + ' km';


//__________________________________________________________________________________________________________________  
                                        //Functies:

//Functies
    function stijlfunctie(feature) {
        return {
            color       : feature.properties.color,
            opacity     : feature.properties.opacity,
            weight      : feature.properties.weight,
            dashArray   : feature.properties.dashArray,
            lineCap     : feature.properties.lineCap
        };
    };
//Met bovenstaande functie geef je aan welke eigenschappen (properties) je uit de GeoJson bestanden haalt. Zorg dus dat in deze bestanden de gegevens kloppen.

// De variabele-naam 'layer' hieronder heeft in dit geval betrekking op de routelijnen
    
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 10,
        color: '#58a2d8',
        opacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

// Hieronder reset je het oorspronkelijke uiterlijk van 1 van de lijnen (maakt niet uit welke).
// Ook alle andere lijnen worden vanzelf ge-reset, omdat bij function stijlfunctie(feature) is aangegeven dat voor ELKE lijn de properties uit de betreffende geoJson worden opgezocht.

function resetHighlight(e) {
    Aanbevolen.resetStyle(e.target);
}

// zoomToFeature maakt het geselecteerde Feature ineens beeldvullend. 
// Bijvoorbeeld: als je een lijn-feature van de hele E1 zou hebben dan zou de kaartweergave worden uitgezoomd tot het hele gebied vanaf de Noordkaap tot Sicilie.
// Dus: met beleid toepassen ;-)

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    })
}

// Hieronder wordt de inhoud van de popups (voor Points zoals Ferry en Funicular) ontleend aan de gegevens in de betreffende geoJson bestanden. Dat gebeurt d.m.v. Functions.

// Dit is dus iets ingewikkelder en krachtiger dan de oplossing bij de eenvoudige popups voor de routelijnen zoals dat hierboven in dit Script.js is gedefinieerd.

function ferryOnEachFeature(feature, layer){
    if (feature.properties.name) {
        layer.bindPopup(feature.properties.name + '<br>' + feature.properties.omschrijvi + '<br>' + feature.properties.website + '<br>' + '<br>' +  feature.properties.url_image);
    }
}

function footstepOnEachFeature(feature, layer){
    if (feature.properties.name) {
        layer.bindPopup(feature.properties.name + '<br>' + feature.properties.omschrijvi);
    }
}

//__________________________________________________________________________________________________________________ 
                                        //Icoontjes maken en definiëren
//Treinstations
var trainIcon = L.icon({
        iconUrl: 'images/Train.png',
        iconSize: [25,25],
        iconAnchor: [12,12] 
});
 
//Gevaarlijke brug
var gevaarIcoon = L.icon ({
        iconUrl: 'images/gevaar.png',
        iconSize: [25, 25],
        iconAnchor: [12,12]
     });

//Scenery
var cameraIcoon = L.icon ({
        iconUrl: 'images/Camera.png',
        iconSize: [25, 25],
        iconAnchor: [12,12]
     });

//Eat & Sleep
var horecaIcoon = L.icon ({
        iconUrl: 'images/kopje.png',
        iconSize: [25, 25],
        iconAnchor: [12,12]
     });

//Navigation Details
var opmerkingenIcoon = L.icon ({
        iconUrl: 'images/voetstap.png',
        iconSize: [25, 25],
        iconAnchor: [12,12]
     });
