import React, {Component} from 'react';
import './App.css';
import HomePanel from "./components/Home/HomePanel";
import TopAttractionsDisplay from "./components/TopAttractions/TopAttractionsDisplay";
import EventsDisplay from "./components/EventActivities/EventsDisplay";
import HotelsDisplay from "./components/Hotels/HotelsDisplay";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchTabs : {
                home : true,
                topAttraction : false,
                events : false,
                hotels : false
            }
        };

        //  Method/ function Binding
        this.handleNavigationBar = this.handleNavigationBar.bind(this);
    }

    handleNavigationBar(e){
        if(e.target.name == "home"){
            this.setState({
                switchTabs : {
                    home : true,
                    topAttraction : false,
                    events : false,
                    hotels : false
                }
            })
        } else if( e.target.name == "topAttraction"){
            this.setState({
                switchTabs : {
                    home : false,
                    topAttraction : true,
                    events : false,
                    hotels : false
                }
            })
        } else if( e.target.name == "events"){
            this.setState({
                switchTabs : {
                    home : false,
                    topAttraction : false,
                    events : true,
                    hotels : false
                }
            })
        } else if( e.target.name == "hotels"){
            this.setState({
                switchTabs : {
                    home : false,
                    topAttraction : false,
                    events : false,
                    hotels : true
                }
            })
        }
    }

    render() {
        return (
            <div className="container">
                <header className="blog-header py-3">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                        <div className="text-center mx-auto">
                            <br/>
                            <h1 className="text-dark display-4"><i>Travel Sri Lanka </i></h1>
                            <p className="lead text-muted"> Student Reg.no : <b> IT17184304 </b> &emsp;&emsp;&emsp;
                                Student Name : <b> Jayagoda N.M.</b>
                            </p>
                            <p className="lead">
                                Software Engineering Weekday Batch - Y3S1.20.1
                            </p>
                        </div>
                    </div>
                </header>
                <br/>

                {/* Nav Bar*/}
                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-lg-start">
                        <button type="button" className="btn btn-outline-light mx-2" name="home" onClick={this.handleNavigationBar}
                                style={this.state.switchTabs.home ? {backgroundColor: "#ff1d8e"} : null} > Home </button>
                        <button type="button" className="btn btn-outline-light mx-2" name="topAttraction" onClick={this.handleNavigationBar}
                                style={this.state.switchTabs.topAttraction ? {backgroundColor: "#ff1d8e"} : null} > Top Attractions </button>
                        <button type="button" className="btn btn-outline-light mx-2" name="events" onClick={this.handleNavigationBar}
                                style={this.state.switchTabs.events ? {backgroundColor: "#ff1d8e"} : null} > Activities, Events and Festivals </button>
                        <button type="button" className="btn btn-outline-light mx-2" name="hotels" onClick={this.handleNavigationBar}
                                style={this.state.switchTabs.hotels ? {backgroundColor: "#ff1d8e"} : null} > Hotels and Other Accommodation </button>
                    </nav>
                </div>

                {/* Main Body */}
                <div className="card">
                    { this.state.switchTabs.home ? <HomePanel /> : this.state.switchTabs.topAttraction ? <TopAttractionsDisplay /> : this.state.switchTabs.events ?
                        <EventsDisplay/>  : this.state.switchTabs.hotels ? <HotelsDisplay /> : null }
                </div>
                <div>
                    <br/>
                </div>
            </div>
        );
    }
}

export default App;