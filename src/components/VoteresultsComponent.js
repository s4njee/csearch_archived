'use strict';

import React from 'react';
import Voteresult from './VoteresultComponent.js';
require('styles//Voteresults.css');


class VoteresultsComponent extends React.Component {
  render() {
      let results;
      if(this.props.results != {}){
          results = this.props.results.map(r => {
              return(

                  <Voteresult result={r} />
              );
      });}
    return (
      <div >
        {results}
      </div>
    );
  }
}

VoteresultsComponent.displayName = 'VoteresultsComponent';

// Uncomment properties you need
// VoteresultsComponent.propTypes = {};
// VoteresultsComponent.defaultProps = {};

export default VoteresultsComponent;
