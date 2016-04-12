module.exports = changeLinksForParamStore

var _ = require('lodash')
var traverse = require('babel-traverse').default
var parse = require('../helpers/parse')
var harvest = require('../helpers/harvest')

function changeLinksForParamStore (component, options) {
  if (!_.get(options, 'changeLinksForParamStore')) {
    return
  }

  var needParamStore

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      var node = nodePath.node

      var isAnchorTag = _.get(node, 'openingElement.name.name') === 'a'
      if (!isAnchorTag) {
        return
      }

      var props = node.openingElement.attributes

      var hasOnClick = _.find(
        props,
        {type: 'JSXAttribute', name: {name: 'onClick'}}
      )
      if (hasOnClick) {
        return
      }

      var hrefNode = _.find(
        props,
        {type: 'JSXAttribute', name: {name: 'href'}}
      )
      if (!hrefNode) {
        return
      }

      var href = hrefNode.value.value

      if (/^https?:\/\//i.test(href) || /^#/.test(href)) {
        return
      }

      var hrefWithoutDotHtml = href.replace(/\.html$/i, '')

      var divWithOnClickPropAst = parse(
        '<div onClick={(e) => {' +
        '  ParamStore.set({path: \'' + hrefWithoutDotHtml + '\'});' +
        '  e.preventDefault();' +
        '}} />'
      )

      var onCLickPropAst = harvest(
        divWithOnClickPropAst,
        'openingElement.attributes.[0]'
      )

      props.push(onCLickPropAst)

      needParamStore = true
    }
  })

  if (needParamStore) {
    component.imports = component.imports || ''
    component.imports += 'import ParamStore from \'param-store\';'
  }
}
