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
        <span class="switch-text">{{ t('options.enableDiscord') }}</span>
      </label>
    </div>

    <div class="form-group">
      <label>{{ t('options.discord.webhookUrl') }}</label>
      <input
        type="text"
        :value="config.webhookUrl"
        @input="updateWebhookUrl"
        :placeholder="t('options.discord.webhookUrlPlaceholder')"
      />
      <small>{{ t('options.discord.webhookUrlHint') }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const config = defineModel<{
  enabled: boolean;
  webhookUrl: string;
}>('config', { required: true });

function updateEnabled(event: Event) {
  const target = event.target as HTMLInputElement;
  config.value = { ...config.value, enabled: target.checked };
}

function updateWebhookUrl(event: Event) {
  const target = event.target as HTMLInputElement;
  config.value = { ...config.value, webhookUrl: target.value };
}
</script>
