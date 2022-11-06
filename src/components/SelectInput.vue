<template>
    <label class="d-flex align-items-center justify-content-start">
        <select v-model="localValue" class="custom-select  mr-2" style="width: 120px">
            <option v-for="option in options" :value="option.value" :key="option.name">{{option.name}}</option>
        </select>
        {{text}}
    </label>
</template>

<script>
    export default {
        name: "SelectInput",
        props: {
            text: String,
            selectedOption: String,
            options: Array
        },
        emits: [],
        data(){
            return {
                localValue: this.selectedOption
            }
        },
        watch: {
            localValue(newValue){
                this.$emit("update", newValue);
            }
        }
        
    }
</script>