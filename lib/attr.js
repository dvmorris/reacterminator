module.exports = Attr

var _ = require('lodash')

/**
 * manipulate data attributes of a component
 * @class
 * @param {Cheerio} $node
 */
function Attr ($node) {
  this.$node = $node
}

Attr.ATTR_NAMES_TO_DATA_NAMES = {
  name: 'data-component-name',
  props: 'data-component-props',
  state: 'data-component-state',
  primary: 'data-component-primary',
  listItem: 'data-component-list-item',
  listProp: 'data-component-list-prop',
  value: 'data-component-value',
  action: 'data-component-action',
  imports: 'data-component-imports',
  wrapper: 'data-component-wrapper'
}
Attr.DATA_NAMES_TO_ATTR_NAMES = _.invert(Attr.ATTR_NAMES_TO_DATA_NAMES)
Attr.DATA_NAMES = _.keys(Attr.DATA_NAMES_TO_ATTR_NAMES)

Attr.prototype.extract = function () {
  var $node = this.$node

  // get all attributes
  var attributes = Attr.DATA_NAMES.reduce(function (attrs, dataName) {
    var dataValue = _.trim($node.attr(dataName))
    if (dataValue) {
      attrs[Attr.DATA_NAMES_TO_ATTR_NAMES[dataName]] = dataValue
    }

    return attrs
  }, {})

  // remove all attributes from the $node
  Attr.DATA_NAMES.forEach(function (dataName) {
    $node.removeAttr(dataName)
  })

  return attributes
}
