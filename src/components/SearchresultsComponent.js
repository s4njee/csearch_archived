'use strict';

import React from 'react';
import Searchresult from './SearchresultComponent.js';
require('styles//Searchresults.css');

class SearchresultsComponent extends React.Component {
  render() {
      let results;
      if(this.props.results != {}){
          results = this.props.results.map(r => {
              return(
                  <Searchresult result={r} />
              );
      });}
    return (
      <div >
        {results}
      </div>
    );
  }
}

SearchresultsComponent.displayName = 'SearchresultsComponent';

// Uncomment properties you need
// SearchresultsComponent.propTypes = {};
// SearchresultsComponent.defaultProps = {};

export default SearchresultsComponent;
