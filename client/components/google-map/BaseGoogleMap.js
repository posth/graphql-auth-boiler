import React, { Component } from 'react';

import { withGoogleMap, GoogleMap } from 'react-google-maps';

const geolocation = (
    navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            }
        })
);

const BasicMap = withGoogleMap(props => (
    <GoogleMap
        zoom={props.zoom}
        center={props.center}
    />
));

export default class BaseGoogleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            center: {lat: 0, lng: 0}
        };
    }

    componentDidMount() {
        geolocation.getCurrentPosition((position) => {

            this.setState({
                zoom: 15,
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });

            // console.log(position.coords.latitude, position.coords.longitude);
        })
    }

    render() {
        return (
            <BasicMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                center={this.state.center}
                zoom={this.state.zoom}
            />
        );
    }
}