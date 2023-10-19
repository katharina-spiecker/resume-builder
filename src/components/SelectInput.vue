<template>
    <label>
        <select class="custom-input" @change="$emit('updateSelection', $event.target.value)">
            <option
                v-for="option in options"
                :value="option.value"
                :key="option.value"
                :selected="defaultOption == option.value">
                {{ option.name }}
            </option>
        </select>
        {{ label }}
    </label>
</template>

<script>
    export default {
        props: {
            label: String,
            options: Array,
            defaultOption: String
        }
    }
</script>

<style scoped>
    label {
        display: flex;
        align-items: center;
    }

    select {
        display: inline-block;
        min-width: 80px;
        padding: 0.375rem 1.75rem 0.375rem 0.75rem;
        background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") right 0.75rem center/8px 10px no-repeat;
        appearance: none;
        margin-right: 8px;
    }
</style>