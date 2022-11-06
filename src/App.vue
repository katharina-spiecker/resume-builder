<template>
  <div class="container my-4" :style="cssVariables">
        <div class="d-flex justify-content-end no-print">
            <button class="btn btn btn-primary mb-4" @click="exportPdf">Export pdf / Print</button>
        </div>

        <div class="row main-wrapper" ref="mainWrapper">
            <div class="left-col" :style="{width: widthLeft}">
                <div class="left-col__personal-wrapper">
                    <div class="img-wrapper mb-4 d-flex justify-content-center w-100">
                        <img :src="config.imageUrl" :class="{'rounded-circle': config.imageShape == 'round'}">
                    </div>
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'personal')">{{config.headlines.personal}}</h5>
                    <ContactSection :contact="config.contact" @contactInfoUpdated="updateContactInfo"/>
                </div>
                <div id="qualifications-section" class="mt-5">
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'qualifications')">{{config.headlines.qualifications}}</h5>
                    <ul>
                        <li v-for="(qualification, index) in config.qualifications" :key="index">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.qualifications[index]">
                        </li>
                    </ul>

                    <EditButtons v-if="isEditable"
                        :showRemoveBtn="config.qualifications[0] ? true: false"
                        buttonType="large"
                        @removeClicked="generalRemove('qualifications')"
                        @addClicked="addQualification">
                    </EditButtons>

                </div>
                <div id="languages-section" class="mt-5">
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'language')">{{config.headlines.language}}</h5>
                    <ul>
                        <li v-for="(language, index) in config.languages" :key="index">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.languages[index].name">
                        </li>
                    </ul>

                    <EditButtons v-if="isEditable"
                        :showRemoveBtn="config.languages[0] ? true: false"
                        buttonType="large"
                        @removeClicked="generalRemove('languages')"
                        @addClicked="addLanguage">
                    </EditButtons>
                </div>
            </div>
            <div class="right-col" :style="{width: widthRight}">
                <h3 class="right-col__main-headline pb-3 mb-0">
                    <input class="pseudo-text-input w-100" type="text" v-model="config.name">
                </h3>
                <h5 class="right-col__subtitle py-3 mb-4">
                    <input class="pseudo-text-input w-100" type="text" v-model="config.title">
                </h5>
                <div>
                    <h4 class="right-col__section-headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'experience')">{{config.headlines.experience}}</h4>
                    <div class="card-text" v-for="(experience, index) in config.experiences" :key="index">
                        <h6 class="right-col__sub-headline">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.experiences[index].role">
                        </h6>
                        <div class="d-flex">
                            <input class="pseudo-text-input w-50" type="text" v-model="config.experiences[index].company">
                            <input class="pseudo-text-input ml-auto w-50 text-right" type="text" v-model="config.experiences[index].date">
                        </div>
                        <ul>
                            <li v-for="(item, i) in experience.descriptionItems" :key="i">
                                <input class="pseudo-text-input w-100" type="text" v-model="config.experiences[index].descriptionItems[i]">
                            </li>
                        </ul>

                        <EditButtons v-if="isEditable" :showRemoveBtn="experience.descriptionItems[0] ? true: false"
                            buttonType="small"
                            @removeClicked="removeExperienceItem(index)"
                            @addClicked="addExperienceItem(index)">
                        </EditButtons>
                    </div>

                    <EditButtons v-if="isEditable" :showRemoveBtn="config.experiences[0] ? true: false"
                        buttonType="large"
                        @removeClicked="generalRemove('experiences')"
                        @addClicked="addExperience(index)">
                   </EditButtons>

                    <h4 class="mt-5 right-col__section-headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'education')">{{config.headlines.education}}</h4>
                    <div class="card-text" v-for="(item, index) in config.education" :key="index">
                        <h6 class="right-col__sub-headline">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.education[index].title">
                        </h6>
                        <div class="d-flex">
                            <input class="pseudo-text-input w-50" type="text" v-model="config.education[index].institution">
                            <input class="pseudo-text-input w-50 text-right" type="text" v-model="config.education[index].date">
                        </div>
                        <ul>
                            <li v-for="(desc, i) in item.descriptionItems" :key="i">
                                <input class="pseudo-text-input w-100" type="text" v-model="config.education[index].descriptionItems[i]">
                            </li>
                        </ul>

                        <EditButtons v-if="isEditable" :showRemoveBtn="item.descriptionItems[0] ? true: false"
                            buttonType="small"
                            @removeClicked="removeEducationDescItem(index)"
                            @addClicked="addEducationDescItem(index)">
                        </EditButtons>
                    </div>

                    <EditButtons v-if="isEditable" :showRemoveBtn="config.education[0] ? true: false"
                        buttonType="large"
                        @removeClicked="removeEducationItem"
                        @addClicked="addEducationItem">
                   </EditButtons>

            
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar no-print bg-primary" @mouseenter="sidebarOpen" ref="sidebar">
        <button class="btn btn-close-sidebar" @click="sidebarClose">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </button>
        <div class="sidebar-inner">

            <ColorInput text="Primary color" :color="config.primaryColor" @update="(newValue) => updateConfig(newValue, 'primaryColor')"/>

            <ColorInput text="Secondary color" :color="config.secondaryColor" @update="(newValue) => updateConfig(newValue, 'secondaryColor')"/>

            <ColorInput text="Text color" :color="config.textColor" @update="(newValue) => updateConfig(newValue, 'textColor')"/>

            <SelectInput text="Headline thickness"
                        :selectedOption="config.headlineThickness"
                        :options="[{'name': 'Thin', 'value': '300'}, {'name': 'Medium', 'value': '400'}, {'name': 'Thick', 'value': '600'}]"
                        @update="(newValue) => updateConfig(newValue, 'headlineThickness')"/>

            <SelectInput text="Photo Shape"
                        :options="[{'name': 'Square', 'value': 'square'}, {'name': 'Round','value': 'round'}]"
                        :selectedOption="config.imageShape"
                        @update="(newValue) => updateConfig(newValue, 'imageShape')"/>

            <label class="d-flex align-items-center">
                <input type="number" min="20" max="80" class="form-control mr-2" style="width:120px;" v-model="config.widthLeft">
                % Width left column
            </label>
            
            <button class="btn btn-info btn-block btn-input mb-2">
                <span class="text-secondary">Upload photo</span>
                <input type="file" accept="image/jpeg, image/png, image/jpg" @change="changeImage">
            </button>

            <button class="btn btn-primary btn-block btn-input">
                <span>Upload configuration</span>
                <input type="file" accept=".json" @change="useConfig">
            </button>
        </div>

        <button class="btn btn-block btn-secondary mt-4" @click="saveConfig">Download configuration</button>
    </div>
</template>

<script>
import ContactSection from "./components/ContactSection.vue";
import EditButtons from "./components/EditButtons.vue";
import ColorInput from "./components/ColorInput.vue";
import SelectInput from "./components/SelectInput.vue";

export default {
  name: 'App',
  components: { ContactSection, EditButtons, ColorInput, SelectInput },
  data() {
        return {
            config: {
                primaryColor: "#8C7D69",
                secondaryColor: "#F5F5F5",
                textColor: "#323232",
                widthLeft: "27",
                imageUrl: "./media/profile_pic.jpg",
                imageShape: "round",
                headlineThickness: "400",
                qualifications: ["Salesforce", "Microsoft Office Suite", "SPSS", "Python"],
                name: "Moni Mustermann",
                title: "Senior Marketing Manager",
                headlines: {
                    personal: "About",
                    qualifications: "Qualifications",
                    experience: "Experience",
                    education: "Education",
                    language: "Language",
                },
                experiences: [
                    {
                        date: "01/2022 – now",
                        role: "Senior Consultant",
                        company: "Company AG, London",
                        descriptionItems: [
                            "Implemented data models for KPI reporting",
                            "Conducted user interviews and reports",
                            "Expanded companies service portfolio"
                        ],
                    },
                    {
                        date: "01/2021 – 12/2021",
                        role: "Junior Sales Agent",
                        company: "Company AG, NYC",
                        descriptionItems: [
                            "Increased revenue by 300 percent",
                            "Improved customer relations by implementing novel strategies",
                        ],
                    },
                    {
                        date: "01/2019 – 06/2019",
                        role: "Internship Customer Relations",
                        company: "Company GmbH, Berlin",
                        descriptionItems: [
                            "Manages customer relations through CMS",
                            "Created blog content to increase awareness for products",
                        ],
                    }
                ],
                education: [
                    {
                        date: "09/2018 – 08/2020",
                        institution: "Amazing University, Italy",
                        title: "International Business, Master of Arts",
                        descriptionItems: [
                            "Summa cum laude, GPA 1.0",
                            "Speaker of class",
                            "Relevant coursework includes: Leadership and Data Science",
                        ]
                    },
                    {
                        date: "02/2016 – 08/2018",
                        institution: "University de Barcelona, Spain",
                        title: "Psychology, Bachelor of Science",
                        descriptionItems: [
                            "Summa cum laude, GPA 1.2",
                            "Speaker of class",
                            "Relevant coursework includes: Mastering resume building",
                        ]
                    },
                ],

                contact: {
                    phone: "015773909584",
                    email: "contact@gmail.com",
                    address: "Hauptstraße 100, 19777 Berlin",
                },
                languages: [
                    {
                        name: "German, native level",
                        points: 5,
                    },
                    {
                        name: "English, native level",
                        points: 5,
                    },
                    {
                        name: "French, intermediate (B1)",
                        points: 3,
                    },
                ],
            },
            isEditable: false
        };
  },
  computed: {
      widthRight() {
          return 100 - this.config.widthLeft + "%";
      },
      widthLeft() {
          return this.config.widthLeft + "%";
      },
      cssVariables(){
          return {
              '--primary-color': this.config.primaryColor,
              '--secondary-color': this.config.secondaryColor,
              '--text-color': this.config.textColor,
              '--headline-thickness': this.config.headlineThickness
          }
      }
  },
  methods: {
      addQualification() {
          this.config.qualifications.push("new entry");
      },
      removeQualification() {
          this.config.qualifications.pop();
      },
      removeEducationDescItem(index) {
          this.config.education[index].descriptionItems.pop();
      },
      addEducationDescItem(index) {
          this.config.education[index].descriptionItems.push("neuer Eintrag");
      },
      removeExperienceItem(index) {
          this.config.experiences[index].descriptionItems.pop();
      },
      addExperienceItem(index) {
          this.config.experiences[index].descriptionItems.push(
              "neuer Eintrag"
          );
      },
      removeEducationItem() {
          this.config.education.pop();
      },
      addEducationItem() {
          this.config.education.push({
              date: "Spain, 02/2021 – 08/2023",
              institution: "University of Barcelona",
              title: "Psychology, Master of Science",
              descriptionItems: [
                  "cum laude, GPA 1.5",
                  "Relevant coursework includes: Mastering resume building",
              ],
          });
      },
      addExperience() {
          this.config.experiences.push({
              date: "from - til",
              role: "Junior Sales Agent",
              company: "Company AG, NYC",
              descriptionItems: [
                  "Increased revenue by 300 percent",
                  "Improved customer relations by implementing novel strategies",
              ],
          });
      },
      addLanguage() {
          this.config.languages.push({
              name: "German",
              points: 5,
          });
      },
      generalRemove(name) {
          this.config[name].pop();
      },
      saveConfig() {
          const data = JSON.stringify(this.config);
          const blob = new Blob([data], { type: "text/plain" });
          let a = document.createElement("a");
          a.download = "resume_configuration.json";
          a.href = window.URL.createObjectURL(blob);
          a.click();
      },
      useConfig(e) {
          const files = e.target.files;
          if (files.length <= 0) {
              return false;
          }
          const fr = new FileReader();
          fr.addEventListener("load", () => {
              const result = JSON.parse(fr.result);
              this.config = result;
          });

          fr.readAsText(files.item(0));
      },
      changeImage(e) {
          const files = e.target.files;
          if (files.length <= 0) {
              return false;
          }
          const fr = new FileReader();
          fr.addEventListener("load", () => {
              const uploaded_image = fr.result;
              this.config.imageUrl = uploaded_image;
          });
          fr.readAsDataURL(files.item(0));
      },
      onFinishEditHeadline(e, key) {
          this.config.headlines[key] = e.target.innerText;
      },
      sidebarClose() {
          this.$refs.sidebar.classList.remove("sidebar-show");
          this.$refs.sidebar.classList.add("sidebar-hide");
          this.isEditable = false;
      },
      sidebarOpen(e) {
          e.target.classList.remove("sidebar-hide");
          e.target.classList.add("sidebar-show");
          this.isEditable = true;
      },
      exportPdf(){
        document.title = "resume.pdf";
        window.print();
        document.title = "Resume Builder";
      },
      updateContactInfo(data){
        this.config.contact[data.key] = data.newValue;
      },
      updateConfig(newValue, key){
        this.config[key] = newValue;
      }
  }
}
</script>