exports.onlyCallOnce = func => {
  let hasBeenCalled = false;
  return (...args) => {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      return func(...args);
    }
  };
};
