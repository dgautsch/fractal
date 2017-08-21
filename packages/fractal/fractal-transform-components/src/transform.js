const {normalizeName, addTrailingSeparator} = require('@frctl/utils');
const {Component, ComponentCollection} = require('@frctl/support');

module.exports = function (opts = {}) {
  const marker = opts.marker || '@';

  return {

    name: 'components',

    transform(files, state) {
      console.log(files);
      const components = files.toArray().filter(file => {
        console.log(file.isDirectory(), file.stem)
        return file.isDirectory() && file.stem.startsWith(marker);
      });

      console.log(components);

      return ComponentCollection.from(components.map(dir => {
        const componentFiles = matchComponentFiles(dir, files).map(file => {
          file = file.clone();
          file.base = dir.path;
          return file;
        });

        return Component.from({
          path: dir.path,
          relative: dir.relative,
          src: dir.base,
          name: normalizeName(dir.stem),
          role: 'component',
          config: {},
          variants: [],
          files: componentFiles
        });
      }));
    }
  };
};

function matchComponentFiles(dir, files) {
  const rootPath = addTrailingSeparator(dir.path);
  return files.filter(file => {
    return !file.isDirectory() && // is not a directory
      file.path.startsWith(rootPath) && // within the component directory
      file.path.replace(rootPath, '').indexOf(marker) === -1; // and does not contain @ (a subcomponent)
  });
}
