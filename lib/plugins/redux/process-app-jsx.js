const parse = require('../../helpers/parse')

function processAppJsx ({component, ast}) {
  const astNode = ast.program.body[0].expression
  const providerAst = parse('<Provider store={store}></Provider>')
  providerAst.program.body[0].expression.children = [astNode]
  return {component, ast: providerAst}
}

module.exports = processAppJsx
