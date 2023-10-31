<script setup lang="ts">
import {useformatDate} from '@/composable/useformatDate.js'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

function linkTo(link: string) {
  return window.open(link ,'_blank');
}
</script>

<template>
  <div class="grid">
    <div
        class="item"
        v-for="item in props.items"
        :key="item.id"
        @click="linkTo(item.url)"
    >
      <p class="text">{{ item.value }}</p>
      <div class="sub-text">
        <p>{{ item.id }}</p>
        <p>{{ useformatDate(item.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1920px;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 60px;
}

.item {
  max-width: calc(100% / 2 - 15px);
  width: 100%;
  min-width: 300px;
  box-shadow: 0 7px 25px 0 rgba(100, 100, 111, 0.20);
  padding: 40px 40px 25px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
  cursor: pointer;

  &:nth-child(n + 3) {
    max-width: calc(100% / 3 - 15px);
    min-height: 160px;

    .text {
      font-size: 16px;
      line-height: 24px;
    }

    /* Под мобильные устройства */
    @media (max-width: 767px) {
      max-width: 100%;
    }
  }

  /* Под мобильные устройства */
  @media (max-width: 767px) {
    max-width: 100%;
  }
}

.text {
  color: $main-black;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 10px;
}

.sub-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: $subtitle-gray;
  font-size: 14px;
}
</style>