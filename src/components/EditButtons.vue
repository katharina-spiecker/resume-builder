<template>
    <div class="mb-3" :class="buttonStyle">
        <button v-if="showRemoveBtn" class="btn btn-danger btn-remove mr-2" @click="$emit('removeClicked')">-</button>
        <button class="btn btn-secondary btn-add" @click="$emit('addClicked')">+</button>
    </div>
</template>

<script>
    export default {
        name: 'EditButtons',
        props: ["showRemoveBtn", "buttonType"],
        computed: {
            buttonStyle(){
                return this.buttonType == 'small' ? 'btn-wrapper-small' : 'btn-wrapper';
            }
        }
    }
</script>