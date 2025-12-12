import { defineConfig } from 'wxt';
import pkg from './package.json';

// See https://wxt.dev/api/config.html
export default defineConfig({
	vite: () => ({
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						'arcoblue-6': '#2C3E50',
					},
				},
			},
		},
		define: {
			// 将环境变量注入到浏览器扩展中
			'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(process.env.VITE_TELEGRAM_BOT_TOKEN || ''),
			'import.meta.env.VITE_TELEGRAM_CHANNEL_ID': JSON.stringify(process.env.VITE_TELEGRAM_CHANNEL_ID || ''),
		},
	}),
	extensionApi: 'chrome',
	modules: ['@wxt-dev/module-vue'],
	manifest: {
		name: 'Telegram Clipper - TG 剪藏',
		version: pkg.version,
		description: '将网页精彩内容一键收藏至 Telegram 频道,支持文字编辑、格式保留和网页快存。',
		permissions: ['contextMenus', 'storage', 'notifications', 'scripting'],
		host_permissions: ['https://api.telegram.org/*', '<all_urls>'],
	},
});
