import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {IJokesSearchParams} from "@/types/jokes";
import {apiInstance} from "@/app/api";

export const useJokesStore = defineStore('jokes', () => {
  // Хранилище все данных
  let jokes = ref({})

  async function getJokes(params: IJokesSearchParams) {
    jokes.value = await apiInstance.get('jokes/search', {params})
      .then(res => res)
  }

  return {
    jokes,
    getJokes,
  }
})
