import * as React from 'react';
import { loadModules, loadCss } from 'esri-loader';
import './EsriMap.css';

loadCss();

interface Props {
    municipalityData: {
        [key: string]: {
            municipality: string;
            number: number | string;
            percent: number | string;
        },
    },
    renderer: string;
}

interface State {
    loaded?: boolean,
    selectedMunicipality: {
        municipality: string;
        number: number | string;
        percent: number | string;
    };
}
class EsriMap extends React.Component<Props, State> {
    municipalitiesLayer: any;
    municipalitiesPoints: any; 
    rendererSimpleFill: any;
    rendererSimpleFillBlank: any;

    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            selectedMunicipality: {
                municipality: "",
                number: "",
                percent: "",
            },
        }
    }

    setSelected = (municipality: string):void => {
        console.log('municipality', municipality);
        this.setState({
            selectedMunicipality: this.props.municipalityData[municipality],
        })
    }

    getGradient = (cases: number | string):string | void => {
        if(typeof cases !== "string"){
            if (cases > 25){
                return "#FE0000";
            } else if (cases > 20){
                return "#FE3F02";
            } else if (cases > 15){
                return "#F97C00";
            } else if (cases > 10){
                return "#FB9E00";
            } else if (cases > 5){
                return "#FBD400";
            } else if (cases >= 1){
                return "#FDFD04";
            } else {
                return "#FFFFFF";
            }
        }
    }

    getSize = (cases: number | string):number | void => {
        if(typeof cases !== "string"){
            if (cases > 25){
                return 30;
            } else if (cases > 20){
                return 23;
            } else if (cases > 15){
                return 20;
            } else if (cases > 10){
                return 17;
            } else if (cases > 5){
                return 14;
            } else if (cases >= 1){
                return 11;
            } else {
                return 0;
            }
        }
    }

    getUniqueValues = () => {
        if (this.props.municipalityData) {
            let uniqueValues: object[] = [];
            Object.keys(this.props.municipalityData).forEach(municipality => {
                uniqueValues.push({
                    // All features with value of "North" will be blue
                    value: municipality,
                    symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color: this.getGradient(this.props.municipalityData[municipality].number),
                    },
                });
            });
            console.log(uniqueValues.length)
            return uniqueValues;
        }
    }

    getUniqueValuesPoints = () => {
        if (this.props.municipalityData) {
            let uniqueValues: object[] = [];
            Object.keys(this.props.municipalityData).forEach(municipality => {
                uniqueValues.push({
                    // All features with value of "North" will be blue
                    value: municipality,
                    symbol: {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        size: this.getSize(this.props.municipalityData[municipality].number),
                        color: [255, 0, 0, .5],
                      }
                });
            });
            console.log(uniqueValues.length)
            return uniqueValues;
        }
    }

    ready = ():void => {
        this.setState({
            loaded: true
        });
    }
    createMap = ():void => {
      loadModules([
            'esri/Map', 
            'esri/views/MapView',
            'esri/widgets/Search',
            'esri/layers/FeatureLayer']).then(([
              Map, MapView, Search, FeatureLayer
            ]) => {

            // {"renderer":{"type":"uniqueValue","field1":"Nombre","defaultSymbol":null,
            // "uniqueValueInfos":[
            // {"value":"Adjuntas","symbol":{"color":[255,251,0,255],
                // "outline":{"color":[26,26,26,255],"width":0.75,"type":"esriSLS",
                // "style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"},
                // "label":"Adjuntas"}

        const rendererSimpleFill = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Nombre",
            defaultSymbol: { type: "simple-fill", color: "white" },  // autocasts as new SimpleFillSymbol()
            uniqueValueInfos: this.getUniqueValues(),
        };      
        this.rendererSimpleFill = rendererSimpleFill;    

        const rendererSimpleFillBlank = {
            type: "simple",
            symbol: { type: "simple-fill", color: "white" },
        }
        this.rendererSimpleFillBlank = rendererSimpleFillBlank;
        
        const rendererPoint = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Nombre",
            uniqueValueInfos: this.getUniqueValuesPoints(),
        }

            const municipalitiesLayer = new FeatureLayer({
                url: 'https://services5.arcgis.com/tSRPsq29e3DI9PlH/arcgis/rest/services/limites_puerto_rico/FeatureServer/4',
                renderer: rendererSimpleFill,
            })
            this.municipalitiesLayer = municipalitiesLayer;    

            const municipalitiesPoints = new FeatureLayer({
                url: 'https://services5.arcgis.com/tSRPsq29e3DI9PlH/arcgis/rest/services/limites_puerto_rico/FeatureServer/4',
                renderer: rendererPoint,
                visible: false,
            })
            this.municipalitiesPoints = municipalitiesPoints;    

            const map = new Map({});

            const mapView = new MapView({
                container: "esrimap",
                map: map,
            });

            const searchWidget = new Search({
                view: mapView,
            });

            mapView.ui.add(searchWidget, {
                position: "top-right",
            });

            map.addMany([municipalitiesLayer, municipalitiesPoints]);

            let highlightSelect: any;
            const component = this;
            mapView.whenLayerView(municipalitiesLayer).then(function(layerView: any) {

                mapView.on("click", (event: any) => {
                    mapView.hitTest(event).then( (response: any) => {
                        if (response.results[0]) {
                            const feature = response.results[0].graphic;
                            if (highlightSelect) {
                                highlightSelect.remove();
                            }
                            highlightSelect = layerView.highlight(feature.attributes.OBJECTID);
                            component.setSelected(feature.attributes.Nombre);
                        } else {
                            alert("No graphic clicked");
                        }
                    });
                });
            });

        });
    }
    componentDidMount() {
        this.createMap();
    };
    render() {
        console.log(this.props.renderer, 'renderer');

        if (this.municipalitiesPoints && this.municipalitiesLayer){
            if (this.props.renderer == "colors") {
                this.municipalitiesPoints.visible = false;
                this.municipalitiesLayer.renderer = this.rendererSimpleFill;
            } else if (this.props.renderer == "points") {
                this.municipalitiesLayer.renderer = this.rendererSimpleFillBlank;
                this.municipalitiesPoints.visible = true;
                console.log(this.municipalitiesPoints, 'points')
            }
        }

        return (
            <div>
                <div className="selectedMunicipality">
                    <h1>{this.state.selectedMunicipality.municipality}</h1>
                    <div className="selectedNumbers">
                        <div>
                            <h2 id="cases">{this.state.selectedMunicipality.number}</h2>
                            <label htmlFor="cases">Cases</label>
                        </div>
                        <div>                    
                            <h2 id="percent">{this.state.selectedMunicipality.percent + "%"}</h2>
                            <label htmlFor="percent">Percent</label>
                        </div>
                    </div>
                </div>
                <div
                    className="esrimap"
                    id='esrimap'
                />
            </div>
        );
    }
}

export default EsriMap;

