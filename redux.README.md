# Redux Integration

## Folder Structure

NOTE: components prefixed with `readonly` should not be touched.
They are generated and overriden by reacterminator from html.

- readonly-components/
  - [PathName.jsx] e.g. Login.jsx
  - App.jsx

- custom-components/
  - [PathName.jsx] e.g. Calendar.jsx
  - App.jsx

- action-type-constants/
  - [path-name/] e.g. login/
    - [action-type-constant-name.js] e.g. password.js
      ```
      export default const LOGIN_PASSWORD
      ```
    - readonly-index.js
  - readonly-index.js

- action-creators/
  - [path-name/] e.g. login/
    - [action-creator-name.js] e.g. change-password.js
      ```
      import actionTypeConstants from '../../action-type-constants/readonly-index';

      export default function changeInviteCode(event) {
        return {
          type: actionTypeConstants.login.password,
          value: event.target.value
        }
      }
      ```
    - readonly-index.js
  - readonly-index.js

- reducers/
  - [path-name/] e.g. login/
    - [reducer-name.js] e.g. password.js
      ```
      import actionTypeConstants from '../../action-type-constants/readonly-index';

      export default function password(state = '', action) {
        switch (action.type) {
          case actionTypeConstants.login.password:
            return action.value;
          default:
            return state;
        }
      }
      ```
    - readonly-index.js
  - readonly-index.js
- store.js

## Recognized HTML tags

NOTE: only tags with ids are recognized.

- input -> onChange, value
- input[type=radio] -> onChange, checked
- input[type=checkbox] -> onChange, checked
- input[type=submit] -> onClick
- form -> onSubmit
- select -> onChange, selected
- textarea -> onChange, value

## Data Attributes

- data-component-redux-state

  FROM:
  ```
  <div data-component-name="Unicorn" data-component-redux-state="login.password,login.username" />
  ```

  TO:
  ```
  class Unicorn extends React.Component {
    ...
  }

  const UnicornWithRedux = connect(
    (state) => (
      {
        'state.login.password': state.login.password
        'state.login.username': state.login.username
      }
    )
  )(Unicorn);

  export default UnicornWithRedux;
  ```

- data-component-redux-action

  FROM:
  ```
  <div data-component-name="Unicorn" data-component-redux-action="login.loginWithPassword,login.forgetPassword" />
  ```

  TO:
  ```
  import actionCreators from '../action-creators/index'

  class Unicorn extends React.Component {
    ...
  }

  const UnicornWithRedux = connect(
    null,
    {
      'action.login.loginWithPassword': actionCreators.login.loginWithPassword
      'action.login.forgetPassword': actionCreators.login.forgetPassword
    }
  )(Unicorn);

  export default UnicornWithRedux;
  ```
