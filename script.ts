

// const togleVisibility = () => {
//   if (toggleelement.style.display === 'none') {
//       toggleelement.style.display = 'block';  // Show the element
//   } else {
//       toggleelement.style.display = 'none';   // Hide the element
//   }
// };
// togglebutton.addEventListener('click',togleVisibility)

declare const html2pdf:any


 const resumephoto=document.getElementById('resumepic')as HTMLImageElement
 const resumepage=document.getElementById("resumepage")as HTMLElement
 const resumename=document.getElementById("resumename")as HTMLElement
 const resumecontact=document.getElementById('resumecontact')as HTMLParagraphElement
 const resumeemail=document.getElementById("resumeemail")as HTMLParagraphElement
 const resumeeducation=document.getElementById("resumeeducation")as HTMLParagraphElement
 const resumefurthureducation=document.getElementById("resumefurthureducation") as HTMLParagraphElement
 const resumeskills=document.getElementById("resumeskills")as HTMLParagraphElement
 const resumefurthurskills=document.getElementById("resumefurthurskills")as HTMLParagraphElement
 const resumeexperience=document.getElementById('resumeexperience') as HTMLParagraphElement
const form=document.getElementById("resumeform")as HTMLFormElement
const resumecontent=document.getElementById("resumecontent")as HTMLDivElement
const downloadbutton=document.getElementById("download") as HTMLButtonElement
const sharebutton=document.getElementById("share")as HTMLButtonElement
const editbutton=document.getElementById("edit")as HTMLButtonElement

form.addEventListener("submit", async(event:Event)=>{
    event.preventDefault();

 const name= (document.getElementById("name") as HTMLInputElement).value
 const contact=(document.getElementById("contact")as HTMLInputElement).value
 const email=(document.getElementById('Email')as HTMLInputElement).value 
 const education=(document.getElementById('Education')as HTMLInputElement).value
 const furthureducation=(document.getElementById("Furthur")as HTMLTextAreaElement).value


 const skillsNodeList = document.querySelectorAll('input[name="skill"]:checked');
const skillsArray = Array.from(skillsNodeList).map(skills => (skills as HTMLInputElement).value);
const skill = skillsArray.join(', '); // Join all selected skills as a comma-separated string


 const furthurskill=(document.getElementById("otskill")as HTMLInputElement).value
 const  experience=(document.getElementById("Experience")as HTMLTextAreaElement).value
 const photoinput=document.getElementById('Picture') as HTMLInputElement
const photofile=photoinput.files? photoinput.files[0]:null;
 let photobase64=''
 if(photofile){
    photobase64=await filetoBase64(photofile)
   localStorage.setItem('resumepic',photobase64)
   resumephoto.src=photobase64
 }

 document.querySelector(".container")?.classList.add("hidden");
 resumepage.classList.remove("hidden");

 resumename.textContent=name
 resumecontact.textContent=contact
 resumeemail.textContent=email
 resumeeducation.textContent=education
 resumefurthureducation.textContent=furthureducation
 resumeskills.textContent=skill
 resumefurthurskills.textContent=furthurskill
 resumeexperience.textContent=experience;
 
 const queryparams= new URLSearchParams({
name: name,
contact:contact,
email:email,
education:education,
furthureducation:furthureducation,
skills:skill,
furthurskills:furthurskill,
experience: experience,
view: "resume"

 });
 
const uniqueurl=`${window.location}?${queryparams.toString()}`
 sharebutton.addEventListener("click",()=>{
  navigator.clipboard.writeText(uniqueurl)
  alert("Link is Copied To Clipboard")
  localStorage.setItem("sharedResumeLink", uniqueurl)
  
 });
 window.history.replaceState(null,'',uniqueurl);
 

})
 







  function filetoBase64(file:File):Promise<string>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader;
        reader.onloadend=()=>resolve(
            reader.result as string
        )
        reader.onerror=reject
        reader.readAsDataURL(file)
    })
  }
  editbutton.addEventListener("click",()=>{
    updateformfromresume();
    document.querySelector(".container")?.classList.remove('hidden')
    resumepage.classList.add("hidden")
  })
function updateformfromresume(){
  (document.getElementById("name")as HTMLInputElement).value=resumename.textContent ||'' ;
  (document.getElementById("contact")as HTMLInputElement).value=resumecontact.textContent || "";
  (document.getElementById('Email')as HTMLInputElement).value= resumeemail.textContent || "";
 (document.getElementById('Education')as HTMLInputElement).value=resumeeducation.textContent ||"";
 (document.getElementById("Furthur")as HTMLTextAreaElement).value=resumefurthureducation.textContent||"";
  (document.getElementById("otskill") as HTMLInputElement).value=resumefurthurskills.textContent||"";
  (document.getElementById("Experience")as HTMLTextAreaElement).value =resumeexperience.textContent || "";
  
  
}
downloadbutton.addEventListener("click", async () => {
  const htmlContent = resumecontent.outerHTML;

  try {
      const response = await fetch('http://localhost:3000/generate-pdf', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ htmlContent })
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = 'Resume.pdf';
      downloadLink.click();
      URL.revokeObjectURL(pdfUrl);  // Clean up

  } catch (error) {
      console.error('Error downloading PDF:', error);
  }
})





  window.addEventListener("DOMContentLoaded",()=>{
  const params =new URLSearchParams(window.location.search)
  const name=params.get('name')|| "";
  const contact=params.get('contact')|| "";
  const email=params.get("email")|| "";
  const education=params.get("education")|| "";
  const furthureducation=params.get("furthureducation")|| '';
  const skill=params.get("skills")|| '';
  const furthurskill=params.get("furthurskills")|| "";
  const experience=params.get("experience") || "";
  const view = params.get("view")
   

  if(name||contact||email||education||furthureducation||skill||furthurskill ||experience){

    resumename.textContent=name
    resumecontact.textContent=contact
    resumeemail.textContent=email
    resumeeducation.textContent=education
    resumefurthureducation.textContent=furthureducation
    resumeskills.textContent=skill
    resumefurthurskills.textContent=furthurskill
    resumeexperience.textContent=experience;

    const savephoto=localStorage.getItem("resumepic")
    if(savephoto){
      resumephoto.src=savephoto
    }
    if (view === "resume") {
      document.querySelector(".container")?.classList.add("hidden");
      resumepage.classList.remove("hidden");
      downloadbutton.classList.add("hidden")
      sharebutton.classList.add("hidden");
      editbutton.classList.add("hidden");
  }
  }


})



