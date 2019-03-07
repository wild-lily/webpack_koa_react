import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
class App extends Component{
	constructor() {
		super()
	}
	render(){
		return(
			<div>
                <Switch>
                    <Route path='/home' render={() => (<div>home</div>)}/>
                    <Route path='/login' render={() => (<div>login</div>)}/>
                </Switch>
			</div>
		)
	}
}
export default App;