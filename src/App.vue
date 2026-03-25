<script setup>
import { ref, nextTick } from 'vue'

const isMenuOpen = ref(false)
const showAIChat = ref(false)

const messages = ref([
  { role: 'assistant', content: '您好！我是慧瞰蓝疆的智能助手，可以帮助您：\n\n• 解答海洋生物相关问题\n• 介绍系统功能与使用方法\n• 提供技术咨询与支持\n\n请问有什么可以帮助您的？' }
])
const inputText = ref('')
const loading = ref(false)
const msgBox = ref(null)

const navItems = [
  { path: '/', name: '首页', subtitle: '海洋科普' },
  { path: '/segmentation', name: '多模态分割工作台', subtitle: '算法交互' },
  { path: '/data', name: 'IoT数据管理', subtitle: '数据面板' }
]

const USER_ID = 'user_12345'

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleAIChat = () => {
  showAIChat.value = !showAIChat.value
}

const scrollToBottom = () => {
  nextTick(() => {
    if (msgBox.value) {
      msgBox.value.scrollTop = msgBox.value.scrollHeight
    }
  })
}

const handleSend = async () => {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  loading.value = true
  const aiMsgIndex = messages.value.length
  messages.value.push({ role: 'assistant', content: '正在思考...' })

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    })

    const data = await response.json()
    
    if (data.error) {
      messages.value[aiMsgIndex].content = 'API错误: ' + data.error
    } else if (data.choices && data.choices[0] && data.choices[0].message) {
      messages.value[aiMsgIndex].content = data.choices[0].message.content
    } else {
      messages.value[aiMsgIndex].content = '收到意外响应，请检查API配置。'
    }
  } catch (error) {
    console.error('请求出错:', error)
    messages.value[aiMsgIndex].content = '抱歉，连接出现问题。请检查网络或API配置。'
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50">
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-20">
          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <div class="relative w-11 h-11 bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap">慧瞰蓝疆</h1>
          </div>

          <nav class="flex items-center gap-2 ml-8">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300"
              :class="$route.path === item.path ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' : 'hover:bg-slate-100'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" :class="$route.path === item.path ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30' : 'bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-500'">
                <svg v-if="item.name === '首页'" class="w-4 h-4 transition-colors duration-300" :class="$route.path === item.path ? 'text-white' : 'text-slate-600 group-hover:text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <svg v-if="item.name === '多模态分割工作台'" class="w-4 h-4 transition-colors duration-300" :class="$route.path === item.path ? 'text-white' : 'text-slate-600 group-hover:text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <svg v-if="item.name === 'IoT数据管理'" class="w-4 h-4 transition-colors duration-300" :class="$route.path === item.path ? 'text-white' : 'text-slate-600 group-hover:text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <span class="text-sm font-medium whitespace-nowrap transition-colors duration-300" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'">{{ item.name }}</span>
            </router-link>
          </nav>

          <div class="ml-auto flex items-center gap-3">
            <button
              @click="toggleAIChat"
              class="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
            >
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-sm font-semibold">扣子AI</span>
              <div class="relative flex items-center justify-center w-2 h-2">
                <span class="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                <span class="relative w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
            </button>

            <button class="md:hidden p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-100 hover:bg-slate-100 transition-colors duration-300" @click="toggleMenu">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-show="isMenuOpen" class="md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-6 space-y-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300"
            :class="$route.path === item.path ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' : 'hover:bg-slate-50'"
            @click="isMenuOpen = false"
          >
            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="$route.path === item.path ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg' : 'bg-slate-100'">
              <svg v-if="item.name === '首页'" class="w-6 h-6" :class="$route.path === item.path ? 'text-white' : 'text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <svg v-if="item.name === '多模态分割工作台'" class="w-6 h-6" :class="$route.path === item.path ? 'text-white' : 'text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <svg v-if="item.name === 'IoT数据管理'" class="w-6 h-6" :class="$route.path === item.path ? 'text-white' : 'text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <div class="font-semibold" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-700'">{{ item.name }}</div>
              <div class="text-xs text-slate-400">{{ item.subtitle }}</div>
            </div>
          </router-link>
        </div>
      </Transition>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">慧瞰蓝疆</h3>
                <p class="text-xs text-blue-300 tracking-widest uppercase">Smart Ocean</p>
              </div>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">
              致力于海洋生物多样性监测与蓝碳经济发展，助力智慧海洋建设。
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6">核心功能</h4>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                RGB-X 双流驱动分割
              </li>
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                深度学习智能识别
              </li>
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                IoT 物联数据管理
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6">技术架构</h4>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                RGB-D 双流架构
              </li>
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                RGB-O 光流驱动
              </li>
              <li class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                水下图像增强
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6">联系我们</h4>
            <div class="space-y-4 text-slate-400 text-sm">
              <p>基于国家"十五五"规划及智慧海洋建设战略导向构建</p>
              <div class="flex gap-3 pt-2">
                <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-300 group">
                  <svg class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-300 group">
                  <svg class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="relative pt-8 border-t border-white/10">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-slate-400 text-sm">© 2026 慧瞰蓝疆智能监测系统. 守护蓝色疆土，共建生态文明.</p>
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              系统运行正常
            </div>
          </div>
        </div>
      </div>
    </footer>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showAIChat" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm" @click.self="toggleAIChat">
          <Transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-8"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-8"
          >
            <div v-if="showAIChat" class="absolute right-8 bottom-8 w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div class="relative px-6 py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                        <span class="absolute inset-0 w-full h-full bg-green-400 rounded-full animate-ping"></span>
                      </div>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-white">扣子AI 智能助手</h3>
                      <p class="text-xs text-blue-100">在线 · 随时为您服务</p>
                    </div>
                  </div>
                  <button @click="toggleAIChat" class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="flex-1 p-6 bg-gradient-to-b from-slate-50 to-white overflow-y-auto min-h-[300px]" ref="msgBox">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="flex items-start gap-4 mb-6 animate-fade-in"
                  :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
                >
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0"
                    :class="msg.role === 'user' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : ''"
                  >
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div
                    class="flex-1 max-w-[80%]"
                    :class="msg.role === 'user' ? 'text-right' : ''"
                  >
                    <div
                      class="bg-white rounded-2xl px-5 py-4 shadow-lg border text-left"
                      :class="msg.role === 'user' ? 'rounded-tr-sm bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0' : 'border-slate-100'"
                    >
                      <p class="text-slate-700 leading-relaxed whitespace-pre-wrap" :class="msg.role === 'user' ? 'text-white' : ''">{{ msg.content }}</p>
                    </div>
                    <p class="text-xs text-slate-400 mt-2" :class="msg.role === 'user' ? 'text-right' : ''">{{ index === messages.length - 1 ? '刚刚' : '' }}</p>
                  </div>
                </div>
                <div v-if="loading" class="flex items-start gap-4 mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div class="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg border border-slate-100">
                    <div class="flex items-center gap-1">
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="p-4 border-t border-slate-100 bg-white">
                <div class="flex items-center gap-3">
                  <input
                    v-model="inputText"
                    @keyup.enter="handleSend"
                    type="text"
                    placeholder="输入您的问题..."
                    :disabled="loading"
                    class="flex-1 px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all duration-300"
                  />
                  <button
                    @click="handleSend"
                    :disabled="loading"
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>