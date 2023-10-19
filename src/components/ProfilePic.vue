<template>
    <img
        v-if="show"
        :src="url"
        alt="profile picture"
        :class="{'circle': shape == 'round' }"
        class="profile-pic"
    >
</template>


<script>
export default {
    props: {
        url: String,
        show: Boolean,
        shape: String
    }
}
</script>


<style scoped>
.profile-pic {
  display: block;
  width: 160px;
  height: 160px;
  border: 5px solid var(--highlight-color-left);
  background-color: var(--highlight-color-left);;
  margin-bottom: 20px;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

.circle {
    border-radius: 50%;
}

</style>