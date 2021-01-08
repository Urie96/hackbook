module.exports = function asyncPool(routineCount) {
  const todoPool = [];
  let doingCount = 0;
  function handle() {
    if (doingCount >= routineCount || todoPool.length <= 0) return;
    const func = todoPool.shift();
    func().finally(() => {
      doingCount--;
      handle();
    });
    doingCount++;
  }
  return {
    todo(func) {
      return new Promise((resolve, reject) => {
        todoPool.push(() =>
          func()
            .then(resolve)
            .catch(reject)
        );
        handle();
      });
    },
  };
}