const {EventEmitter2} = require('eventemitter2');

class EmittingPromise extends Promise {
  constructor(callback) {
    const emitter = new EventEmitter2();

    super((resolve, reject) => {
      callback(resolve, reject, (eventName, ...args) => {
        process.nextTick(() => {
          emitter.emit(eventName, ...args)
        });
      });
    });
    this.emitter = emitter;

    return new Proxy(this, {
      get(target, propKey, receiver) {
        console.log('GET ' + propKey.toString());
        return target[propKey];
      }
    });
  }

  on(eventName, listener) {
    this.emitter.on(eventName, listener)
    return this
  }

}
module.exports = EmittingPromise;
