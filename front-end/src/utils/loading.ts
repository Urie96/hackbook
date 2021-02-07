import { Toast } from 'vant';

export const Loading = {
  pop() {
    Toast.loading({
      message: '加载中...',
      forbidClick: false,
      duration: 0,
      // overlay: true,
      icon: 'a iconfont icon-Loading spin',
    });
  },
  clear() {
    Toast.clear();
  },
};
