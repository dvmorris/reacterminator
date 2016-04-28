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

      // change tag to Link
      _.set(node, 'openingElement.name.name', 'Link')
      if (node.closingElement) {
        _.set(node, 'closingElement.name.name', 'Link')
      }

      // add params prop
      var hrefWithoutDotHtml = href.replace(/\.html$/i, '')

      var divWithParamsAst = parse(
        '<div params={{ path: ' + hrefWithoutDotHtml + ' }} />'
      )

      var paramsAst = harvest(
        divWithParamsAst,
        'openingElement.attributes.[0]'
      )

      props.push(paramsAst)

      needParamStore = true
    }
  })

  if (needParamStore) {
    component.imports = component.imports || ''
    component.imports += 'import {Link} from \'param-store\';'
  }
}
