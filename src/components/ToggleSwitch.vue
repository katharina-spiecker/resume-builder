<!-- in lesson 2.4 , this component is named EditToggle. In lesson 3.2 we rename it to ToggleSwitch so we can reuse it -->
<template>
  <div class="switch-wrapper">
    <label>
      <span v-if="offLabel" style="margin-right: 10px">{{ offLabel }}</span>

      <div class="switch">
        <input type="checkbox" @click="onToggle" :checked="toggleActive" />
        <span class="slider"></span>
      </div>

      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    offLabel: {
      type: String,
      default: null,
    },
    toggleActive: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onToggle(event) {
      this.$emit("switchToggled", event.target.checked);
    },
  },
};
</script>

<style scoped>
.switch-wrapper {
  display: flex;
  align-items: center;
  margin-left: auto;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 25px;
  margin-right: 10px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 6px;
  bottom: 5px;
  background-color: rgb(255, 255, 255);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-black);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-black);
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

label {
  display: flex;
  align-items: center;
}
</style>
