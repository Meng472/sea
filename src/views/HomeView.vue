<script setup>
import { ref, onMounted } from 'vue'

const challenges = [
  {
    title: '光照不足',
    description: '深海环境中光线随水深指数衰减，蓝绿光成为唯一可见光源，传统视觉算法难以获取足够图像信息。',
    icon: 'sun',
    gradient: 'from-amber-400 via-orange-500 to-red-500'
  },
  {
    title: '能见度低',
    description: '水体中悬浮颗粒造成严重的散射和吸收，导致图像模糊、对比度下降，边缘信息严重丢失。',
    icon: 'eye',
    gradient: 'from-slate-400 via-gray-500 to-zinc-600'
  },
  {
    title: '背景杂乱',
    description: '海底地形、礁石、水草等背景元素复杂多样，与目标物体形成干扰，增加分割难度。',
    icon: 'layers',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600'
  },
  {
    title: '生物伪装',
    description: '许多海洋生物具有极强伪装能力，与周围环境高度融合，传统方法难以准确识别和分割。',
    icon: 'ghost',
    gradient: 'from-violet-500 via-purple-500 to-indigo-600'
  }
]

const techFeatures = [
  {
    title: 'RGB-D 双流架构',
    description: '融合可见光图像与深度图信息，实现空间感知的精准理解',
    image: '/图片/深度图2.png'
  },
  {
    title: 'RGB-O 光流驱动',
    description: '引入光流图捕捉动态信息，增强运动目标的检测能力',
    image: '/图片/光流图1.png'
  },
  {
    title: '水下图像增强',
    description: '专为水下环境设计的图像预处理算法，提升视觉质量',
    image: '/图片/RGB1.png'
  }
]

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const isVisible = ref(false)
const challengeVisible = ref(false)
const techVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  setTimeout(() => {
    challengeVisible.value = true
  }, 300)
  setTimeout(() => {
    techVisible.value = true
  }, 500)
})
</script>

<template>
  <div class="home-page">
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50"></div>
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/30 top-20 -right-20 animate-float-slow"></div>
        <div class="absolute w-80 h-80 rounded-full bg-gradient-to-br from-sky-200/40 to-blue-200/30 bottom-20 -left-20 animate-float-medium"></div>
        <div class="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/20 top-1/3 right-1/4 animate-float-fast"></div>
        <div class="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-300/20 to-sky-300/20 bottom-1/3 left-1/3 animate-pulse-slow"></div>
        <div class="absolute w-3 h-3 bg-blue-400/60 rounded-full top-1/4 left-1/4 animate-sparkle"></div>
        <div class="absolute w-2 h-2 bg-cyan-400/60 rounded-full top-1/3 right-1/3 animate-sparkle-delay-1"></div>
        <div class="absolute w-2.5 h-2.5 bg-sky-400/60 rounded-full bottom-1/4 right-1/4 animate-sparkle-delay-2"></div>
        <div class="absolute w-2 h-2 bg-blue-300/60 rounded-full top-2/3 left-1/3 animate-sparkle-delay-3"></div>
        <div class="absolute w-4 h-4 bg-blue-200/40 rounded-full top-40 left-20 animate-ripple-slow"></div>
        <div class="absolute w-6 h-6 bg-cyan-200/30 rounded-full bottom-40 right-20 animate-ripple-slow-delay-1"></div>
        <div class="absolute w-3 h-3 bg-sky-200/50 rounded-full top-1/2 right-1/3 animate-ripple-slow-delay-2"></div>
      </div>
      
      <div class="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div class="mb-8">
          <span class="inline-flex items-center gap-2 px-5 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-200 text-sm text-blue-600 shadow-sm animate-fade-in-up">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            国家"十五五"规划智慧海洋建设项目
          </span>
        </div>
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-up-delay-1">
          <span class="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent animate-gradient-x">慧瞰蓝疆</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-6 leading-relaxed animate-fade-in-up-delay-2">
          在国家"十五五"规划及"智慧海洋"建设战略导向下<br class="hidden md:block" />
          推动海洋生物多样性"零损害"监测与"蓝碳经济"高质量发展
        </p>
        
        <p class="text-lg text-slate-500 max-w-2xl mx-auto mb-12 animate-fade-in-up-delay-3">
          基于 RGB-X 双流驱动的海洋目标精准分割与感知系统
        </p>
        
        <div class="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up-delay-4">
          <button @click="scrollToSection('challenges')" class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1">
            <span class="flex items-center gap-2">
              探索技术挑战
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </span>
          </button>
          <router-link to="/segmentation" class="group px-8 py-4 bg-white border border-blue-200 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <span class="flex items-center gap-2">
              进入工作台
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </router-link>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="flex flex-col items-center gap-2 text-blue-400">
          <span class="text-xs">向下滚动</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <section id="challenges" class="py-32 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <span class="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">技术挑战</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4">水下视觉感知挑战</h2>
          <p class="text-slate-500 max-w-2xl mx-auto text-lg">
            深海环境对计算机视觉算法提出了前所未有的挑战
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(challenge, index) in challenges"
            :key="index"
            class="group relative animate-stagger"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative h-full p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer group-hover:-translate-y-2">
              <div :class="`w-16 h-16 rounded-2xl bg-gradient-to-br ${challenge.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`">
                <svg v-if="challenge.icon === 'sun'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <svg v-if="challenge.icon === 'eye'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-if="challenge.icon === 'layers'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <svg v-if="challenge.icon === 'ghost'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{{ challenge.title }}</h3>
              <p class="text-slate-500 leading-relaxed">{{ challenge.description }}</p>
              <div class="mt-6 pt-4 border-t border-slate-100">
                <span class="inline-flex items-center gap-1 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  了解更多
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-32 bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <span class="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium mb-4">核心方案</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4">核心技术方案</h2>
          <p class="text-slate-500 max-w-3xl mx-auto text-lg">
            基于 RGB-X 双流驱动的海洋目标精准分割与感知系统<br/>
            支持 RGB-D（深度图）与 RGB-O（光流图）双驱动架构
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div
            v-for="(tech, index) in techFeatures"
            :key="index"
            class="group relative"
          >
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
              <div class="relative h-56 overflow-hidden">
                <img
                  :src="tech.image"
                  :alt="tech.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl text-white text-sm font-medium border border-white/20">
                    {{ index === 0 ? 'RGB-D' : index === 1 ? 'RGB-O' : '增强' }}
                  </span>
                </div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/20">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{{ tech.title }}</h3>
                <p class="text-slate-500 leading-relaxed">{{ tech.description }}</p>
                <div class="mt-6 flex items-center gap-1 text-blue-500">
                  <span class="text-sm font-medium">查看详情</span>
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-b from-blue-50 to-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">多模态分割效果展示</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">融合原图、深度图、光流图、真值图，实现精准的水下目标分割</p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-3 group cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              <img src="/图片/RGB2.jpg" alt="原图" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                <span class="text-white font-medium text-lg">原图</span>
                <p class="text-blue-200 text-xs mt-1">RGB可见光图像</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 group cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              <img src="/图片/深度图2.png" alt="深度图" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/20 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                <span class="text-white font-medium text-lg">深度图</span>
                <p class="text-cyan-200 text-xs mt-1">Depth Map 空间深度</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 group cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              <img src="/图片/光流图1.png" alt="光流图" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/20 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                <span class="text-white font-medium text-lg">光流图</span>
                <p class="text-violet-200 text-xs mt-1">Optical Flow 运动信息</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 group cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              <img src="/图片/GT1.png" alt="真值图" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/20 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                <span class="text-white font-medium text-lg">真值图</span>
                <p class="text-emerald-200 text-xs mt-1">Ground Truth 标注结果</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <div class="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-full shadow-lg">
            <div class="flex items-center gap-2 group cursor-pointer">
              <div class="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
              <span class="text-sm text-slate-600 group-hover:text-emerald-600 transition-colors duration-300">精准分割</span>
            </div>
            <div class="flex items-center gap-2 group cursor-pointer">
              <div class="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform duration-300 animate-pulse" style="animation-delay: 0.2s;"></div>
              <span class="text-sm text-slate-600 group-hover:text-blue-600 transition-colors duration-300">实时处理</span>
            </div>
            <div class="flex items-center gap-2 group cursor-pointer">
              <div class="w-3 h-3 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform duration-300 animate-pulse" style="animation-delay: 0.4s;"></div>
              <span class="text-sm text-slate-600 group-hover:text-cyan-600 transition-colors duration-300">多模态融合</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-32 bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/20 top-20 -right-40 animate-float-slow"></div>
        <div class="absolute w-80 h-80 rounded-full bg-gradient-to-br from-sky-200/20 to-blue-200/20 bottom-20 -left-40 animate-float-medium"></div>
        <div class="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-200/15 to-blue-200/15 top-1/2 left-1/4 animate-float-fast"></div>
        <div class="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/15 to-sky-200/15 bottom-1/3 right-1/4 animate-pulse-slow"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">守护蓝色疆土，共建生态文明</h2>
        <p class="text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed">
          慧瞰蓝疆系统通过先进的计算机视觉与人工智能技术，实现对海洋生态系统的智能化监测与保护，助力国家智慧海洋战略目标的实现。
        </p>
        
        <div class="max-w-5xl mx-auto">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100/50 p-10 mb-12">
            <h3 class="text-2xl font-bold text-slate-800 mb-8">系统工作流程</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="group text-center p-6 rounded-2xl hover:bg-blue-50/50 transition-all duration-500 cursor-pointer hover:scale-105">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">1</div>
                <h4 class="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">图像采集</h4>
                <p class="text-sm text-slate-500">RGB-D相机与光流传感器实时采集水下图像数据</p>
              </div>
              <div class="group text-center p-6 rounded-2xl hover:bg-cyan-50/50 transition-all duration-500 cursor-pointer hover:scale-105">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">2</div>
                <h4 class="font-semibold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">双流融合</h4>
                <p class="text-sm text-slate-500">深度图与光流图特征提取，RGB-X双流驱动融合</p>
              </div>
              <div class="group text-center p-6 rounded-2xl hover:bg-emerald-50/50 transition-all duration-500 cursor-pointer hover:scale-105">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">3</div>
                <h4 class="font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">AI分割</h4>
                <p class="text-sm text-slate-500">深度学习模型精准识别与分割目标物体</p>
              </div>
              <div class="group text-center p-6 rounded-2xl hover:bg-violet-50/50 transition-all duration-500 cursor-pointer hover:scale-105">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">4</div>
                <h4 class="font-semibold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors duration-300">智能分析</h4>
                <p class="text-sm text-slate-500">生物多样性评估与生态监测报告生成</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100/50 p-10">
            <h3 class="text-2xl font-bold text-slate-800 mb-6">加入智慧海洋建设</h3>
            <p class="text-slate-600 mb-8 leading-relaxed">
              慧瞰蓝疆系统诚邀各界合作伙伴，共同推进海洋生态保护与智慧海洋建设，为建设海洋强国贡献力量。
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <router-link to="/segmentation" class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <span class="relative z-10 flex items-center gap-2">
                  立即体验系统
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </router-link>
              <router-link to="/data" class="group relative px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 shadow-lg overflow-hidden">
                <span class="relative z-10 flex items-center gap-2">
                  查看数据平台
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-20px, -15px) scale(1.05);
  }
  50% {
    transform: translate(-10px, -25px) scale(1.02);
  }
  75% {
    transform: translate(10px, -10px) scale(1.03);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(15px, -20px) rotate(3deg);
  }
  50% {
    transform: translate(25px, -10px) rotate(5deg);
  }
  75% {
    transform: translate(10px, 10px) rotate(2deg);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-15px, -20px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  75% {
    transform: rotate(-3deg);
  }
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ripple-slow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stagger-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes tech-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes cta-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

@keyframes float-glow {
  0%, 100% {
    transform: translateY(0) scale(1);
    filter: brightness(1);
  }
  50% {
    transform: translateY(-10px) scale(1.02);
    filter: brightness(1.1);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes scale-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out;
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
}

.animate-ripple {
  animation: ripple 1.5s linear infinite;
}

.animate-sparkle {
  animation: sparkle 3s ease-in-out infinite;
}

.animate-sparkle-delay-1 {
  animation: sparkle 3s ease-in-out infinite 0.75s;
}

.animate-sparkle-delay-2 {
  animation: sparkle 3s ease-in-out infinite 1.5s;
}

.animate-sparkle-delay-3 {
  animation: sparkle 3s ease-in-out infinite 2.25s;
}

.animate-ripple-slow {
  animation: ripple-slow 4s ease-in-out infinite;
}

.animate-ripple-slow-delay-1 {
  animation: ripple-slow 4s ease-in-out infinite 1.3s;
}

.animate-ripple-slow-delay-2 {
  animation: ripple-slow 4s ease-in-out infinite 2.6s;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up-delay-1 {
  animation: fade-in-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-up-delay-2 {
  animation: fade-in-up 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-fade-in-up-delay-3 {
  animation: fade-in-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-fade-in-up-delay-4 {
  animation: fade-in-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-stagger {
  animation: stagger-in 0.6s ease-out forwards;
  opacity: 0;
}

.animate-tech-stagger {
  animation: tech-float 0.8s ease-out forwards;
  opacity: 0;
}

.animate-cta-stagger {
  animation: cta-pulse 0.6s ease-out forwards;
  opacity: 0;
}
</style>