<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goPostListView">목록</button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { createPost } from '../../api/posts'
import { ref } from 'vue'
import PostForm from '../../components/posts/PostForm.vue'

// back에서 저장할 때를 저장할거라 사실상 필요 없음
function formatDateToYYYYMMDD(date) {
  const year = String(date.getFullYear()).slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`
}

const formattedDate = formatDateToYYYYMMDD(new Date(Date.now()))

const router = useRouter()
const form = ref({
  title: null,
  content: null
})
const save = () => {
  try {
    createPost({
      ...form.value,
      createdAt: formattedDate
    })
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
  }
}
const goPostListView = () => router.push({ name: 'PostList' })
</script>

<style lang="scss" scoped></style>
