<template>
  <div class="chat-wrapper">
    <!-- 消息列表 -->
    <div class="message-container" ref="msgBox">
      <div 
        v-for="(msg, index) in messages" 
        :key="index" 
        :class="['msg-item', msg.role]"
      >
        <div class="msg-content">{{ msg.content }}</div>
      </div>
      <div v-if="loading" class="msg-item assistant">
        <div class="msg-content loading">正在思考中...</div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <el-input
        v-model="inputText"
        placeholder="请输入您的问题..."
        @keyup.enter="handleSend"
        :disabled="loading"
      />
      <el-button type="primary" @click="handleSend" :loading="loading">
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

// 状态定义
const messages = ref([]); // 对话历史
const inputText = ref(''); // 输入框内容
const loading = ref(false); // 加载状态
const msgBox = ref(null); // 滚动容器引用

// 模拟的用户ID（实际项目中应从登录态获取）
const USER_ID = 'user_12345';

const handleSend = async () => {
  const text = inputText.value.trim();
  if (!text || loading.value) return;

  // 1. 添加用户消息
  messages.value.push({ role: 'user', content: text });
  inputText.value = '';
  
  // 2. 准备接收 AI 回复
  loading.value = true;
  const aiMsgIndex = messages.value.length;
  messages.value.push({ role: 'assistant', content: '' }); // 占位

  try {
    // 3. 发起流式请求
    // 注意：这里请求的是你自己的后端代理接口，避免暴露 API Key
    const response = await fetch('/api/chat/zhipu', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        user_id: USER_ID
      })
    });

    // 4. 处理 SSE 流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      // 智谱 API 返回的格式通常是 data: {...}\n\n
      // 这里需要简单的解析逻辑
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.replace('data: ', '');
          if (jsonStr === '[DONE]') continue;
          
          try {
            const data = JSON.parse(jsonStr);
            // 智谱 GLM-4 格式: choices[0].delta.content
            const content = data.choices?.[0]?.delta?.content || '';
            if (content) {
              // 追加内容到最新的 AI 消息
              messages.value[aiMsgIndex].content += content;
              scrollToBottom();
            }
          } catch (e) {
            console.warn('JSON 解析错误:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('请求出错:', error);
    messages.value[aiMsgIndex].content = '抱歉，网络连接出现问题。';
  } finally {
    loading.value = false;
  }
};

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (msgBox.value) {
      msgBox.value.scrollTop = msgBox.value.scrollHeight;
    }
  });
};
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #eee;
}
.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f9f9f9;
}
.msg-item {
  margin-bottom: 16px;
  display: flex;
}
.msg-item.user {
  justify-content: flex-end;
}
.msg-item.assistant {
  justify-content: flex-start;
}
.msg-content {
  padding: 10px 16px;
  border-radius: 8px;
  max-width: 70%;
  white-space: pre-wrap; /* 保留换行 */
}
.msg-item.user .msg-content {
  background-color: #409eff;
  color: white;
}
.msg-item.assistant .msg-content {
  background-color: white;
  border: 1px solid #ddd;
}
.input-area {
  display: flex;
  padding: 16px;
  background: white;
  border-top: 1px solid #eee;
}
</style>
