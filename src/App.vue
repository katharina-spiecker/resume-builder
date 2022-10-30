<template>
  <div class="container my-4" :style="cssVariables">
        <div class="d-flex justify-content-center no-print">
            <button class="btn btn btn-success mb-4" @click="exportPdf">Export pdf</button>
        </div>

        <div class="row main-wrapper" ref="mainWrapper">
            <div class="left-col" :style="{width: widthLeft}">
                <div class="left-col__personal-wrapper">
                    <div class="img-wrapper mb-4" :class="{'rounded-circle': config.imageShape == 'round'}">
                        <img :src="config.imageUrl">
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

                    <h4 class="mt-4 right-col__section-headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'education')">{{config.headlines.education}}</h4>
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
    <div class="sidebar no-print" :class="{'d-none': hideSidebar}" @mouseenter="sidebarOpen" ref="sidebar">
        <button class="btn btn-close-sidebar" @click="sidebarClose">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </button>
        <div class="sidebar-inner">
            
            <label class="d-flex align-items-center">
                <input type="color" class="mr-2 colorpicker" v-model="config.primaryColor">
                Primary color
            </label>

            <label class="d-flex align-items-center">
                <input type="color" class="mr-2 colorpicker" v-model="config.secondaryColor">
                Secondary color
            </label>

            <label class="d-flex align-items-center">
                <input type="color" class="mr-2 colorpicker" v-model="config.textColor">
                Text color
            </label>

            <label class="d-flex align-items-center justify-content-start">
                <select v-model="config.headlineThickness" class="form-control  mr-2" style="width: 120px">
                    <option value="300">Thin</option>
                    <option value="400">Medium</option>
                    <option value="600">Thick</option>
                </select>
                Headline thickness
            </label>

            <label class="d-flex align-items-center">
                <input type="number" min="20" max="80" class="form-control mr-2" style="width:120px;" v-model="config.widthLeft">
                % Width left column
            </label>

            <label class="d-flex align-items-center justify-content-start">
                <select v-model="config.imageShape" class="form-control  mr-2" style="width: 120px">
                    <option value="square">Square</option>
                    <option value="round">Round</option>
                </select>
                Photo Shape
            </label>

            <label class="p-2 border-radius-2 mb-2">
                Upload photo
                <input class="mt-1 form-control-file  mr-2" type="file" accept="image/jpeg, image/png, image/jpg" @change="changeImage">
            </label>
            
            <label class="p-2 border-radius-2 mb-0">
                Upload configuration
                <input class="mt-1 form-control-file" type="file" accept=".json" @change="useConfig">
            </label>
        </div>

        <button class="btn btn-block btn-success mt-4" @click="saveConfig">Download configuration</button>
    </div>
</template>

<script>
import ContactSection from "./components/ContactSection.vue";
import EditButtons from "./components/EditButtons.vue";

export default {
  name: 'App',
  components: { ContactSection, EditButtons },
  data() {
        return {
            config: {
                primaryColor: "#8C7D69",
                secondaryColor: "#F5F5F5",
                textColor: "#323232",
                widthLeft: "30",
                imageUrl: "./media/profile_pic.jpg",
                imageShape: "round",
                headlineThickness: "400",
                qualifications: ["dance", "art"],
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
                        date: "01/2021 – now",
                        role: "Junior Sales Agent",
                        company: "Amazing Company AG, NYC",
                        descriptionItems: [
                            "Increased revenue by 300 percent",
                            "Improved customer relations by implementing novel strategies",
                        ],
                    },
                ],
                education: [
                    {
                        date: "02/2020 – 08/2020",
                        institution: "Universität de Barcelona, Spain",
                        title: "Psychology, Bachelor of Science",
                        descriptionItems: [
                            "summa cum laude, GPA 1.3",
                            "Speaker of class",
                            "Relevant coursework includes: Mastering resume building",
                        ],
                    },
                ],

                contact: {
                    phone: "015773909584",
                    email: "contact@gmail.com",
                    address: "Hauptstraße 100, 19777 Berlin",
                },
                languages: [
                    {
                        name: "German",
                        points: 5,
                    },
                    {
                        name: "English",
                        points: 5,
                    },
                    {
                        name: "French",
                        points: 3,
                    },
                ],
            },
            isEditable: false,
            hideSidebar: false,
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
              company: "Amazing Company AG, NYC",
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
      sidebarOpen() {
          event.target.classList.remove("sidebar-hide");
          event.target.classList.add("sidebar-show");
          this.isEditable = true;
      },
      exportPdf(){
        document.title = "resume.pdf";
        window.print();
        document.title = "Resume Builder";
      },
      updateContactInfo(data){
        this.config.contact[data.key] = data.newValue;
      }
  }
}
</script>

<style>
    @media print {
        @page {
            margin: 0;  /* this affects the margin in the printer settings */
            padding: 0;
            size: A4 portrait;
        }

        .no-print {
            display: none !important;
        }
       
    }
</style>