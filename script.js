"use strict";
// const togleVisibility = () => {
//   if (toggleelement.style.display === 'none') {
//       toggleelement.style.display = 'block';  // Show the element
//   } else {
//       toggleelement.style.display = 'none';   // Hide the element
//   }
// };
// togglebutton.addEventListener('click',togleVisibility)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resumephoto = document.getElementById('resumepic');
const resumepage = document.getElementById("resumepage");
const resumename = document.getElementById("resumename");
const resumecontact = document.getElementById('resumecontact');
const resumeemail = document.getElementById("resumeemail");
const resumeeducation = document.getElementById("resumeeducation");
const resumefurthureducation = document.getElementById("resumefurthureducation");
const resumeskills = document.getElementById("resumeskills");
const resumefurthurskills = document.getElementById("resumefurthurskills");
const resumeexperience = document.getElementById('resumeexperience');
const form = document.getElementById("resumeform");
const resumecontent = document.getElementById("resumecontent");
const downloadbutton = document.getElementById("download");
const sharebutton = document.getElementById("share");
const editbutton = document.getElementById("edit");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById('Email').value;
    const education = document.getElementById('Education').value;
    const furthureducation = document.getElementById("Furthur").value;
    const skillsNodeList = document.querySelectorAll('input[name="skill"]:checked');
    const skillsArray = Array.from(skillsNodeList).map(skills => skills.value);
    const skill = skillsArray.join(', '); // Join all selected skills as a comma-separated string
    const furthurskill = document.getElementById("otskill").value;
    const experience = document.getElementById("Experience").value;
    const photoinput = document.getElementById('Picture');
    const photofile = photoinput.files ? photoinput.files[0] : null;
    let photobase64 = '';
    if (photofile) {
        photobase64 = yield filetoBase64(photofile);
        localStorage.setItem('resumepic', photobase64);
        resumephoto.src = photobase64;
    }
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumepage.classList.remove("hidden");
    resumename.textContent = name;
    resumecontact.textContent = contact;
    resumeemail.textContent = email;
    resumeeducation.textContent = education;
    resumefurthureducation.textContent = furthureducation;
    resumeskills.textContent = skill;
    resumefurthurskills.textContent = furthurskill;
    resumeexperience.textContent = experience;
    const queryparams = new URLSearchParams({
        name: name,
        contact: contact,
        email: email,
        education: education,
        furthureducation: furthureducation,
        skills: skill,
        furthurskills: furthurskill,
        experience: experience,
        view: "resume"
    });
    const uniqueurl = `${window.location}?${queryparams.toString()}`;
    sharebutton.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueurl);
        alert("Link is Copied To Clipboard");
    });
    window.history.replaceState(null, '', uniqueurl);
}));
function filetoBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
editbutton.addEventListener("click", () => {
    var _a;
    updateformfromresume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    resumepage.classList.add("hidden");
});
function updateformfromresume() {
    document.getElementById("name").value = resumename.textContent || '';
    document.getElementById("contact").value = resumecontact.textContent || "";
    document.getElementById('Email').value = resumeemail.textContent || "";
    document.getElementById('Education').value = resumeeducation.textContent || "";
    document.getElementById("Furthur").value = resumefurthureducation.textContent || "";
    document.getElementById("otskill").value = resumefurthurskills.textContent || "";
    document.getElementById("Experience").value = resumeexperience.textContent || "";
}
downloadbutton.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
        alert(" Error : Html2pdf Library not loaded");
        return;
    }
    const resumeoptions = {
        margin: 0,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: "in", format: "a2", orientation: "landscape", },
    };
    html2pdf()
        .from(resumecontent)
        .set(resumeoptions)
        .save()
        .catch((error) => {
        console.error("pdf generation error", error);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || "";
    const contact = params.get('contact') || "";
    const email = params.get("email") || "";
    const education = params.get("education") || "";
    const furthureducation = params.get("furthureducation") || '';
    const skill = params.get("skills") || '';
    const furthurskill = params.get("furthurskills") || "";
    const experience = params.get("experience") || "";
    const view = params.get("view");
    if (name || contact || email || education || furthureducation || skill || furthurskill || experience) {
        resumename.textContent = name;
        resumecontact.textContent = contact;
        resumeemail.textContent = email;
        resumeeducation.textContent = education;
        resumefurthureducation.textContent = furthureducation;
        resumeskills.textContent = skill;
        resumefurthurskills.textContent = furthurskill;
        resumeexperience.textContent = experience;
        const savephoto = localStorage.getItem("resumepic");
        if (savephoto) {
            resumephoto.src = savephoto;
        }
        if (view === "resume") {
            (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
            resumepage.classList.remove("hidden");
            downloadbutton.classList.add("hidden");
            sharebutton.classList.add("hidden");
            editbutton.classList.add("hidden");
        }
    }
});
