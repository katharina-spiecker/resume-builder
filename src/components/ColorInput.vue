<template>
    <label class="d-flex align-items-center">
        <input type="color" class="colorpicker mr-2" v-model="localColor">
        {{text}}
    </label>
</template>

<!-- config.primaryColor -->
<!-- config.secondaryColor -->
<!-- config.textColor -->
<script>
export default {
    name: "ColorInput",
    props: {
        text: String,
        color: String
    },
    emits: ["update"],
    data() {
        return {
            localColor: this.color
        }
    },
    watch: {
        localColor(event){
            this.$emit('update', event)
        }
    }

}
</script>