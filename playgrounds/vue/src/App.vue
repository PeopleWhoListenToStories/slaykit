<script setup lang="ts">
import { Watermark } from '@slaykit/watermark';
const watermark = new Watermark({
  image: "https://xulai.me/favicon.svg",
  width: 30,
  height: 30,
  gapX: 75,
  gapY: 75,
  opacity: 0.2,
  rotate: -22,
});

watermark.create().then(dataURL => {
  document.body.style.backgroundImage = `url(${dataURL})`;
});

/* @no-decimal */
const noSum = 0.1 + 0.2;
const sum = 0.1 + 0.2; // 原本会输出 0.30000000000000004
const difference = 0.3 - 0.1; // 原本可能输出 0.19999999999999998
const product = 0.1 * 0.2; // 原本可能输出 0.020000000000000004
const quotient = 0.3 / 0.1; // 原本可能输出 2.9999999999999996
const msg = 'hello' + 'word'

console.log('sum...', sum); // 输出 0.3
console.log('difference...', difference); // 输出 0.2
console.log('product...', product); // 输出 0.02
console.log('quotient...', quotient); // 输出 3
console.error('wo shi error')
console.warn('wo shi warn')
console.info('wo shi info')
console.debug('wo shi debug')
let _Val = 0
_Val += 0.2
_Val += 0.1
const val = { 
  /* @no-decimal */
  key0: 0.1 + 0.2, 
  key1: 0.1 + 0.2, 
  key2: 1 / 0.3, 
  key3: _Val 
}; // 查询参数对象

const url = '/api/slaykit/log'
const options = {
  method: 'POST', // 请求方法
  headers: {
    'Content-Type': 'application/json', // 设置内容类型为JSON
  },
  body: JSON.stringify(val), // 将数据转换为JSON字符串
};
// 使用fetch发送POST请求
fetch(url, options)
  .then(response => {
    // 检查响应状态
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // 解析响应为JSON
  })
  .then(data => {
    // 处理响应数据
    console.log('Success:', data);
  })
  .catch(error => {
    // 处理错误
    console.error('There has been a problem with your fetch operation:', error);
  });
</script>


<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <br>
    msg => {{ msg }}
    no sum => {{ noSum }}
    <h1>sum=>{{ sum }}</h1>
    <h1>quotient=>{{ quotient }}</h1>
    <h1>difference=>{{ difference }}</h1>
    <h1>product=>{{ product }}</h1>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
