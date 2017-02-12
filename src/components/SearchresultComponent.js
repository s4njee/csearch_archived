'use strict';

var fetchjson = require('fetch-jsonp');
import React from 'react';

require('styles//Searchresult.css');

class SearchresultComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {fulltexthtml: null, fulltextpdf: null, congresslink:'https://www.congress.gov/bill/115th-congress/'}
        var context = this;
       fetchjson('https:\/\/congress.api.sunlightfoundation.com/bills/search?congress=115&chamber='+this.props.result.current_chamber+'&number='+this.props.result.number).then(function(response){
            return response.json()
        }).then(function(json){
            var data = json
            if(data.results[0] && data.results[0].last_version && data.results[0].last_version.urls){
               var fullhtml=data.results[0].last_version.urls.html
               context.setState({fulltexthtml:fullhtml});
               context.setState({fulltextpdf: data.results[0].last_version.urls.pdf})
            }
        });
    }


                
    render() {
        let billtype, gpobt;
        if(this.props.result.bill_type == 'senate_resolution'){
            billtype = 'senate-resolution/';
            gpobt = 'sres';
        }
        else if(this.props.result.bill_type == 'house_resolution'){
            billtype = 'house-resolution/';
            gpobt = 'hres';
        }
        else if(this.props.result.bill_type == 'senate_bill'){
            billtype = 'senate-bill/';
            gpobt = 's';
        }
        else if(this.props.result.bill_type == 'house_bill'){
            billtype = 'house-bill/';
            gpobt = 'hr';
        }
        else if(this.props.result.bill_type == 'house_concurrent_resolution'){
            billtype = 'house-concurrent-resolution/';
            gpobt = 'hconres';
        }
        else if(this.props.result.bill_type == 'house_joint_resolution'){
            billtype = 'house-joint-resolution/';
            gpobt = 'hjres';
        }




    return (
      <div className="searchresult-component">
        
        {<a href={this.state.congresslink+billtype+this.props.result.number} target='_blank'><h4 className="title">{this.props.result.title}</h4></a>}

        {this.props.result.major_actions.map(function(item){
            var date = item[0].substring(17);
            var year = date.substring(1,5)
            var datesplit = date.split(',');
            var month = datesplit[1];
            var day = datesplit[2].substring(1);
            var text = item[2];
            return(
            <div className="text">
                <span>{month}/</span>
                <span>{day}/</span>
                <span>{year}</span>
                <div>{text}</div>
           </div>
            );
        }
)}
                <div className="text textlink">
        
          <a href={this.props.result.link} target='_blank'> GovTrack.us </a>
        <span>Full Text Links:</span>
        {this.state.fulltexthtml &&  <a href={this.state.fulltexthtml} target='_blank'> HTML </a>}
        {this.state.fulltextpdf &&  <a href={this.state.fulltextpdf} target='_blank'> PDF </a>}
        <a href={'http://api.fdsys.gov/link?collection=bills&billtype='+gpobt+'&billnum='+this.props.result.number+'&congress=115'} target="_blank">GPO PDF(if/when available)</a>
        <a href={'http://api.fdsys.gov/link?collection=bills&billtype='+gpobt+'&billnum='+this.props.result.number+'&congress=115&link-type=html'} target="_blank">GPO HTML(if/when available)</a>

</div>
    </div>
    );

  }
}

SearchresultComponent.displayName = 'SearchresultComponent';

// Uncomment properties you need
// SearchresultComponent.propTypes = {};
// SearchresultComponent.defaultProps = {};

export default SearchresultComponent;
