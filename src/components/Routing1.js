import {BrowserRouter as Router,Link,NavLink,Route,Switch} from 'react-router-dom'
import Login from './Login'
import React, { Component } from 'react';
import Register1 from './Register1'
import Main from './Main';
import Main2 from './Main2'
class Routing extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register1} />
                    <Route exact path="/main" component={Main} />
                    <Route strict path="/main/:id" component={Main2} />
                    </Switch>

                </div>
            </Router>

        );
    }
}

export default Routing;