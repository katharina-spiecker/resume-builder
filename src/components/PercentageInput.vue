<template>
    <label class="label-input-wrapper">
        <input type="number"
            :min="min"
            :max="max"
            :value="currentValue"
            class="custom-input"
            @change="$emit('percentageChanged', $event.target.value)"
        >
        % {{ label }}
    </label>
</template>

<script>

export default {
    props: {
        label: {
            type: String
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        currentValue: {
            default: 0
        }
    }
}

</script>

<style scoped>

    .label-input-wrapper {
        display: flex;
        align-items: center;
    }

    input {
        width: 50px;
        margin-right: 8px;
        display: block;
    }

</style>
