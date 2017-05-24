import React, { Component } from 'react';

import { withGoogleMap, GoogleMap } from 'react-google-maps';

const BasicMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 45.492160, lng: -73.635443 }}
    />
));

export default class BaseGoogleMap extends Component {

    render() {
        return (
            <BasicMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        );
    }
}