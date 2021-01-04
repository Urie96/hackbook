import { Toast } from 'vant';

const Loading = {
    pop() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
            // overlay: true,
            icon: 'a iconfont icon-Loading spin',
        });
    },
    clear() {
        Toast.clear()
    }
}

export default Loading