# reacterminator

### Data Attributes internally used by Poetic
- data-component-path

  ```
  <div
    data-component-name="Login"
    data-component-path="login">
  </div>
  ```

  a App.jsx file and a container LoginContainer.jsx file will be generated.

  ```
  // App.jsx
  import React from 'react';
  import LoginContainer from './LoginContainer';

  export default class App extends React.Component {
    render () {
      return (
        <div>
          <LoginContainer/>
        </div>
      )
    }
  }

  // LoginContainer.jsx
  import React from 'react';
  import {connect} from 'param-store';
  import Login from './Login';

  class LoginContainer extends React.Component {
    render () {
      const style = {position: 'absolute'};
      if (this.props.currentParams.path !== 'login') {
        return null;
      }

      return (
        <div style={style}>
          <Login {...this.props}/>
        </div>
      );
    }
  }

  export default connect(LoginContainer, 'path');
  ```
