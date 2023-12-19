<template>
  <div
    class="button-wrapper"
    :style="{ textAlign: btnAlign }"
    :class="{ 'button-wrapper__down': moveDown }">
    <button
      v-if="showAddBtn"
      class="edit-btn edit-btn-add"
      @click="$emit('addClick')">
      {{ textAdd }}
    </button>
    <button
      v-if="showRemoveBtn"
      class="edit-btn edit-btn-remove"
      @click="$emit('removeClick')">
      {{ textRemove }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    showAddBtn: {
      type: Boolean,
      default: true,
    },
    showRemoveBtn: {
      type: Boolean,
      default: true,
    },
    textAdd: {
      type: String,
      default: "+",
    },
    textRemove: {
      type: String,
      default: "-",
    },
    btnAlign: {
      type: String,
      default: "center",
    },
    moveDown: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.edit-btn:hover {
  cursor: pointer;
}

.edit-btn {
  min-width: 20px;
  height: 20px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  margin-left: 8px;
}

.edit-btn-add {
  background-color: #3feee6;
  color: #000;
}

.edit-btn-add:hover {
  background-color: rgb(68, 219, 212);
}

.edit-btn-remove {
  background-color: #f97068;
  color: #fff;
}

.edit-btn-remove:hover {
  background-color: #e0635c;
}

.edit-off .edit-btn {
  display: none;
}

.button-wrapper__down {
  height: 0;
  text-align: right;
  position: relative;
  bottom: 4px;
}
</style>
