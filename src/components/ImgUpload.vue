<template>
    <label>
        Upload Image
        <input type="file"
            accept="image/jpeg, image/png, image/jpg"
            @change="changeImage">
    </label>
</template>

<script>
    export default {
        methods: {
            changeImage(event) {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                        this.$emit('imageChanged', reader.result)
                    });
                    reader.readAsDataURL(selectedFile);
                }
            }
        }
    }
</script>