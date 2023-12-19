<template>
  <div class="inner-section" :class="{ 'inner-section__editing': editing }">
    <div class="entry-title-row">
      <div
        class="resumeentry-title"
        :contenteditable="editing"
        @input="$emit('edit', $event, 'title')"
      >
        {{ item.title }}
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="resumeentry-location">
        <span
          :contenteditable="editing"
          @input="$emit('edit', $event, isEducation ? 'university' : 'company')"
        >
          {{ isEducation ? item.university : item.company }} </span
        >,
        <span
          :contenteditable="editing"
          @input="$emit('edit', $event, 'location')"
        >
          {{ item.location }}
        </span>
      </div>
      <div
        class="resumeentry-date"
        :contenteditable="editing"
        @input="$emit('edit', $event, 'date')"
      >
        {{ item.date }}
      </div>
    </div>
    <ul>
      <li
        v-for="(desc, index) in item.description"
        :key="index"
        :contenteditable="editing"
        @input="$emit('editDesc', $event, index)"
      >
        {{ desc }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    editing: Boolean,
  },
  computed: {
    isEducation() {
      // can be value but also empty string in case edited. but will always be defined if eduction entry
      if (this.item.university === undefined) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.entry-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 3px;
}

.resumeentry-title {
  font-size: 16px;
  /* text-transform: uppercase; */
  font-weight: 600;
  /* color: var(--highlight-color-right); */
}

.inner-section {
  margin-bottom: 20px;
}

.inner-section__editing {
  margin-bottom: 10px;
}

.resumeentry-date,
.resumeentry-location {
  font-size: 14px;
  /* font-weight: 300; */
}

.resumeentry-date {
  font-style: italic;
  color: var(--highlight-color-right);
}

li {
  font-size: 15px;
}
</style>
