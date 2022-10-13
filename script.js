Vue.createApp({
	data() {
		return {
			config: {
				primaryColor: "#8C7D69",
				secondaryColor: "#F5F5F5",
				textColor: "#323232",
				widthLeft: "30",
				imageUrl: "profile_pic.jpg",
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
					language: "Language"
				},
				experiences: [
					{
						date: "01/2021 – now",
						role: "Junior Sales Agent",
						company: "Amazing Company AG, NYC",
						descriptionItems: [
							"Increased revenue by 300 percent",
							"Improved customer relations by implementing novel strategies"
						]
					}
				],
				education: [
					{
						date: "02/2020 – 08/2020",
						institution: "Universität de Barcelona, Spain",
						title: "Psychology, Bachelor of Science",
						descriptionItems: [
							"summa cum laude, GPA 1.3",
							"Speaker of class",
							"Relevant coursework includes: Mastering resume building"
						]
					}
				],
				contact: {
					phone: "015773909584",
					email: "contact@gmail.com",
					address: "Hauptstraße 100, 19777 Berlin"
				},
				languages: [
					{
						name: "German",
						points: 5
					},
					{
						name: "English",
						points: 5
					},
					{
						name: "French",
						points: 3
					}
				]
			},
            isEditable: false,
            hideSidebar: false
		}
    },
    mounted(){
        document.addEventListener('keypress', (event) => {
            if(event.code == "Space"){
                this.hideSidebar = !this.hideSidebar;
            }
        }, false);
    },
	computed: {
		widthRight(){
			return (100 - this.config.widthLeft) + "%";
		},
		widthLeft(){
			return this.config.widthLeft + "%";
		}
	},
	methods: {
		addQualification(){
			this.config.qualifications.push("new entry")
		},
		removeQualification(){
			this.config.qualifications.pop();
		},
		removeEducationDescItem(index){
			this.config.education[index].descriptionItems.pop();
		},
		addEducationDescItem(index){
			this.config.education[index].descriptionItems.push("neuer Eintrag");
		},
		removeExperienceItem(index){
			this.config.experiences[index].descriptionItems.pop();
		},
		addExperienceItem(index){
			this.config.experiences[index].descriptionItems.push("neuer Eintrag");
		},
		removeEducationItem(){
			this.config.education.pop();
		},
		addEducationItem(){
			this.config.education.push(
				{
					date: "Spain, 02/2021 – 08/2023",
					institution: "University of Barcelona",
					title: "Psychology, Master of Science",
					descriptionItems: [
						"cum laude, GPA 1.5",
						"Relevant coursework includes: Mastering resume building"
					]
				}
			);
		},
		addExperience(){
			this.config.experiences.push(
				{
					date: "from - til",
					role: "Junior Sales Agent",
					company: "Amazing Company AG, NYC",
					descriptionItems: [
						"Increased revenue by 300 percent",
						"Improved customer relations by implementing novel strategies"
					]
				}
			);
		},
		addLanguage(){
			this.config.languages.push({
				name: "German",
				points: 5
			});
		},
		generalRemove(name){
			this.config[name].pop();
		},
		saveConfig(){
			const data = JSON.stringify(this.config)
			const blob = new Blob([data], {type: 'text/plain'})
			a = document.createElement('a');
			a.download = "resume_configuration.json";
			a.href = window.URL.createObjectURL(blob);
			a.click();
		},
		useConfig(e){
			const files = e.target.files;
			if (files.length <= 0) {
				return false;
			}
			const fr = new FileReader();
			fr.addEventListener('load', () => {
				const result = JSON.parse(fr.result);
				this.config = result;
			})

			fr.readAsText(files.item(0));
		},
		changeImage(e){
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
		onFinishEditHeadline(e, key){
			this.config.headlines[key] = e.target.innerText;
		},
		sidebarClose(e){
			this.$refs.sidebar.classList.remove("sidebar-show");
			this.$refs.sidebar.classList.add("sidebar-hide");
			this.isEditable = false;
		},
		sidebarOpen(e){
			event.target.classList.remove("sidebar-hide");
			event.target.classList.add("sidebar-show");
			this.isEditable = true;
		}
		// window.jspdf.jsPdf
	}
}).mount('#app')