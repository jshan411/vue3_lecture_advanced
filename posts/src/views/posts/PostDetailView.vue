<template>
  <div>
    <h1>현재 페이지 id: {{ id }}</h1>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="text-muted">{{ post.createdAt }}</div>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goPostListView">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goPostEditView">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getPostById, deletePost } from '../../api/posts'
import { reactive, ref } from 'vue'

// const route = useRoute()
// const id = route.params.id
const router = useRouter()

const props = defineProps({
  id: Number
})

const goPostListView = () => router.push({ name: 'PostList' })
const goPostEditView = () => router.push({ name: 'PostEdit', params: { id: props.id } })
// 아래와 같이 해도 충분
// const goPostEditView = () => router.push({ name: 'PostEdit' })
// console.log('post: ', getPostById(props.id))
const post = ref({})
// reactive()를 사용하는 것과의 차이
// (1) ref로 선언할 때의 장점: 객체로 한번에 할당 가능. But, .value를 달고다녀야 한다.
// (2) ref는 primitive, reference 관계 없이 사용 가능
// primative type: 정수, 실수, 문자, 논리 등 실제 데이터 값
// reference type: 객체의 주소를 참조
// const post = reactive({})
const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id)
    setPost(data[0])
    // console.log(data)
    // post.value = { ...data }
    // post.title = data.title
    // post.content = data.content
    // post.createdAt = data.createdAt
    // console.log('data: ', data[0])
  } catch (error) {
    console.error(error)
  }
}
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}
fetchPost()

const remove = async () => {
  try {
    if (confirm('삭제하시겠습니까?') === false) {
      return
    }
    await deletePost(props.id)
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
