import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
state = {progress : 0}
setProgress = (prog)=>{
  this.setState({progress:prog})
}
data = {
    country : 'in',
    item_per_page : 9,
    // api : process.env.REACT_APP_API,
    api : process.env.REACT_APP_API_2,
    progress : this.setProgress
}

render() {
    return (
      <>
        <Router>
          <Navbar/>
          <LoadingBar
              color='#f11946'
              height={2}
              progress={this.state.progress}
            />
            <Switch>
              <Route exact path="/"><News data={this.data} cat='general'  /></Route>
              <Route exact path="/business"><News key='business' cat='business'  data={this.data} /></Route>
              <Route exact path="/entertainment"><News key='entertainment' cat='entertainment' data={this.data} /></Route>
              <Route exact path="/health"><News key='health' cat='health' data={this.data} /></Route>
              <Route exact path="/science"><News key='science' cat='science' data={this.data} /></Route>
              <Route exact path="/sports"><News key='sports' cat='sports' data={this.data} /></Route>
              <Route exact path="/technology"><News key='technology' cat='technology' data={this.data} /></Route>
              <Route exact path="/about"><News key='about' cat='about' data={this.data} /></Route>
          </Switch>
          </Router>

     </>
    )
  }
}