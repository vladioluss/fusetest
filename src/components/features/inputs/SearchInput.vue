<script setup lang="ts">
interface Props {
  id?: string
  type?: string
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: '',
  modelValue: '',
  placeholder: '',
})
</script>
<template>
  <input
      autofocus
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped lang="scss">
  input {
    filter: drop-shadow(0px 7px 12px rgba(100, 100, 111, 0.20));
    width: 100%;
    height: 65px;
    color: $light-blue;
    outline: none;
    border: 1px transparent solid;
    border-radius: 5px;
    padding-left: 30px;
    text-align: left;
    font-size: 22px;
    font-weight: 700;

    &::placeholder {
      color: $light-blue;
    }

    &:focus {
      border: 1px #c9c9c9 solid;
    }
}
</style>