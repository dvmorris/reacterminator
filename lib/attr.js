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
  listItem: 'data-component-list-item',
  listProp: 'data-component-list-prop',
  value: 'data-component-value',
  props: 'data-component-props',
  state: 'data-component-state',
  action: 'data-component-action'
}
Attr.DATA_NAMES_TO_ATTR_NAMES = _.invert(Attr.ATTR_NAMES_TO_DATA_NAMES)
Attr.DATA_NAMES = _.keys(Attr.DATA_NAMES_TO_ATTR_NAMES)

Attr.prototype.getAll = function () {
  var $node = this.$node

  return Attr.DATA_NAMES.reduce(function (attrs, dataName) {
    var dataValue = $node.attr(dataName)
    if (dataValue) {
      attrs[Attr.DATA_NAMES_TO_ATTR_NAMES[dataName]] = dataValue
    }

    return attrs
  }, {})
}

Attr.prototype.removeAll = function () {
  var $node = this.$node

  Attr.DATA_NAMES.forEach(function (dataName) {
    $node.removeAttr(dataName)
  })

  return this
}
