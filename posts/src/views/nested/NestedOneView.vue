<template>
  <div class="card">
    <div class="card-header">Nested One</div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <RouterLink class="btn btn-outline-dark" to="/nested">Go Nested</RouterLink>
      <!-- 아래와 같이 이동하게 되면, 페이지를 새로 렌더링하게된다. -->
      <!-- <a href="/nested" class="btn btn-danger">Go somewhere</a> -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
