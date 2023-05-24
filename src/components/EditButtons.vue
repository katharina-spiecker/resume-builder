<template>
    <div class="mb-3" :class="buttonStyle">
        <button class="btn btn-primary btn-add mr-2" @click="$emit('addClicked')">+</button>
        <button v-if="showRemoveBtn" class="btn btn-danger btn-remove" @click="$emit('removeClicked')">-</button>
    </div>
</template>

<script>
    export default {
        name: 'EditButtons',
        props: {
            showRemoveBtn: Boolean,
            buttonType: String
        },
        computed: {
            buttonStyle(){
                return this.buttonType == 'small' ? 'btn-wrapper-small' : 'btn-wrapper';
            }
        }
    }
</script>