function afterDecorator(fnToCallAfter) {
  return function (target, name, descriptor) {
    let fn = descriptor.value;

    descriptor.value = function (...args) {
      let ret = fn.apply(this, args);

      fnToCallAfter.call(this); // insert func in between last statement and return statement

      return ret;
    };
  };
}

function beforeDecorator(fnToCallBefore) {
  return function (target, name, descriptor) {
    let fn = descriptor.value;

    descriptor.value = function (...args) {
      fnToCallBefore.call(this);

      return fn.apply(this, args);
    };
  };
}

export default {
  afterDecorator,
  beforeDecorator
};
