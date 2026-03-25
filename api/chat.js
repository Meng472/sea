// api/chat.js

export const config = {
  runtime: 'edge', // 使用 Vercel Edge Runtime，流式响应更快
};

// ⚠️ 警告：将 Key 写在代码里非常不安全！请务必尽快更换为环境变量。
const ZHIPU_API_KEY = "68d85a1a27df763f"; 

export default async function handler(request) {
  // 1. 处理跨域预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    // 2. 读取前端发来的消息
    const body = await request.json();
    const userMessages = body.messages || [];

    // 3. 构造发给智谱 AI 的请求
    // 注意：智谱的 API Key 通常需要拼接 "Bearer " 前缀
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZHIPU_API_KEY}`, // 在这里使用 Key
      },
      body: JSON.stringify({
        model: 'glm-4', // 这里默认使用 glm-4，如果您是智能体 ID，请替换此处
        messages: userMessages,
        stream: true, // 开启流式输出
      }),
    });

    // 4. 检查智谱接口是否报错
    if (!response.ok) {
      const errorText = await response.text();
      console.error('智谱 API 报错:', errorText);
      return new Response(JSON.stringify({ error: '智谱 API 调用失败: ' + response.status }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 5. 将智谱返回的流直接透传给前端
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: '服务器内部错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
