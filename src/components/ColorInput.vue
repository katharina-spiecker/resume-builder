<template>
    <label>
        <input type="color"
            class="color-picker"
            @input="$emit('colorChanged', $event.target.value)"
            :value="defaultColor"
        >
        {{ label }}
    </label>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "Choose a color"
        },
        defaultColor: {
            type: String
        }
    }
}
</script>


<style scoped>
    label {
        display: flex;
        align-items: center;
    }
    .color-picker {
        margin-right: 10px;
        /* offset strange height, width difference */
        width: 26px;
        height: 30px;
        padding: 0;
        border: none;
        background: transparent;
    }
</style>