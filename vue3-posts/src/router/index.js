import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
//// posts
import PostCreateView from '@/views/posts/PostCreateView.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostEditView from '@/views/posts/PostEditView.vue'
import PostListView from '@/views/posts/PostListView.vue'
//// nested
import NestedView from '@/views/nested/NestedView.vue'
import NestedHomeView from '@/views/nested/NestedHomeView.vue'
import NestedOneView from '@/views/nested/NestedOneView.vue'
import NestedTwoView from '@/views/nested/NestedTwoView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    // props: true
    props: (route) => {
      return {
        id: parseInt(route.params.id)
      }
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      { path: '', name: 'NestedHome', component: NestedHomeView },
      { path: 'one', name: 'NestedOne', component: NestedOneView },
      { path: 'two', name: 'NestedTwo', component: NestedTwoView }
    ]
  }
]

// children에서 경로를 지정할 때는 / 없어야 한다. /one 이렇게 쓰게되면, 절대경로 localhist:3000/one 으로 이해한다.
// 빈값으로 두면, 부모 주소에 해당한다.

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
