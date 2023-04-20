<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input
            v-model="params.title_like"
            type="text"
            class="form-control"
            placeholder="검색어를 입력 후 엔터를 눌러주세요."
          />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPostDetailView(post.id)"
        ></PostItem>
      </div>
    </div>
    <nav class="mt-3" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: params._page === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="--params._page">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: params._page === pageCount }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="++params._page">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <hr class="my-5" />
  <AppCard>
    <PostDetailView :id="1"></PostDetailView>
  </AppCard>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import PostItem from '../../components/posts/PostItem.vue'
import { getPosts } from '@/api/posts'
import { useRouter } from 'vue-router'
import PostDetailView from './PostDetailView.vue'
import AppCard from '../../components/AppCard.vue'
import { computed } from '@vue/reactivity'

const posts = ref([])
const params = ref({
  _limit: 3,
  _page: 1,
  title_like: ''
})
// pagination
const totalCount = ref(0)
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

const fetchPosts = async () => {
  // const { data } = await getPosts()
  // posts.value = data
  try {
    const { data } = await getPosts(params.value)
    posts.value = data.posts_results
    totalCount.value = data.total_length
    // console.log('data: ', data)/
    // console.log('totalCount: ', totalCount.value)
    // // totalCount.value = posts.value.length
    // console.log('params._limit: ', params.value._limit)
    // console.log('pageCount: ', pageCount.value)
    // console.log('page: ', params.value._page)
  } catch (error) {
    console.error(error)
  }
}
// fetchPosts()
watchEffect(fetchPosts)

watch(
  () => params.value._limit,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      params.value._page = 1
    }
  }
)

const router = useRouter()
const goPostDetailView = (id) => {
  //   router.push(`/posts/${id}`)
  router.push({
    name: 'PostDetail',
    params: {
      id
    }
  })
}
</script>

<style lang="scss" scoped></style>
