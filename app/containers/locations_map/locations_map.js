import React from 'react';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { fetchAsync, deleteAsync } from '../../reducers/locations/locations_actions';
import { selectLocation, deselectLocation } from '../../reducers/ui/map_page_actions';

function Location(props) {
  return (
    <div>
        {props.location.name}
    </div>
  );
}

function LocationDescription(props) {
  if (!props.location) return (<span></span>);

  return (
    <Card
      style={{
        position: 'absolute',
        width: '300px',
        right: '100px',
        top: '100px',
      }}
    >
      <CardTitle title={props.location.name} subtitle={props.location.address} />
      <CardText>{props.location.description}</CardText>
      <CardActions>
        <FlatButton label="Directions" />
        <FlatButton label="Call" />
      </CardActions>
    </Card>
  );
}

LocationDescription.propTypes = {
  location: React.PropTypes.object,
};

class LocationsMap extends React.Component {

  componentDidMount() {
    this.props.fetchAsync();
  }

  render() {
    return (
      <section style={{ height: '100%' }}>
        <LocationDescription location={this.props.selectedLocation} />
        <GoogleMap
          zoom={this.props.zoom}
          center={this.props.center}
          onChildClick={(key, childProps) => this.props.selectLocation(childProps.location)}
        >
            {this.props.locations.map((location) =>
              <Location
                key={location.id}
                lat={location.latitude}
                lng={location.longitude}
                location={location}
              />
            )}
        </GoogleMap>
      </section>
    );
  }
}

LocationsMap.propTypes = {
  fetchAsync: React.PropTypes.func.isRequired,
  locations: React.PropTypes.array.isRequired,
  selectedLocation: React.PropTypes.object,
  selectLocation: React.PropTypes.func.isRequired,
  zoom: React.PropTypes.number.isRequired,
  center: React.PropTypes.array.isRequired,
};

LocationsMap.defaultProps = {
  zoom: 9,
};

function getSelectedLocation(state) {
  if (!state.mapPage.selected) return undefined;
  return state.locations.entities.find(location => location.id === state.mapPage.selected);
}

function calculateCenter(selectedLocation) {
  if (!selectedLocation) return [59.938043, 30.337157];
  return [parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude)];
}

function mapStateToProps(state) {
  const selectedLocation = getSelectedLocation(state);
  return {
    locations: state.locations.entities,
    center: calculateCenter(selectedLocation),
    selectedLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAsync: () => dispatch(fetchAsync()),
    deleteAsync: (id) => dispatch(deleteAsync(id)),
    selectLocation: (location) => dispatch(selectLocation(location)),
    deselectLocation: () => dispatch(deselectLocation()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsMap);
