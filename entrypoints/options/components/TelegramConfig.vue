<template>
  <div class="config-form">
    <div class="form-group">
      <label class="switch-label">
        <input
          type="checkbox"
          :checked="config.enabled"
          @change="updateEnabled"
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
        :value="config.botToken"
        @input="updateBotToken"
        :placeholder="t('options.telegram.botTokenPlaceholder')"
      />
      <small>
        {{ t('options.telegram.botTokenHint').replace('@BotFather', '') }}
        <a href="https://t.me/BotFather" target="_blank">@BotFather</a>
        {{ t('options.telegram.botTokenHint').includes('获取') ? '获取 Token' : '' }}
      </small>
    </div>

    <div class="form-group">
      <label>{{ t('options.telegram.channelId') }}</label>
      <input
        type="text"
        :value="config.channelId"
        @input="updateChannelId"
        :placeholder="t('options.telegram.channelIdPlaceholder')"
      />
      <small>{{ t('options.telegram.channelIdHint') }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const config = defineModel<{
  enabled: boolean;
  botToken: string;
  channelId: string;
}>('config', { required: true });

function updateEnabled(event: Event) {
  const target = event.target as HTMLInputElement;
  config.value = { ...config.value, enabled: target.checked };
}

function updateBotToken(event: Event) {
  const target = event.target as HTMLInputElement;
  config.value = { ...config.value, botToken: target.value };
}

function updateChannelId(event: Event) {
  const target = event.target as HTMLInputElement;
  config.value = { ...config.value, channelId: target.value };
}
</script>
