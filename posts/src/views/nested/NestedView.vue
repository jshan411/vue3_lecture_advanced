<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedOne', replace: true }"
        >
          <!-- replace:true로 하게 되면, pageA -> pageB -> NestedOne라고 했을 때, pageB의 history가 NestedOne으로 대체되며, NestedOne 페이지에서 뒤로가기를 하면 pageB가 아니라 pageA로 간다. -->
          Nested One
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active" to="/nested/two">
          Nested Two
        </RouterLink>
      </li>
    </ul>
    <hr class="my-4" />
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
