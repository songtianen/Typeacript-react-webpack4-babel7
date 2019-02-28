import * as React from "react";
import { hot } from "react-hot-loader/root";

@hot
class App extends React.PureComponent {
  public render () {
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}
export default App
