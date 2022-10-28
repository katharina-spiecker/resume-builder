<template>
  <div class="container my-4" :style="cssVariables">
        <button class="btn btn btn-success mb-4" id="export-pdf-btn">Export pdf</button>
        <div class="row main-wrapper">
            <div class="left-col" :style="{width: widthLeft}">
                <div class="left-col__personal-wrapper">
                    <div class="img-wrapper mb-4" :class="{'rounded-circle': config.imageShape == 'round'}">
                        <img :src="config.imageUrl">
                    </div>
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'personal')">{{config.headlines.personal}}</h5>
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                        <input class="pseudo-text-input w-100" type="text" v-model="config.contact.phone">
                    </div>
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                        <input class="pseudo-text-input w-100" type="text" v-model="config.contact.email">
                    </div>
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                        <input class="pseudo-text-input w-100" type="text" v-model="config.contact.address">
                    </div>
                </div>
                <div id="qualifications-section" class="mt-5">
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'qualifications')">{{config.headlines.qualifications}}</h5>
                    <ul>
                        <li v-for="(qualification, index) in config.qualifications" :key="index">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.qualifications[index]">
                        </li>
                    </ul>
                    <div class="btn-wrapper mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                        <button v-if="config.qualifications[0]" class="btn btn-danger btn-remove mr-2" @click="generalRemove('qualifications')">-</button>
                        <button class="btn btn-secondary btn-add" @click="addQualification">+</button>
                    </div>
                </div>
                <div id="languages-section" class="mt-5">
                    <h5 class="left-col__headline" contenteditable="true" @blur="onFinishEditHeadline($event, 'language')">{{config.headlines.language}}</h5>
                    <ul>
                        <li v-for="(language, index) in config.languages" :key="index">
                            <input class="pseudo-text-input w-100" type="text" v-model="config.languages[index].name">
                        </li>
                    </ul>
                    <div class="btn-wrapper mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                        <button v-if="config.languages[0]" class="btn btn-danger btn-remove mr-2"  @click="generalRemove('languages')">-</button>
                        <button class="btn btn-secondary btn-add" @click="addLanguage">+</button>
                    </div>
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
                        <div class="btn-wrapper-small mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                            <button v-if="experience.descriptionItems[0]" class="btn btn-danger btn-remove mr-2" @click="removeExperienceItem(index)">-</button>
                            <button class="btn btn-secondary btn-add" @click="addExperienceItem(index)">+</button>
                        </div>
                    </div>
                    <div class="btn-wrapper mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                        <button v-if="config.experiences[0]" class="btn btn-danger btn-remove mr-2" @click="generalRemove('experiences')">-</button>
                        <button class="btn btn-secondary btn-add" @click="addExperience(index)">+</button>
                    </div>

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
                        <div class="btn-wrapper-small mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                            <button v-if="item.descriptionItems[0]" class="btn btn-danger btn-remove mr-2" @click="removeEducationDescItem(index)">-</button>
                            <button class="btn btn-secondary btn-add" @click="addEducationDescItem(index)">+</button>
                        </div>
                    </div>
                    <div class="btn-wrapper mb-3" :class="[isEditable ? 'd-block' : 'd-none']">
                        <button v-if="config.education[0]" class="btn btn-danger btn-remove mr-2" @click="removeEducationItem">-</button>
                        <button class="btn btn-secondary btn-add" @click="addEducationItem">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar" :class="{'d-none': hideSidebar}" @mouseenter="sidebarOpen" ref="sidebar">
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

export default {
  name: 'App',
  components: {},
  data() {
        return {
            config: {
                primaryColor: "#8C7D69",
                secondaryColor: "#F5F5F5",
                textColor: "#323232",
                widthLeft: "30",
                imageUrl: "/media/profile_pic.jpg",
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
      printExport(){
          console.log("printExport")
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
