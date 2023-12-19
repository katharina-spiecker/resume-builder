<template>
  <main class="container">
    <Sidebar>
      <ToggleSwitch
        @switch-toggled="toggleEditMode"
        label="Edit mode"
        off-label="Export mode"
        :toggle-active="editing" />

      <div class="sidebar-section" v-if="editing">
        <p>Left column</p>
        <ColorInput
          label="Highlight color"
          @color-changed="colors.left.highlight = $event"
          :default-color="colors.left.highlight" />

        <ColorInput
          label="Background color"
          @color-changed="colors.left.background = $event"
          :default-color="colors.left.background" />

        <ColorInput
          label="Text color"
          @color-changed="colors.left.text = $event"
          :default-color="colors.left.text" />
      </div>

      <div class="sidebar-section" v-if="editing">
        <p>Right column</p>
        <ColorInput
          label="Highlight color"
          @color-changed="colors.right.highlight = $event"
          :default-color="colors.right.highlight" />

        <ColorInput
          label="Background color"
          @color-changed="colors.right.background = $event"
          :default-color="colors.right.background" />

        <ColorInput
          label="Text color"
          @color-changed="colors.right.text = $event"
          :default-color="colors.right.text" />
      </div>

      <div class="sidebar-section" v-if="editing">
        <SelectInput
          v-if="editing"
          label="Headline thickness"
          :options="[
            { name: 'Thin', value: '300' },
            { name: 'Medium', value: '400' },
            { name: 'Thick', value: '600' },
          ]"
          :default-option="headlineWeight"
          @update-selection="headlineWeight = $event" />

        <PercentageInput
          v-if="editing"
          label="Width left column"
          :min="20"
          :max="80"
          :current-value="widthLeft"
          @percentage-changed="widthLeft = $event" />
      </div>

      <div class="sidebar-section" v-if="editing">
        <ToggleSwitch
          @switch-toggled="toggleImageDisplay"
          label="Show photo"
          :toggle-active="showImage" />

        <CustomButton v-if="showImage">
          <ImgUpload @image-changed="imageUrl = $event" />
        </CustomButton>

        <SelectInput
          v-if="showImage"
          label="Photo shape"
          :options="[
            { name: 'Square', value: 'square' },
            { name: 'Round', value: 'round' },
          ]"
          :default-option="imageShape"
          @update-selection="imageShape = $event" />
      </div>

      <div class="sidebar-section" v-if="!editing">
        <SelectInput
          label="Resume format"
          :options="[
            { name: 'DIN A4', value: 'a4' },
            { name: 'Letter', value: 'letter' },
          ]"
          :default-option="resumeFormat"
          @update-selection="resumeFormat = $event" />

        <ExportPdf :resume-format="resumeFormat" />
      </div>

      <div class="sidebar-section" v-if="!editing">
        <small style="display: block; margin-bottom: 10px">
          A file with your configuration will be downloaded to your computer.
          You can upload it whenever you want to restore your settings.
        </small>

        <CustomButton @click="downloadConfig" btn-type="secondary">
          Download configuration
        </CustomButton>

        <CustomButton>
          <label>
            Upload configuration
            <input type="file" accept=".json" @change="uploadConfig" />
          </label>
        </CustomButton>
      </div>
    </Sidebar>

    <div class="resume-wrapper">
      <CustomButton @click="saveConfig" btn-type="primary-right">
        Save configuration in browser
      </CustomButton>

      <div
        id="resume"
        class="d-flex"
        :class="{
          'edit-off': !editing,
          'letter-format': resumeFormat == 'letter',
        }"
        :style="cssVariables">
        <div class="left-col" :style="{ width: percentageWidthLeft }">
          <ProfilePic :url="imageUrl" :shape="imageShape" :show="showImage" />

          <ResumeSection>
            <SectionHeadline
              :headline="headlines[0]"
              :editing="editing"
              @headline-edited="updateHeadline($event, 0)" />
            <p
              :contenteditable="editing"
              @input="updateProperty($event, 'introText')">
              {{ introText }}
            </p>
          </ResumeSection>

          <ResumeSection>
            <SectionHeadline
              :headline="headlines[1]"
              :editing="editing"
              @headline-edited="updateHeadline($event, 1)" />
            <Contact
              :contact="contact"
              :editing="editing"
              :icon-color="colors.left.highlight"
              @edit="updateNestedProperty" />
          </ResumeSection>

          <ResumeSection>
            <SectionHeadline
              :headline="headlines[2]"
              :editing="editing"
              @headline-edited="updateHeadline($event, 2)" />
            <ul>
              <li
                v-for="(skill, index) in skills"
                :key="index"
                :contenteditable="editing"
                @input="updateNestedProperty($event, 'skills', index)">
                {{ skill }}
              </li>
            </ul>
            <EditButtons
              @add-click="skills.push('new entry')"
              @remove-click="skills.pop()"
              :show-remove-btn="skills.length > 0" />
          </ResumeSection>

          <ResumeSection>
            <SectionHeadline
              :headline="headlines[3]"
              :editing="editing"
              @headline-edited="updateHeadline($event, 3)" />
            <ul>
              <li
                v-for="(highlight, index) in highlights"
                :key="index"
                :contenteditable="editing"
                @input="updateNestedProperty($event, 'highlights', index)">
                {{ highlight }}
              </li>
            </ul>
            <EditButtons
              @add-click="highlights.push('new entry')"
              @remove-click="highlights.pop()"
              :show-remove-btn="highlights.length > 0" />
          </ResumeSection>
        </div>

        <div class="right-col">
          <div
            class="personal-name"
            :contenteditable="editing"
            @input="updateProperty($event, 'name')">
            {{ name }}
          </div>
          <div
            class="personal-title"
            :contenteditable="editing"
            @input="updateProperty($event, 'title')">
            {{ title }}
          </div>

          <ResumeSection>
            <div class="d-flex">
              <SectionHeadline
                :headline="headlines[4]"
                :editing="editing"
                @headline-edited="updateHeadline($event, 4)" />
              <EditButtons
                @add-click="addExperience"
                :show-remove-btn="false"
                text-add="Add experience" />
            </div>

            <div v-for="(item, index) in experience" :key="index">
              <EditButtons
                @remove-click="removeExperience(index)"
                :show-add-btn="false"
                btn-align="right"
                move-down="true" />
              <ResumeEntry
                :item="item"
                :editing="editing"
                @edit="($event, key) => updateExperience($event, key, index)"
                @edit-desc="
                  ($event, innerIndex) =>
                    updateExperienceDescription($event, index, innerIndex)
                " />

              <EditButtons
                @add-click="addDescriptionItem('experience', index)"
                @remove-click="removeDescriptionItem('experience', index)"
                :show-remove-btn="experience[index].description.length > 0" />
            </div>
          </ResumeSection>

          <ResumeSection>
            <div class="d-flex">
              <SectionHeadline
                :headline="headlines[5]"
                :editing="editing"
                @headline-edited="updateHeadline($event, 5)" />
              <EditButtons
                @add-click="addEducation"
                :show-remove-btn="false"
                text-add="Add education" />
            </div>

            <div v-for="(item, index) in education" :key="index">
              <EditButtons
                @remove-click="removeEducation(index)"
                :show-add-btn="false"
                btn-align="right"
                move-down="true" />
              <ResumeEntry
                :item="item"
                :editing="editing"
                @edit="($event, key) => updateEducation($event, key, index)"
                @edit-desc="
                  ($event, innerIndex) =>
                    updateEducationDescription($event, index, innerIndex)
                " />

              <EditButtons
                @add-click="addDescriptionItem('education', index)"
                @remove-click="removeDescriptionItem('education', index)"
                :show-remove-btn="education[index].description.length > 0" />
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ResumeSection from "./components/ResumeSection.vue";
import SectionHeadline from "./components/SectionHeadline.vue";
import EditButtons from "./components/EditButtons.vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";
import ProfilePic from "./components/ProfilePic.vue";
import Contact from "./components/Contact.vue";
import ColorInput from "./components/ColorInput.vue";
import PercentageInput from "./components/PercentageInput.vue";
import SelectInput from "./components/SelectInput.vue";
import Sidebar from "./components/Sidebar.vue";
import ImgUpload from "./components/ImgUpload.vue";
import CustomButton from "./components/CustomButton.vue";
import ResumeEntry from "./components/ResumeEntry.vue";
import ExportPdf from "./components/ExportPdf.vue";

export default {
  created() {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      try {
        const resume = JSON.parse(savedResume);
        this.loadIntoData(resume);
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }
  },
  components: {
    ResumeSection,
    SectionHeadline,
    EditButtons,
    ToggleSwitch,
    ProfilePic,
    Contact,
    ColorInput,
    PercentageInput,
    SelectInput,
    Sidebar,
    ImgUpload,
    CustomButton,
    ResumeEntry,
    ExportPdf,
  },
  data() {
    return {
      editing: true,
      colors: {
        left: {
          highlight: "#82C0CC",
          text: "#ffffff",
          background: "#3943B7",
        },
        right: {
          highlight: "#3943B7",
          text: "#000505",
          background: "#ffffff",
        },
      },
      showImage: true,
      imageShape: "round",
      resumeFormat: "a4",
      headlineWeight: "400",
      name: "Michaela Scarn",
      widthLeft: 30,
      title: "Senior Data Scientist",
      introText:
        "From data cleaning to data analysis to machine learning, I am passionate about everything data.",
      imageUrl: "profile_pic.jpg",
      contact: {
        phone: "15713909584",
        email: "contact@gmail.com",
        address: "Main St 100, 19777 NY",
      },
      headlines: [
        "About me",
        "Contact",
        "Skills",
        "Certifications",
        "Experience",
        "Education",
      ],
      skills: [
        "Python",
        "Pandas",
        "SQL",
        "R",
        "AI",
        "C++",
        "Machine Learning",
        "Hadoop",
        "TensorFlow",
        "PyTorch",
        "NLP",
      ],
      highlights: [
        "Natural Language Processing with Python (Coursera)",
        "Recommendation Systems with TensorFlow on GCP (Google)",
      ],
      experience: [
        {
          title: "Senior Data Scientist",
          company: "ABC Analytics Inc.",
          location: "London",
          date: "2022 - Present",
          description: [
            "Led a team of data scientists in developing advanced machine learning models for predictive analytics",
            "Designed and implemented a recommendation system that boosted cross-selling, leading to a 20% increase in revenue",
            "Conducted A/B testing and statistical analysis to optimize product features",
          ],
        },
        {
          title: "Data Scientist",
          company: "XYZ Data Solutions",
          location: "London",
          date: "2017 - 2019",
          description: [
            "Developed and deployed machine learning models for fraud detection, reducing fraudulent transactions by 18%",
            "Conducted in-depth exploratory data analysis to identify key trends and insights",
            "Worked on data preprocessing, feature engineering, and model selection to improve model performance",
          ],
        },
        {
          title: "Data Scientist Trainee",
          company: "Data Insights Ltd.",
          location: "New York City",
          date: "2016-2017",
          description: [
            "Collaborated with external partners to integrate third-party data sources, expanding the company's data assets and enhancing predictive modeling capabilities.",
            "Presented data-driven insights and recommendations to executive leadership, influencing strategic decisions and driving revenue growth.",
          ],
        },
      ],
      education: [
        {
          title: "Master of Science in Data Science",
          university: "StellarTech University",
          location: "Starville",
          date: "2020-2022",
          description: [
            "Coursework included advanced machine learning, statistical modeling, and data visualization techniques.",
            "Thesis: 'Predictive Modeling for Customer Churn in E-commerce using Random Forest.'",
          ],
        },
        {
          title: "Bachelor of Science in Computer Science",
          university: "Evergreen State University",
          location: "Springdale",
          date: "2012-2015",
          description: [
            "Relevant coursework in database management, algorithms, and programming languages.",
            "Senior project: 'Development of a Recommender System for Movie Ratings.'",
          ],
        },
      ],
    };
  },
  computed: {
    cssVariables() {
      return {
        "--highlight-color-left": this.colors.left.highlight,
        "--background-color-left": this.colors.left.background,
        "--text-color-left": this.colors.left.text,
        "--highlight-color-right": this.colors.right.highlight,
        "--background-color-right": this.colors.right.background,
        "--text-color-right": this.colors.right.text,
        "--headline-weight": this.headlineWeight,
      };
    },
    percentageWidthLeft() {
      return this.widthLeft + "%";
    },
  },
  methods: {
    updateProperty(event, key) {
      this[key] = event.target.innerText;
    },
    updateHeadline(newValue, index) {
      this.headlines[index] = newValue;
    },
    updateNestedProperty(event, key1, key2) {
      this[key1][key2] = event.target.innerText;
    },
    updateExperience(event, key, index) {
      this.experience[index][key] = event.target.innerText;
    },
    updateExperienceDescription(event, index1, index2) {
      this.experience[index1]["description"][index2] = event.target.innerText;
    },
    updateEducation(event, key, index) {
      this.education[index][key] = event.target.innerText;
    },
    updateEducationDescription(event, index1, index2) {
      this.education[index1]["description"][index2] = event.target.innerText;
    },
    addDescriptionItem(key, index) {
      this[key][index].description.push("new entry");
    },
    removeDescriptionItem(key, index) {
      this[key][index].description.pop();
    },
    addExperience() {
      this.experience.unshift({
        title: "Job Title",
        company: "Company",
        location: "Location",
        date: "date range",
        description: ["description"],
      });
    },
    addEducation() {
      this.education.unshift({
        title: "Education title",
        university: "University",
        location: "Location",
        date: "date range",
        description: ["Summa cum laude, GPA 1.0"],
      });
    },
    removeExperience(index) {
      this.experience.splice(index, 1);
    },
    removeEducation(index) {
      this.education.splice(index, 1);
    },
    toggleEditMode(isChecked) {
      this.editing = isChecked;
    },
    toggleImageDisplay(isChecked) {
      this.showImage = isChecked;
    },
    downloadConfig() {
      const config = JSON.stringify(this.$data);
      // Create a Blob with the JSON content
      const blob = new Blob([config], { type: "application/json" });

      // Create an anchor element for download
      const a = document.createElement("a");
      a.download = "resume_configuration.json";
      a.href = window.URL.createObjectURL(blob);

      // Trigger a click event to initiate the download
      a.dispatchEvent(new MouseEvent("click"));
    },
    uploadConfig(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) {
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        try {
          const config = JSON.parse(reader.result);
          this.loadIntoData(config);
          // save in localStorage otherwise will be overwritten when created hook runs
          localStorage.setItem("resume", JSON.stringify(this.$data));
        } catch (error) {
          console.error("Error parsing resume data:", error);
        }
      });
      reader.readAsText(selectedFile);
    },
    loadIntoData(config) {
      for (const key in config) {
        if (this.$data.hasOwnProperty(key)) {
          this[key] = config[key];
        }
      }
    },
    saveConfig() {
      localStorage.setItem("resume", JSON.stringify(this.$data));
      const message = `Your resume configuration was saved to your browser's local storage. You can close and reopen the browser and your configuration will be there. This does not work across browsers or in incognito mode. If those cases apply to you, activate export mode in the sidebar and use the download and reupload buttons there instead.`;
      window.alert(message);
    },
  },
};
</script>

<style>
#resume {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  /* DIN A4 standard paper size. commonly used for resumes
    For North America letter size use width: 8.5in; height: 11in; */
  width: 210mm;
}

#resume.edit-off {
  /* DIN A4 standard paper size. commonly used for resumes
    For North America letter size use width: 8.5in; height: 11in; */
  height: 297mm;
}

.resume-wrapper {
  width: 210mm;
  margin-left: auto;
}

/* if letter format selected */
#resume.edit-off.letter-format {
  width: 8.5in;
  height: 11in;
}

@media (min-width: 1350px) {
  .resume-wrapper {
    margin-left: 300px;
  }
}

@media (min-width: 1600px) {
  .resume-wrapper {
    margin-right: auto;
  }
}

.left-col {
  background-color: var(--background-color-left);
  color: var(--text-color-left);
  border-right: 1px solid var(--highlight-color-left);
  /* width: 30%; remove in module 3 */
  padding: 30px;
}

.left-col li {
  margin-bottom: 10px;
}

.right-col {
  background-color: var(--background-color-right);
  color: var(--text-color-right);
  width: 70%;
  padding: 30px 30px 0 30px;
}

.right-col li {
  margin-bottom: 5px;
}

.personal-name {
  font-weight: 300;
  color: var(--highlight-color-right);
  font-size: 28px;
  border-bottom: 1px solid var(--highlight-color-right);
  margin: 0;
  margin-left: -30px;
  padding-left: 30px;
  padding-bottom: 15px;
}

.personal-title {
  border-bottom: 1px solid var(--highlight-color-right);
  margin: 0 0 20px -30px;
  padding: 15px 0 15px 30px;
  font-weight: 300;
  font-size: 20px;
}

#resume ul {
  padding-inline-start: 16px;
  margin-block-end: 0px;
  margin-block-start: 5px;
}
</style>
