import request from 'superagent';

export function asyncPool(routineCount: number) {
  const todoPool = [] as (() => Promise<any>)[];
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
    todo<T>(func: () => Promise<T>) {
      return new Promise<T>((resolve, reject) => {
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

export const partial = <T extends object>(
  from: any,
  to: T,
  ...fields: (keyof T)[]
): T => {
  fields.forEach((field) => (to[field] = from[field]));
  return to;
};

export const requester = (header) => {
  const agent = request.agent().set(header);
  let userAgent = 20;
  const { todo } = asyncPool(50);
  return {
    get: async (url: string) => {
      try {
        const sendFunc = () => agent.get(url);
        const response = await todo(sendFunc);
        if (!response) console.log('no response: ', url);
        return response;
      } catch (e) {
        console.log(e.message);
      }
    },
    post: async (url: string, data: any) => {
      try {
        const sendFunc = () =>
          agent
            .set({ 'User-Agent': String(++userAgent % 10000) })
            .post(url)
            .send(data);
        const response = await todo(sendFunc);
        if (!response) console.log('no response: ', url);
        return response;
      } catch (e) {
        console.log(e.message);
      }
    },
  };
};
