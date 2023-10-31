<script setup lang="ts">
import SearchInput from "@/components/features/inputs/SearchInput.vue";
import Grid from "@/components/features/grids/Grid.vue";
import {computed, ref, watch} from "vue";
import {useJokesStore} from "@/stores/modules/jokes";
import type {IJokesSearchParams} from "@/types/jokes";
import ThePreloader from "@/components/ThePreloader.vue";


// Текст ошибки
const ERR_LABEL = 'Нужно ввести более 3х символов';

const preloader = ref<boolean>(false)

// Вызываем стор
const jokesStore = useJokesStore()

// Храним ошибки
const errors = ref<string>('')

// Поле поиска
const text = ref<string>('')

// Показывать ли надпись "Found jokes"
const isCountShow = ref<boolean>(false)

// Параметры запроса
const params = computed<IJokesSearchParams>(() => ({ query: text.value }))

// Валидация и запрос данных
const validateAndFetch = () => {
  resetErrors()

  if (isSearchValid.value) {
    preloader.value = true
    isCountShow.value = true

    // Отправляем запрос
    jokesStore.getJokes(params.value)
        .catch(err => {
          // Покажем ошибку от сервера
          isCountShow.value = false
          errors.value = err.data.message
        })
        .finally(() => preloader.value = false)
  } else errors.value = ERR_LABEL
}

// После 3х символов в инпуте можно отправлять запрос
watch(text, validateAndFetch)

// Сброс ошибок
const resetErrors = () => {
  errors.value = ''
}

// Валидация поиска
const isSearchValid = computed(() => text.value.length > 3)

// Отображение ошибок
const hasErrors = computed(() => !!errors.value)
</script>

<template>
  <main>
    <div class="wrapper">
      <SearchInput
          v-model="text"
          placeholder="Search jokes..."
      />
      <div
          v-if="isCountShow"
          class="count"
      >
        <p>Found jokes: {{ jokesStore.jokes?.total}}</p>
      </div>
      <span
          v-if="hasErrors"
          class="errors"
      >
        {{ errors }}
      </span>
    </div>
    <Grid :items="jokesStore.jokes?.result"/>
  </main>

  <ThePreloader v-if="preloader"/>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  max-width: 650px;
  width: 100%;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    margin-top: 20px;
  }
}

.count {
  margin-top: 20px;
  margin-left: 35px;

  p {
    color: $main-black;
    font-size: 16px;
    font-weight: 400;
  }
}

.errors {
  color: #ce6262;
  margin-top: 15px;
}
</style>