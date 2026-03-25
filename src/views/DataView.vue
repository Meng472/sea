<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const iotData = ref([
  { id: 1, timestamp: '2026-03-20 08:32:15', location: '22.5431°N, 114.0579°E', depth: 45.2, status: '良好', temperature: 18.5, salinity: 34.2 },
  { id: 2, timestamp: '2026-03-20 08:45:22', location: '22.5123°N, 114.0621°E', depth: 62.8, status: '良好', temperature: 16.2, salinity: 34.5 },
  { id: 3, timestamp: '2026-03-20 09:12:08', location: '22.4897°N, 114.0488°E', depth: 38.5, status: '轻度污染', temperature: 19.1, salinity: 33.8 },
  { id: 4, timestamp: '2026-03-20 09:28:34', location: '22.5678°N, 114.0734°E', depth: 78.3, status: '良好', temperature: 14.8, salinity: 34.8 },
  { id: 5, timestamp: '2026-03-20 09:45:51', location: '22.5234°N, 114.0392°E', depth: 52.1, status: '中度污染', temperature: 17.6, salinity: 33.2 },
  { id: 6, timestamp: '2026-03-20 10:03:17', location: '22.5012°N, 114.0567°E', depth: 28.9, status: '良好', temperature: 20.3, salinity: 34.1 },
  { id: 7, timestamp: '2026-03-20 10:18:42', location: '22.5345°N, 114.0712°E', depth: 95.6, status: '良好', temperature: 13.5, salinity: 35.0 },
  { id: 8, timestamp: '2026-03-20 10:35:29', location: '22.4789°N, 114.0445°E', depth: 41.7, status: '轻度污染', temperature: 18.9, salinity: 33.9 },
  { id: 9, timestamp: '2026-03-20 10:52:03', location: '22.5567°N, 114.0689°E', depth: 67.4, status: '良好', temperature: 15.7, salinity: 34.4 },
  { id: 10, timestamp: '2026-03-20 11:08:16', location: '22.4923°N, 114.0523°E', depth: 33.2, status: '良好', temperature: 19.5, salinity: 34.0 },
  { id: 11, timestamp: '2026-03-20 11:25:44', location: '22.5211°N, 114.0645°E', depth: 58.9, status: '中度污染', temperature: 16.8, salinity: 33.4 },
  { id: 12, timestamp: '2026-03-20 11:42:37', location: '22.5432°N, 114.0412°E', depth: 72.1, status: '良好', temperature: 15.1, salinity: 34.6 },
  { id: 13, timestamp: '2026-03-20 12:01:28', location: '22.5078°N, 114.0578°E', depth: 25.6, status: '轻度污染', temperature: 21.2, salinity: 33.6 },
  { id: 14, timestamp: '2026-03-20 12:18:55', location: '22.5321°N, 114.0723°E', depth: 88.4, status: '良好', temperature: 14.2, salinity: 34.9 },
  { id: 15, timestamp: '2026-03-20 12:35:12', location: '22.4856°N, 114.0498°E', depth: 47.3, status: '良好', temperature: 17.8, salinity: 34.1 },
  { id: 16, timestamp: '2026-03-20 12:52:41', location: '22.5189°N, 114.0634°E', depth: 36.8, status: '中度污染', temperature: 18.3, salinity: 33.1 },
  { id: 17, timestamp: '2026-03-20 13:08:59', location: '22.5498°N, 114.0545°E', depth: 81.2, status: '良好', temperature: 14.9, salinity: 34.7 },
  { id: 18, timestamp: '2026-03-20 13:25:23', location: '22.4767°N, 114.0467°E', depth: 55.6, status: '轻度污染', temperature: 17.2, salinity: 33.7 },
  { id: 19, timestamp: '2026-03-20 13:42:08', location: '22.5278°N, 114.0698°E', depth: 69.7, status: '良好', temperature: 15.9, salinity: 34.3 },
  { id: 20, timestamp: '2026-03-20 13:58:34', location: '22.5012°N, 114.0534°E', depth: 31.4, status: '良好', temperature: 19.8, salinity: 34.0 }
])

const filteredData = computed(() => {
  return iotData.value.filter(item => {
    const matchSearch = !searchQuery.value ||
      item.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.timestamp.includes(searchQuery.value)
    const matchStatus = !statusFilter.value || item.status === statusFilter.value
    return matchSearch && matchStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const statusOptions = ['良好', '轻度污染', '中度污染', '重度污染']

const statusColorMap = {
  '良好': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', gradient: 'from-emerald-400 to-teal-500' },
  '轻度污染': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', gradient: 'from-amber-400 to-orange-500' },
  '中度污染': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', gradient: 'from-orange-400 to-red-500' },
  '重度污染': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', gradient: 'from-red-400 to-rose-500' }
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  currentPage.value = page
}

const exportData = (format) => {
  const headers = ['ID', '采集时间 (UTC)', '经纬度地点', '水深 (m)', '温度 (°C)', '盐度 (‰)', '水质评估']
  const rows = filteredData.value.map(item => [
    item.id,
    item.timestamp,
    item.location,
    item.depth,
    item.temperature,
    item.salinity,
    item.status
  ])

  let content = headers.join(',') + '\n'
  rows.forEach(row => {
    content += row.join(',') + '\n'
  })

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `IoT数据_${new Date().toISOString().split('T')[0]}.${format}`
  link.click()
}

const stats = computed(() => ({
  total: iotData.value.length,
  good: iotData.value.filter(d => d.status === '良好').length,
  mild: iotData.value.filter(d => d.status === '轻度污染').length,
  moderate: iotData.value.filter(d => d.status === '中度污染').length
}))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="mb-10">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">IoT 数据组织与管理</h1>
        <p class="text-slate-500">感知端巡航船采集的物联数据监控面板</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div class="group relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100/50 hover:shadow-xl transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1">{{ stats.total }}</div>
            <div class="text-sm text-slate-400">数据总量</div>
          </div>
        </div>
        <div class="group relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100/50 hover:shadow-xl transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">{{ stats.good }}</div>
            <div class="text-sm text-slate-400">良好</div>
          </div>
        </div>
        <div class="group relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100/50 hover:shadow-xl transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div class="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">{{ stats.mild }}</div>
            <div class="text-sm text-slate-400">轻度污染</div>
          </div>
        </div>
        <div class="group relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100/50 hover:shadow-xl transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">{{ stats.moderate }}</div>
            <div class="text-sm text-slate-400">中度污染</div>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 overflow-hidden">
        <div class="p-6 border-b border-slate-100/50">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex flex-col sm:flex-row gap-4 flex-1">
              <div class="relative flex-1 max-w-md">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜索经纬度或时间..."
                  class="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <select v-model="statusFilter" class="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                <option value="">所有状态</option>
                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
              </select>
            </div>
            <button @click="exportData('csv')" class="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                导出CSV
              </span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50/80">
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">采集时间 (UTC)</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">经纬度地点</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">水深数值 (m)</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">水温 (°C)</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">盐度 (‰)</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">水质评估状态</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100/50">
              <tr
                v-for="item in paginatedData"
                :key="item.id"
                class="hover:bg-blue-50/50 transition-colors duration-200 group"
              >
                <td class="px-6 py-4 text-sm text-slate-600">{{ item.timestamp }}</td>
                <td class="px-6 py-4 text-sm font-mono text-slate-700 group-hover:text-blue-600 transition-colors">{{ item.location }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ item.depth.toFixed(1) }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ item.temperature.toFixed(1) }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ item.salinity.toFixed(1) }}</td>
                <td class="px-6 py-4">
                  <span :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium', statusColorMap[item.status].bg, statusColorMap[item.status].text]">
                    <span :class="['w-1.5 h-1.5 rounded-full', statusColorMap[item.status].dot]"></span>
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="paginatedData.length === 0" class="text-center py-16">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-slate-500">没有找到匹配的数据</p>
        </div>

        <div v-if="paginatedData.length > 0" class="p-6 border-t border-slate-100/50 bg-slate-50/50">
          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-500">
              显示 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredData.length) }} 条，共 {{ filteredData.length }} 条
            </p>
            <div class="flex items-center gap-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                上一页
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300',
                  page === currentPage
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300 hover:text-blue-600'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>