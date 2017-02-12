var axios = require('axios');
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Searchresults from './SearchresultsComponent.js';
import Voteresults from './VoteresultsComponent.js';
import About from './AboutComponent.js';
import { Nav, NavItem, NavLink } from 'reactstrap';
class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { value: '', searchresults: [], voteresults: [] , showAbout : false};
       // this._handleChange = () => this.handleChange();
        this.handleChange = this.handleChange.bind(this);
        this.handleLatestBills = this.handleLatestBills.bind(this);
        this.handleLatestHouseVotes = this.handleLatestHouseVotes.bind(this);
        this.handleLatestSenateVotes = this.handleLatestSenateVotes.bind(this);
        this.handleAbout = this.handleAbout.bind(this);
        this.handleHome = this.handleHome.bind(this);
       }
    handleChange(event){
        this.setState({value: event.target.value, voteresults:[], showAbout:false});
        var query = event.target.value;
        axios.get('https://www.govtrack.us/api/v2/bill?q='+query+'&order_by=-current_status_date')
        .then(function(response){
            this.setState({searchresults: response.data.objects});
        }.bind(this))
            .catch(function(error){
                alert(error);
            });
    }
    handleLatestBills(){
        this.setState({voteresults: [], showAbout:false});
        axios.get('https://www.govtrack.us/api/v2/bill?order_by=-current_status_date')
            .then(function(response){
            this.setState({searchresults: response.data.objects});
        }.bind(this))
            .catch(function(error){
                alert(error);
            });
    }
    handleLatestHouseVotes(){
        this.setState({searchresults: [], showAbout:false});
        axios.get('https://www.govtrack.us/api/v2/vote/?congress=115&chamber=house&order_by=-created')
            .then(function(response){
            this.setState({voteresults: response.data.objects});
        }.bind(this))
            .catch(function(error){
                alert(error);
            });
    }
    handleLatestSenateVotes(){
        this.setState({searchresults: [], showAbout:false});
        axios.get('https://www.govtrack.us/api/v2/vote/?congress=115&chamber=senate&order_by=-created')
            .then(function(response){
            this.setState({voteresults: response.data.objects});
        }.bind(this))
            .catch(function(error){
                alert(error);
            });
    }
    handleAbout(){
        this.setState({searchresults: []});
        this.setState({voteresults: []});
        this.setState({showAbout:true});
    }
    handleHome()
    {
        this.setState({searchresults: []});
        this.setState({voteresults: []});
        this.setState({showAbout:false});
    }
    render() {
        return (
        <div className="index">

            <Nav bar>
          <NavItem>
            <NavLink href="#" onClick={this.handleHome}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleLatestBills}>Latest Bills</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleLatestHouseVotes}>Latest House Votes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleLatestSenateVotes}>Latest Senate Votes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleAbout}>About</NavLink>
          </NavItem>
        </Nav>
        <div>
            <h1 className="header">CSearch</h1>
        </div>
        <div>
          <form>
            <input type="text" value={this.state.value} onChange={this.handleChange} size="35"/></form>
        </div>
        <Searchresults results={this.state.searchresults}/>
        <Voteresults results={this.state.voteresults}/>
            {this.state.showAbout?  <About /> : null}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
