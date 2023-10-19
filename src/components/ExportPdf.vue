<template>
    <CustomButton @click="exportPdf" btn-type="primary">
        Export resume pdf
    </CustomButton>
</template>

<script>
import CustomButton from './CustomButton.vue';

export default {
    components: {
        CustomButton
    },
    props: {
        resumeFormat: String
    },
    methods: {
        exportPdf() {
            const resume = document.getElementById('resume');
            const unit = this.resumeFormat == "a4" ? "mm" : "in";
            const pdfConfig = {
                margin: 0,
                filename: 'resume',
                jsPDF: { 
                unit: unit,
                format: this.resumeFormat,
                orientation: 'portrait' 
                }
            };
            html2pdf().set(pdfConfig).from(resume).save()
        }
    }
}
</script>