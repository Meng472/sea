<script setup>
import { ref, computed } from 'vue'

const activeView = ref('rgb')
const threshold = ref(0.5)
const brightness = ref(0)
const contrast = ref(1.0)
const saturation = ref(1.0)
const isProcessing = ref(false)
const uploadedImage = ref(null)
const selectedDataset = ref('sample1')

const datasets = [
  { 
    id: 'sample1', 
    name: '样本一',
    description: '珊瑚礁区域采集',
    rgb: '/图片/RGB1.png',
    depth: '/图片/深度图2.png',
    optical: '/图片/光流图1.png',
    gt: '/图片/GT1.png'
  },
  { 
    id: 'sample2', 
    name: '样本二',
    description: '深海生物监测',
    rgb: '/图片/RGB2.jpg',
    depth: '/图片/深度图2.png',
    optical: '/图片/光流图1.png',
    gt: '/图片/GT2.png'
  }
]

const viewTabs = [
  { id: 'rgb', name: '原图', icon: 'image' },
  { id: 'depth', name: '深度图', icon: 'cube' },
  { id: 'optical', name: '光流图', icon: 'sparkles' },
  { id: 'gt', name: '真值图', icon: 'check' }
]

const viewImages = computed(() => {
  const dataset = datasets.find(d => d.id === selectedDataset.value)
  if (!dataset) return {}
  return {
    rgb: dataset.rgb,
    depth: dataset.depth,
    optical: dataset.optical,
    gt: dataset.gt
  }
})

const currentMainImage = computed(() => viewImages.value[activeView.value])

const setActiveView = (viewId) => {
  activeView.value = viewId
}

const selectDataset = (datasetId) => {
  selectedDataset.value = datasetId
  activeView.value = 'rgb'
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedImage.value = URL.createObjectURL(file)
  }
}

const processImage = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
  }, 2000)
}

const resetParams = () => {
  threshold.value = 0.5
  brightness.value = 0
  contrast.value = 1.0
  saturation.value = 1.0
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="mb-10">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">多模态图像分割工作台</h1>
        <p class="text-slate-500">基于 RGB-X 双流驱动的海洋目标精准分割系统</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3 space-y-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-800">数据集选择</h3>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="dataset in datasets"
                :key="dataset.id"
                @click="selectDataset(dataset.id)"
                :class="[
                  'group relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1',
                  selectedDataset === dataset.id
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg'
                ]"
              >
                <div class="flex items-center gap-3">
                  <div class="w-16 h-12 rounded-xl overflow-hidden bg-slate-100">
                    <img :src="dataset.rgb" :alt="dataset.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{{ dataset.name }}</div>
                    <div class="text-xs text-slate-500">{{ dataset.description }}</div>
                  </div>
                  <div v-if="selectedDataset === dataset.id" class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 p-6">
            <div class="flex flex-wrap gap-3 mb-6">
              <button
                v-for="tab in viewTabs"
                :key="tab.id"
                @click="setActiveView(tab.id)"
                :class="[
                  'px-5 py-2.5 rounded-xl font-medium transition-all duration-300',
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ]"
              >
                {{ tab.name }}
              </button>
              <label class="group relative px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  上传图像
                </span>
              </label>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div 
                v-for="(img, key) in viewImages" 
                :key="key" 
                class="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 group cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all duration-300"
                @click="setActiveView(key)"
              >
                <img :src="img" :alt="key" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-xl text-white text-xs font-medium">
                  {{ viewTabs.find(t => t.id === key)?.name }}
                </div>
                <div v-if="activeView === key" class="absolute inset-0 ring-2 ring-emerald-500 ring-offset-2 rounded-2xl"></div>
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
              <img :src="uploadedImage || currentMainImage" alt="Main view" class="w-full h-full object-contain" />
              <div class="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-xl text-white text-sm font-medium">
                {{ viewTabs.find(t => t.id === activeView)?.name }}
              </div>
              <div v-if="isProcessing" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative w-16 h-16">
                    <div class="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span class="text-white font-medium">处理中...</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-800">图像预处理参数</h3>
              </div>
              <button @click="resetParams" class="px-4 py-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                重置
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="group">
                <label class="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>置信度阈值</span>
                  <span class="text-blue-500 font-mono">{{ threshold.toFixed(2) }}</span>
                </label>
                <input type="range" v-model.number="threshold" min="0" max="1" step="0.01" class="w-full accent-blue-500" />
              </div>
              <div class="group">
                <label class="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>亮度</span>
                  <span class="text-blue-500 font-mono">{{ brightness }}</span>
                </label>
                <input type="range" v-model.number="brightness" min="-100" max="100" step="1" class="w-full accent-blue-500" />
              </div>
              <div class="group">
                <label class="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>对比度</span>
                  <span class="text-blue-500 font-mono">{{ contrast.toFixed(1) }}</span>
                </label>
                <input type="range" v-model.number="contrast" min="0.1" max="3" step="0.1" class="w-full accent-blue-500" />
              </div>
              <div class="group">
                <label class="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>饱和度</span>
                  <span class="text-blue-500 font-mono">{{ saturation.toFixed(1) }}</span>
                </label>
                <input type="range" v-model.number="saturation" min="0" max="2" step="0.1" class="w-full accent-blue-500" />
              </div>
            </div>
            <div class="mt-8 flex gap-4">
              <button @click="processImage" :disabled="isProcessing" class="group relative flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50">
                <span class="flex items-center justify-center gap-2">
                  <svg v-if="!isProcessing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  {{ isProcessing ? '处理中...' : '开始分割' }}
                </span>
              </button>
              <button class="px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                导出结果
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="sticky top-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-800">AI 科普助手</h3>
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span class="text-xs text-green-600">在线</span>
                </div>
              </div>
            </div>

            <div class="space-y-4 max-h-72 overflow-y-auto mb-4 pr-2">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="flex-1 bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p class="text-sm text-slate-700">您好！我是AI助手，可以回答关于海洋生物的问题。</p>
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <input
                type="text"
                placeholder="询问海洋生物..."
                class="flex-1 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition-all duration-300"
              />
              <button class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100">
              <p class="text-xs text-slate-400 mb-3">可询问：</p>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">海豚</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">珊瑚礁鱼</span>
                <span class="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium">海龟</span>
                <span class="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium">章鱼</span>
                <span class="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium">鲨鱼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>