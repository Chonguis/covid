import * as React from 'react';
import { dojoRequire } from 'esri-loader';
import EsriLoader from 'esri-loader-react';
// export interface Props {
//     onMapViewCreated?: (mapView) => void;
// }

interface Props {
    municipalityData: {
        [key: string]: {
            name: string;
            number: number | string;
            percent: number | string;
        },
    }
}

interface State {
    loaded?: boolean
}
class EsriMap extends React.Component<Props, State> {
    mapContainer;
    mapView;
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    getVisualVariable = (number: number): string => {
        // let rainbow = Rainbow.color();
        // console.log(rainbow);
        // rainbow.setSpectrum("white", "red");
        // rainbow.setNumberRange(0, 25);
        // let rainbowResult = rainbow.colorAt(number);
        // console.log(rainbow, rainbowResult, "rainbow");
        // return rainbowResult;
        return "string";
    }

    getGradientColor = (percent: number):string => {
        let start_color = "#ffc0cb";
        let end_color = "#ff0000"
        // strip the leading # if it's there
        start_color = start_color.replace(/^\s*#|\s*$/g, '');
        end_color = end_color.replace(/^\s*#|\s*$/g, '');
     
        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if(start_color.length == 3){
          start_color = start_color.replace(/(.)/g, '$1$1');
        }
     
        if(end_color.length == 3){
          end_color = end_color.replace(/(.)/g, '$1$1');
        }
     
        // get colors
        var start_red = parseInt(start_color.substr(0, 2), 16),
            start_green = parseInt(start_color.substr(2, 2), 16),
            start_blue = parseInt(start_color.substr(4, 2), 16);
     
        var end_red = parseInt(end_color.substr(0, 2), 16),
            end_green = parseInt(end_color.substr(2, 2), 16),
            end_blue = parseInt(end_color.substr(4, 2), 16);
     
        // calculate new color
        var diff_red: string | number = end_red - start_red;
        var diff_green: string | number  = end_green - start_green;
        var diff_blue: string | number  = end_blue - start_blue;
     
        diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
        diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
        diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
     
        // ensure 2 digits by color
        if( diff_red.length == 1 ) diff_red = '0' + diff_red
        if( diff_green.length == 1 ) diff_green = '0' + diff_green
        if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue
     
        return '#' + diff_red + diff_green + diff_blue;
    };

    getGradient = (cases: number):string => {
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

    getUniqueValues = (): object[] => {
        if (this.props.municipalityData) {
            let uniqueValues = [];
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
        dojoRequire([
            'esri/Map', 
            'esri/views/MapView',
            'esri/widgets/Search',
            'esri/layers/FeatureLayer'], 
            (Map, MapView, Search, FeatureLayer) => {

            const searchWidget = new Search({
                view: this.mapView
            });

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

            this.mapView = new MapView({
                container: this.mapContainer,
                map: map,
            });

            this.mapView.ui.add(searchWidget, {
                position: "top-right",
                // index: 2
            });

            // this.props.onMapViewCreated(this.mapView);
        });
    }
    componentDidMount() {
        this.createMap();
    };
    render() {
        console.log(this.props.municipalityData, 'datadatadata');
        // you can omit options and it defaults to the latest version
        const options = {
            url: 'https://js.arcgis.com/4.5/'
            // url: '/arcgis_js_api/init.js'
        };
        return (
            <div style={{ height: '100%' }}>
                <EsriLoader options={options} ready={this.ready.bind(this)} />
                <div style={{ height: '100%' }} ref={node => this.mapContainer = node}></div>
            </div>
        );
    }
}

export default EsriMap;

