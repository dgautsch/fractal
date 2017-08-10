/* eslint no-unused-expressions: "off" */

const {hash} = require('@frctl/utils');
const {expect} = require('../../../../test/helpers');
const EmittingPromise = require('./emitting-promise');

describe.only('EmittingPromise', function() {
  describe('constructor', function() {
    it('returns a new instance', function() {
      const eProm = new EmittingPromise(function(resolve, reject, emit) {

        emit('flibble', 'flobble');
        setTimeout(() => {
          resolve('value');
        }, 200);

      });

      eProm.on('flibble', function(result) {
        expect(result).to.equal('flobble');
      }).then(function(result) {
        expect(result).to.equal('value');
      }).catch(err => {
        console.error('An error occurred:', err);
      });

      expect(eProm).to.exist;
      return eProm;
    });
  });
});
