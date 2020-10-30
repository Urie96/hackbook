function asyncPool(routineCount) {
  const todoPool = [];
  const doingPool = [];
  let emptyCount = 0;
  function handle() {
    const func = todoPool.shift();
    if (!func) {
      emptyCount += 1;
      if (emptyCount < 100) {
        setTimeout(handle, 200);
      }
      return;
    }
    const one = func().then(() => {
      doingPool.splice(doingPool.indexOf(one), 1);
    });
    doingPool.push(one);
    if (doingPool.length >= routineCount) {
      Promise.race(doingPool).then(handle);
    } else {
      handle();
    }
  }
  handle();
  return {
    todo(func) {
      return new Promise((resolve, reject) => {
        todoPool.push(() => func().then(resolve).catch(reject));
      });
    },
  };
}

module.exports = asyncPool;
