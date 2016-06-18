import React from 'react';
import GoogleMap from 'google-map-react';

import { connect } from 'react-redux';
import { fetchAsync, deleteAsync } from '../../reducers/locations/locations_actions';
import { selectLocation, deselectLocation } from '../../reducers/ui/map_page_actions';

function Location(props) {
  return (
    <div>
        {props.location.name}
    </div>
  );
}

class LocationsMap extends React.Component {

  componentDidMount() {
    this.props.fetchAsync();
  }

  render() {
    return (
      <section style={{ height: '100%' }}>
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
  selectLocation: React.PropTypes.func.isRequired,
  zoom: React.PropTypes.number.isRequired,
  center: React.PropTypes.array.isRequired,
};

LocationsMap.defaultProps = {
  zoom: 9,
};

function calculateCenter(state) {
  if(!state.mapPage.selected) return [59.938043, 30.337157];

  const selectedLocation = state.locations.entities.find(location => location.id === state.mapPage.selected);
  return [parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude)];
}

function mapStateToProps(state) {
  return {
    locations: state.locations.entities,
    center: calculateCenter(state),
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
