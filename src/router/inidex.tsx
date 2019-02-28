import * as React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import * as Loadable from "react-loadable";
import App from "../app";
import Home from "../components/Home/inidex"
const Loading = () => {
  return (
    <div>Loging。。。。。。。</div>
  )
}
const Hello = Loadable({
  loader: () =>
    import(/*webpackChunkName: "hello"*/ "../components/Test/index"),
  loading: Loading,
});

export default class IRouter extends React.Component {
  public render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/hello" component={Hello} />
          </Switch>
        </App>
      </Router>
    );
  }
}
