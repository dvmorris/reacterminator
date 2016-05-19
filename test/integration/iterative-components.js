/* eslint-env mocha */
// var assert = require('chai').assert
// var reacterminator = require('../../lib/index')

// describe.skip('reacterminator', function () {
//   it('should generate iterative components', function () {
//     var content = `\
// <div data-component-name="ComponentA"
//     data-component-list-item="ComponentB"
//     data-component-list-prop="users">
//   <div><span>1</span></div>
//   <div><span>2</span></div>
//   <div><span>3</span></div>
// </div>`

//     var ComponentA = `\
// import ComponentB from './ComponentB';

// class ComponentA extends React.Component {
//   render() {
//     return (
//       <div>
//         {
//           this.props.users.map((user) => {
//             return <ComponentB user={user}></ComponentB>
//           })
//         }
//       </div>
//     );
//   }
// }

// export default ComponentA;`

//     var ComponentB = `
// class ComponentB extends React.Component {
//   render() {
//     return (
//       <div><span>1</span></div>
//     );
//   }
// }

// export default ComponentB;`

//     assert.deepEqual(
//       reacterminator({type: 'string', content: content}),
//       {ComponentA: ComponentA, ComponentB: ComponentB}
//     )
//   })
// })
