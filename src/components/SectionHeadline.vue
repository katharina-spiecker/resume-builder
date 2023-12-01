<template>
    <h4 class="section-headline" :contenteditable="editing" @input="notifyParent">{{ headline }}</h4>
</template>

<script>
    export default {
        props: {
            headline: {
                type: String
            },
            editing: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            notifyParent(event) {
                this.$emit("headlineEdited", event.target.innerText);
            }
        }
    }
</script>


<style scoped>
    .section-headline {
        font-size: 20px;
        font-weight: var(--headline-weight);
        margin-bottom: 15px;
        margin-top: 0;
    }

    .left-col .section-headline {
        border-bottom: 1px solid var(--highlight-color-left);
        padding-bottom: 5px;
        margin-right: -30px;
        padding-right: 10px;
        color: var(--highlight-color-left);
    }

    .right-col .section-headline {
        color: var(--highlight-color-right);
    }

</style>