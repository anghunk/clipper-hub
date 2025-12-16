import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';

// 引入组件
import './custom.css';
import Layout from './Layout.vue';

// 图片放大
import { onMounted, watch, nextTick } from 'vue';
import mediumZoom from 'medium-zoom';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp(ctx) {
		DefaultTheme.enhanceApp(ctx);
	},
	setup() {
		const { frontmatter } = useData();
		const route = useRoute();
		const initZoom = () => {
			mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
		};
		onMounted(() => {
			initZoom();
		});
		watch(
			() => route.path,
			() => nextTick(() => initZoom()),
		);

	},
};
