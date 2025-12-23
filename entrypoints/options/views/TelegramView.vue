<template>
  <div>
    <div class="content-header">
      <h2>{{ platform?.meta.name }}</h2>
      <p class="description">{{ platform?.meta.description }}</p>

      <div class="tutorial-link">
        <a href="https://clipper-hub.netlify.app/" target="_blank">
          {{ t('options.tutorial') }}
        </a>
      </div>
    </div>

    <TelegramConfig v-model:config="config" @update:config="handleConfigChange" />

    <div class="action-bar">
      <button @click="testConnection" :disabled="isLoading" class="btn btn-secondary">
        {{ isLoading ? t('common.testing') : t('common.test') }}
      </button>
    </div>

    <div v-if="statusMessage" :class="['status-message', statusType]">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import TelegramConfig from '../components/TelegramConfig.vue';
import {
  loadAllConfigs,
  saveAllConfigs,
  getAllPlatforms,
  testPlatformConnection,
  type AllPlatformConfigs,
  defaultConfigs,
} from '@/lib/platforms';

const { t } = useI18n();
const emit = defineEmits<{
  (e: 'configSaved'): void;
}>();

const parentPlatformConfigs = inject<any>('platformConfigs');
const platformConfigs = ref<AllPlatformConfigs>({ ...defaultConfigs });
const isLoading = ref(false);
const statusMessage = ref('');
const statusType = ref('info');
let saveTimeout: NodeJS.Timeout | null = null;

const config = computed({
  get: () => platformConfigs.value.telegram,
  set: (value) => {
    platformConfigs.value.telegram = value;
  }
});

const platform = computed(() => 
  getAllPlatforms().find(p => p.meta.id === 'telegram')
);

// 自动保存
function handleConfigChange() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(async () => {
    try {
      await saveAllConfigs(platformConfigs.value);
      emit('configSaved');
      showStatus(`✅ ${t('options.saveSuccess')}`, 'success');
      setTimeout(() => {
        statusMessage.value = '';
      }, 2000);
    } catch (error: any) {
      showStatus(`❌ ${t('options.saveFailed')}: ${error.message}`, 'error');
    }
  }, 200);
}

onMounted(async () => {
  try {
    platformConfigs.value = await loadAllConfigs();
  } catch (error) {
    console.error(t('options.loadFailed'), error);
    showStatus(`❌ ${t('options.loadFailed')}`, 'error');
  }
});

async function testConnection() {
  isLoading.value = true;
  showStatus(t('options.testing'), 'info');

  try {
    const result = await testPlatformConnection('telegram', config.value);
    if (result.success) {
      showStatus(`✅ ${t('options.testSuccess')}`, 'success');
    } else {
      showStatus(`❌ ${t('options.testFailed')}: ${result.error || t('common.error')}`, 'error');
    }
  } catch (error: any) {
    showStatus(`❌ ${t('options.networkError')}: ${error.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
}

function showStatus(message: string, type: string = 'info') {
  statusMessage.value = message;
  statusType.value = type;
}
</script>
