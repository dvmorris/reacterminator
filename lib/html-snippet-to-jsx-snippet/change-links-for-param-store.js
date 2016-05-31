module.exports = changeLinksForParamStore

const _ = require('lodash')
const traverse = require('babel-traverse').default
const assignProps = require('../helpers/assign-props')

function changeLinksForParamStore (component, options) {
  if (!_.get(options, 'changeLinksForParamStore')) {
    return
  }

  let needParamStore

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const node = nodePath.node

      const isAnchorTag = _.get(node, 'openingElement.name.name') === 'a'
      if (!isAnchorTag) {
        return
      }

      const props = node.openingElement.attributes

      const hasOnClick = _.find(
        props,
        {type: 'JSXAttribute', name: {name: 'onClick'}}
      )
      if (hasOnClick) {
        return
      }

      const hrefNode = _.find(
        props,
        {type: 'JSXAttribute', name: {name: 'href'}}
      )
      if (!hrefNode) {
        return
      }

      const href = hrefNode.value.value

      if (isBack(href)) {
        assignProps({node, props: {'onClick': '{window.history.back()}'}})
        return
      }

      if (isAbsoluteHref(href)) {
        return
      }

      // change tag to Link
      _.set(node, 'openingElement.name.name', 'Link')
      if (node.closingElement) {
        _.set(node, 'closingElement.name.name', 'Link')
      }

      // add params prop
      const hrefWithoutDotHtml = href.replace(/\.html$/i, '')
      assignProps({node, props: {'params': `{{ path: '${hrefWithoutDotHtml}' }}`}})

      needParamStore = true
    }
  })

  if (needParamStore) {
    component.imports = component.imports || ''
    component.imports += 'import {Link} from \'param-store\';'
  }
}

function isAbsoluteHref (href) {
  return /^https?:\/\//i.test(href) ||
    /^#/.test(href) ||
    /^mailto:/.test(href) ||
    /^tel:/.test(href)
}

function isBack (href) {
  return href === '#back'
}
