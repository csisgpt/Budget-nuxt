<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <header class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">نمودار بلادرنگ</h2>
      <span class="text-xs text-slate-400">CSR only</span>
    </header>
    <svg ref="chartRef" class="mt-6 h-52 w-full" viewBox="0 0 400 160" role="img" aria-label="نمودار فعالیت"> </svg>
  </div>
</template>

<script setup lang="ts">
const chartRef = ref<SVGSVGElement | null>(null);
const data = reactive<number[]>(Array.from({ length: 16 }, () => Math.random() * 100));

const render = () => {
  if (!chartRef.value) return;
  const svg = chartRef.value;
  svg.innerHTML = '';
  const width = svg.viewBox.baseVal.width;
  const height = svg.viewBox.baseVal.height;
  const step = width / (data.length - 1);
  const path = data
    .map((value, index) => `${index === 0 ? 'M' : 'L'} ${index * step} ${height - (value / 100) * height}`)
    .join(' ');
  const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathEl.setAttribute('d', path);
  pathEl.setAttribute('fill', 'none');
  pathEl.setAttribute('stroke', '#10b981');
  pathEl.setAttribute('stroke-width', '3');
  svg.appendChild(pathEl);
};

onMounted(() => {
  render();
  const interval = setInterval(() => {
    data.shift();
    data.push(Math.random() * 100);
    render();
  }, 3000);
  onBeforeUnmount(() => clearInterval(interval));
});
</script>
