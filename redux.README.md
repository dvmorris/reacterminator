# Redux Integration

## Folder Structure

NOTE: if a file starts with `//`,
it is not no going to be managed by reacterminator

- components/
  - [PathName.jsx] e.g. Calendar.jsx
  - App.jsx

- action-type-constants/
  - [path-name/] e.g. login/
    - [action-type-constant-name.js] e.g. change-password.js
      ```
      export default const 'LOGIN_CHANGE_PASSWORD'
      ```
    - index.js
  - index.js

- action-creators/
  - [path-name/] e.g. login/
    - [action-creator-name.js] e.g. change-password.js
      ```
      import actionTypeConstants from '../../action-type-constants/index';

      export default function changeInviteCode(event) {
        return {
          type: actionTypeConstants.login.changePassword,
          value: event.target.value
        }
      }
      ```
    - index.js
  - index.js

- reducers/
  - [path-name/] e.g. login/
    - [reducer-name.js] e.g. password.js
      ```
      import actionTypeConstants from '../../action-type-constants/index';

      export default function password(state = '', action) {
        switch (action.type) {
          case actionTypeConstants.login.changePassword:
            return action.value;
          default:
            return state;
        }
      }
      ```
    - index.js
  - index.js
- store.js

## Recognized HTML tags

NOTE: only tags with ids are recognized.

- button -> onClick
- input[type=text] and other text-like inputs -> onChange, value
- input[type=radio] -> onChange, checked
- input[type=checkbox] -> onChange, checked
- input[type=button] -> onClick
- input[type=submit] -> onClick
- form -> onSubmit
- select -> onChange, selected
- textarea -> onChange, value

- data-component-redux-type
  We will generate redux code even though it is not a input type

## How to get multiple state, say you want to submit a form?
In the action-creator, you can import the store and get any state you want.

```
import actionTypeConstants from '../../action-type-constants/index';
import store from '/client/imports/store'

export default function selectNotificationsSessionUpdates(event) {
  return {
    type: actionTypeConstants.accountNotifications.selectNotificationsSessionUpdates,
    value: event.target.value
  };
}
```

## How to set multiple state, say you want to reset a from?
You can let multiple reducers recognize the same action type and
reset the state accordingly
