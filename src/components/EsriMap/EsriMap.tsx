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
    }
}

interface State {
    loaded?: boolean
}
class EsriMap extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false
        }
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

        var renderer = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Nombre",
            defaultSymbol: { type: "simple-fill", color: "white" },  // autocasts as new SimpleFillSymbol()
            uniqueValueInfos: this.getUniqueValues(),
        };                                    

            const municipalitiesLayer = new FeatureLayer({
                url: 'https://services5.arcgis.com/tSRPsq29e3DI9PlH/arcgis/rest/services/limites_puerto_rico/FeatureServer/4',
                renderer: renderer,
            })

            const map = new Map({
                layers: [municipalitiesLayer],
            })

            const mapView = new MapView({
                container: "esrimap",
                map: map,
            });

            const searchWidget = new Search({
                view: mapView,
            });

            mapView.ui.add(searchWidget, {
                position: "top-right",
                // index: 2
            });

            let highlightSelect: any;
            mapView.whenLayerView(municipalitiesLayer).then(function(layerView: any) {

                mapView.on("click", (event: any) => {
                    mapView.hitTest(event).then( (response: any) => {
                        const feature = response.results[0].graphic;
                        if (highlightSelect) {
                            highlightSelect.remove();
                        }
                        highlightSelect = layerView.highlight(feature.attributes.OBJECTID);
                    });
                });


                // let query = municipalitiesLayer.createQuery();
                // query.outFields = ['*'];
                // query.where = "Nombre='San Juan'";
                // console.log('query', query);
                // // if a feature is already highlighted, then remove the highlight
                // municipalitiesLayer.queryFeatures(query).then((results: any) => {
                //     if (highlightSelect) {
                //         highlightSelect.remove();
                //     }
                //     console.log('results', results);
                //     highlightSelect = layerView.highlight(results.features[0].attributes.OBJECTID);

                // })
            });

            // this.props.onMapViewCreated(this.mapView);
        });
    }
    componentDidMount() {
        this.createMap();
    };
    render() {
        console.log(this.props.municipalityData, 'datadatadata');

        return (
            <div
                className="esrimap"
                id='esrimap'
            />
        );
    }
}

export default EsriMap;

