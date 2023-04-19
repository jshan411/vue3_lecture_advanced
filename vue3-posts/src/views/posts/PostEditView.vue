<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goPostDetailView">취소</button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { getPostById, updatePost } from '../../api/posts'
import PostForm from '../../components/posts/PostForm.vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id)
    setForm(data)
  } catch (error) {
    console.error(error)
  }
}
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title
  form.value.content = content
}
fetchPost()

const edit = async () => {
  try {
    await updatePost(id, { ...form.value, createdAt: formattedDate })
    router.push({ name: 'PostDetail', params: { id } })
  } catch (error) {
    console.error(error)
  }
}

const goPostDetailView = () => router.push({ name: 'PostDetail', params: { id } })

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
// console.log(formattedDate)
</script>

<style lang="scss" scoped></style>
