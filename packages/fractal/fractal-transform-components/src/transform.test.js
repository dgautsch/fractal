/* eslint no-unused-expressions: "off" */
const {File, FileCollection, ComponentCollection} = require('@frctl/support');
const {expect} = require('../../../../test/helpers');
const componentTransform = require('./transform');

const items = [{
  cwd: '/',
  path: 'path/to/fake/@a-component'
},
{
  cwd: '/',
  path: 'path/to/fake/@a-component/view.hbs',
  contents: new Buffer('VIEW')
},
{
  cwd: '/',
  path: 'path/to/fake/@a-component/preview.hbs',
  contents: new Buffer('PREVIEW')
},
{
  cwd: '/',
  path: 'path/to/fake/@b-component/'
},
{
  cwd: '/',
  path: 'path/to/fake/@b-component/view.hbs',
  contents: new Buffer('VIEW')
},
{
  cwd: '/',
  path: 'path/to/fake/@b-component/preview.hbs',
  contents: new Buffer('PREVIEW')
},
{
  cwd: '/',
  path: 'path/to/fake/some.png',
  contents: new Buffer([8, 6, 7, 5, 3, 0, 9])
}
];

const getFileCollection = ()=> {
  return FileCollection.from(items.map(item => File.from(item)));
}



describe.only('Component Transform', function () {
  describe('factory', function () {
    it('is exported as a function', function () {
      expect(componentTransform).to.be.a('function');
    });
    it('returns a valid transform object', function () {
      const transform = componentTransform();
      expect(transform).to.be.an('object');
      expect(transform).to.have.a.property('name').that.is.a('string');
      expect(transform).to.not.have.a.property('passthru');
      expect(transform).to.have.a.property('transform').that.is.a('function');
    });
  });
  describe('.transform()', function () {
    // before(function () {
    //   mockFs({
    //     'path/to/fake/@a-component': {
    //       'some-file.txt': 'file content here',
    //       'empty-dir': { /** empty directory */ }
    //     },
    //     'path/to/fake/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
    //     'path/to/fake/other/different/@b-component': {
    //       'other-file.txt': 'file content here',
    //       'other-dir': { /** empty directory */ }
    //     }
    //   });
    // });
    //
    // after(function () {
    //   mockFs.restore();
    // });

    it('transforms a FileCollection into a ComponentCollection', function () {
      const fileCollection = getFileCollection();
      const transform = componentTransform().transform;
      const output = transform(fileCollection);
      expect(output instanceof ComponentCollection).to.be.true;
      expect(output).to.have.property('length').that.equals(4);
    });
  });
});
