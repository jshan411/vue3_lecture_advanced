<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">마지막 업데이트: {{ createdAt }}</p>
  </AppCard>
</template>

<script setup>
import AppCard from '../AppCard.vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: [String, Date, Number]
  }
})
</script>

<style lang="scss" scoped></style>
