<template>
  <div class="options-container">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>{{ t('options.title') }}</h1>
      </div>

      <div class="sidebar-section">
        <h3>{{ t('options.platformManagement') }}</h3>
        <div class="platform-list">
          <button
            v-for="platform in platforms"
            :key="platform.meta.id"
            :class="['platform-item', { active: activePlatformTab === platform.meta.id }]"
            @click="activePlatformTab = platform.meta.id"
          >
            <div class="platform-info">
              <span class="platform-name">{{ platform.meta.name }}</span>
            </div>
            <div class="platform-status">
              <span
                v-if="platformConfigs[platform.meta.id].enabled"
                class="status-badge enabled"
                :title="t('common.enabled')"
              >
                {{ t('common.on') }}
              </span>
              <span v-else class="status-badge disabled" :title="t('common.disabled')">{{ t('common.off') }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 语言设置入口 -->
      <div class="sidebar-section">
        <h3>{{ t('options.language.title') }}</h3>
        <div class="platform-list">
          <button
            :class="['platform-item', { active: activePlatformTab === 'language' }]"
            @click="activePlatformTab = 'language'"
          >
            <div class="platform-info">
              <span class="platform-name">🌐 {{ t('options.language.label') }}</span>
            </div>
          </button>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-header">
        <h2>{{ currentPlatform?.meta.name }}</h2>
        <p class="description">{{ currentPlatform?.meta.description }}</p>

        <div class="tutorial-link">
          <a href="https://clipper-hub.netlify.app/" target="_blank">
            {{ t('options.tutorial') }}
          </a>
        </div>
      </div>

      <!-- Telegram 配置 -->
      <div v-if="activePlatformTab === 'telegram'" class="config-form">
        <div class="form-group">
          <label class="switch-label">
            <input
              type="checkbox"
              v-model="platformConfigs.telegram.enabled"
              class="switch-input"
            />
            <span class="switch-slider"></span>
            <span class="switch-text">{{ t('options.enableTelegram') }}</span>
          </label>
        </div>

        <div class="form-group">
          <label>{{ t('options.telegram.botToken') }}</label>
          <input
            type="text"
            v-model="platformConfigs.telegram.botToken"
            :placeholder="t('options.telegram.botTokenPlaceholder')"
          />
          <small
            >{{ t('options.telegram.botTokenHint').replace('@BotFather', '') }}
            <a href="https://t.me/BotFather" target="_blank">@BotFather</a> {{ t('options.telegram.botTokenHint').includes('获取') ? '获取 Token' : '' }}</small
          >
        </div>

        <div class="form-group">
          <label>{{ t('options.telegram.channelId') }}</label>
          <input
            type="text"
            v-model="platformConfigs.telegram.channelId"
            :placeholder="t('options.telegram.channelIdPlaceholder')"
          />
          <small>{{ t('options.telegram.channelIdHint') }}</small>
        </div>
      </div>

      <!-- Discord 配置 -->
      <div v-if="activePlatformTab === 'discord'" class="config-form">
        <div class="form-group">
          <label class="switch-label">
            <input
              type="checkbox"
              v-model="platformConfigs.discord.enabled"
              class="switch-input"
            />
            <span class="switch-slider"></span>
            <span class="switch-text">{{ t('options.enableDiscord') }}</span>
          </label>
        </div>

        <div class="form-group">
          <label>{{ t('options.discord.webhookUrl') }}</label>
          <input
            type="text"
            v-model="platformConfigs.discord.webhookUrl"
            :placeholder="t('options.discord.webhookUrlPlaceholder')"
          />
          <small>{{ t('options.discord.webhookUrlHint') }}</small>
        </div>
      </div>

      <!-- Notion 配置 -->
      <div v-if="activePlatformTab === 'notion'" class="config-form">
        <div class="form-group">
          <label class="switch-label">
            <input
              type="checkbox"
              v-model="platformConfigs.notion.enabled"
              class="switch-input"
            />
            <span class="switch-slider"></span>
            <span class="switch-text">{{ t('options.enableNotion') }}</span>
          </label>
        </div>

        <div class="form-group">
          <label>{{ t('options.notion.integrationToken') }}</label>
          <input
            type="text"
            v-model="platformConfigs.notion.integrationToken"
            :placeholder="t('options.notion.integrationTokenPlaceholder')"
          />
          <small
            >{{ t('options.notion.integrationTokenHint').split('Notion Integrations')[0] }}
            <a href="https://www.notion.so/my-integrations" target="_blank"
              >Notion Integrations</a
            >
            {{ t('options.notion.integrationTokenHint').split('Notion Integrations')[1] || '' }}</small
          >
        </div>

        <div class="form-group">
          <label>{{ t('options.notion.databaseId') }}</label>
          <input
            type="text"
            v-model="platformConfigs.notion.databaseId"
            :placeholder="t('options.notion.databaseIdPlaceholder')"
          />
          <small>{{ t('options.notion.databaseIdHint') }}</small>
        </div>

        <div class="form-group">
          <label>{{ t('options.notion.advancedConfig') }}</label>
          <details style="margin-top: 8px">
            <summary style="cursor: pointer; color: #666; font-size: 13px">
              {{ t('options.notion.propertyMapping') }}
            </summary>
            <div
              style="
                margin-top: 12px;
                padding: 12px;
                background: #f9f9f9;
                border-radius: 6px;
              "
            >
              <div style="margin-bottom: 12px">
                <label style="font-size: 12px; color: #666">{{ t('options.notion.titleProperty') }}</label>
                <input
                  type="text"
                  v-model="platformConfigs.notion.titleProperty"
                  :placeholder="t('options.notion.titlePropertyPlaceholder')"
                  style="margin-top: 4px"
                />
              </div>
              <div style="margin-bottom: 12px">
                <label style="font-size: 12px; color: #666">{{ t('options.notion.contentProperty') }}</label>
                <input
                  type="text"
                  v-model="platformConfigs.notion.contentProperty"
                  :placeholder="t('options.notion.contentPropertyPlaceholder')"
                  style="margin-top: 4px"
                />
              </div>
              <div>
                <label style="font-size: 12px; color: #666">{{ t('options.notion.sourceProperty') }}</label>
                <input
                  type="text"
                  v-model="platformConfigs.notion.sourceProperty"
                  :placeholder="t('options.notion.sourcePropertyPlaceholder')"
                  style="margin-top: 4px"
                />
              </div>
            </div>
          </details>
          <small style="display: block; margin-top: 8px">
            📚 {{ t('options.notion.templateHint') }}<a
              href="https://anghunk.notion.site/2cad17511b968031a7ebeecd5e279c6a"
              target="_blank"
              >{{ t('options.notion.templateLink') }}</a
            >
          </small>
        </div>
      </div>

      <!-- 语言设置 -->
      <div v-if="activePlatformTab === 'language'" class="config-form">
        <div class="form-group">
          <label>{{ t('options.language.label') }}</label>
          <div class="language-options">
            <label class="language-option" :class="{ active: currentLocale === null }">
              <input
                type="radio"
                name="language"
                :checked="currentLocale === null"
                @change="changeLanguage(null)"
              />
              <span>🌐 {{ t('options.language.followBrowser') }}</span>
            </label>
            <label class="language-option" :class="{ active: currentLocale === 'zh-CN' }">
              <input
                type="radio"
                name="language"
                :checked="currentLocale === 'zh-CN'"
                @change="changeLanguage('zh-CN')"
              />
              <span>🇨🇳 {{ t('options.language.chinese') }}</span>
            </label>
            <label class="language-option" :class="{ active: currentLocale === 'en-US' }">
              <input
                type="radio"
                name="language"
                :checked="currentLocale === 'en-US'"
                @change="changeLanguage('en-US')"
              />
              <span>🇬🇧 {{ t('options.language.english') }}</span>
            </label>
          </div>
          <small>{{ t('options.language.currentLanguage') }}: {{ currentLanguageLabel }}</small>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div v-if="activePlatformTab !== 'language'" class="action-bar">
        <button @click="testConnection" :disabled="isLoading" class="btn btn-secondary">
          {{ isLoading ? t('common.testing') : t('common.test') }}
        </button>
        <button @click="saveSettings" class="btn btn-primary">{{ t('options.saveSettings') }}</button>
      </div>

      <!-- 状态消息 -->
      <div v-if="statusMessage" :class="['status-message', statusType]">
        {{ statusMessage }}
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { browser } from "wxt/browser";
import {
  loadAllConfigs,
  saveAllConfigs,
  getAllPlatforms,
  testPlatformConnection,
  type AllPlatformConfigs,
  type PlatformType,
  defaultConfigs,
} from "@/lib/platforms";
import { switchLocale, clearLocale, getBrowserLocale, type Locale } from "@/lib/i18n";

const { t, locale } = useI18n();
const browserAPI = browser;

// 状态
const activePlatformTab = ref<PlatformType | 'language'>('telegram');
const platformConfigs = ref<AllPlatformConfigs>({ ...defaultConfigs });
const isLoading = ref(false);
const statusMessage = ref("");
const statusType = ref("info");

// 语言设置
const currentLocale = ref<Locale | null>(null);

// 获取所有平台
const platforms = getAllPlatforms();

// 当前选中的平台
const currentPlatform = computed(() =>
  platforms.find(p => p.meta.id === activePlatformTab.value)
);

// 当前语言显示标签
const currentLanguageLabel = computed(() => {
  const actualLocale = locale.value as Locale;
  if (currentLocale.value === null) {
    const langName = actualLocale === 'zh-CN' ? t('options.language.chinese') : t('options.language.english');
    return `${t('options.language.followBrowser')} (${langName})`;
  }
  return currentLocale.value === 'zh-CN' ? t('options.language.chinese') : t('options.language.english');
});

// 监听平台切换，清除状态消息
watch(activePlatformTab, () => {
  statusMessage.value = "";
  statusType.value = "info";
});

onMounted(() => {
  restoreSettings();
  loadLanguageSettings();
});

async function restoreSettings() {
  try {
    platformConfigs.value = await loadAllConfigs();
  } catch (error) {
    console.error(t('options.loadFailed'), error);
    showStatus(`❌ ${t('options.loadFailed')}`, "error");
  }
}

// 加载语言设置
async function loadLanguageSettings() {
  try {
    const result = await browserAPI.storage.local.get('locale');
    if (result.locale) {
      currentLocale.value = result.locale as Locale;
    } else {
      currentLocale.value = null;
    }
  } catch (error) {
    console.error('Failed to load language settings:', error);
  }
}

// 切换语言
async function changeLanguage(newLocale: Locale | null) {
  currentLocale.value = newLocale;
  
  if (newLocale === null) {
    await clearLocale();
  } else {
    await switchLocale(newLocale);
  }
  
  showStatus(`✅ ${t('options.saveSuccess')}`, "success");
  setTimeout(() => {
    statusMessage.value = "";
  }, 2000);
}

// 测试连接
async function testConnection() {
  const platformType = activePlatformTab.value as PlatformType;
  const config = platformConfigs.value[platformType];

  isLoading.value = true;
  showStatus(t('options.testing'), "info");

  try {
    const result = await testPlatformConnection(platformType, config);

    if (result.success) {
      showStatus(`✅ ${t('options.testSuccess')}`, "success");
    } else {
      showStatus(`❌ ${t('options.testFailed')}: ${result.error || t('common.error')}`, "error");
    }
  } catch (error: any) {
    showStatus(`❌ ${t('options.networkError')}: ${error.message}`, "error");
  } finally {
    isLoading.value = false;
  }
}

// 保存设置
async function saveSettings() {
  try {
    await saveAllConfigs(platformConfigs.value);
    showStatus(`✅ ${t('options.saveSuccess')}`, "success");
    setTimeout(() => {
      statusMessage.value = "";
    }, 3000);
  } catch (error: any) {
    showStatus(`❌ ${t('options.saveFailed')}: ${error.message}`, "error");
  }
}

function showStatus(message: string, type: string = "info") {
  statusMessage.value = message;
  statusType.value = type;
}
</script>

<style scoped lang="less">
@import "./style.less";
</style>
