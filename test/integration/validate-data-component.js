/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')


describe.skip('reacterminator', function () {

  it('should throw an error if the data-component value is invalid', function () {

    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div data-component="first-name"></div>'
       })
     },
     /first-name is not a valida data-component value, use camelcase instead/
    )

    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div data-component="first_name"></div>'
       })
     },
     /first_name is not a valida data-component value, use camelcase instead/
    )

    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div data-component="first_name"></div>'
       })
     },
     /first_name is not a valida data-component value, use camelcase instead/
    )

    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div data-component=""></div>'
       })
     },
     /value of data-component can not be blank/
    )

  })

  it('should throw an error if there is no data-components', function () {

    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div></div>'
       })
     },
     /there is not data-component specified/
    )
  })
})
