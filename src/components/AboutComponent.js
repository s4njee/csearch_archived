'use strict';

import React from 'react';

require('styles//About.css');

class AboutComponent extends React.Component {
  render() {
    return (
      <div className="about-component">
        This site is dynamically created using data from the govtrack.us API.
		<br />
		Created by s4njee
      </div>
    );
  }
}

AboutComponent.displayName = 'AboutComponent';

// Uncomment properties you need
// AboutComponent.propTypes = {};
// AboutComponent.defaultProps = {};

export default AboutComponent;
