var togglebutton =document.getElementById('togglebutton')as HTMLButtonElement
var toggleelement=document.getElementById('toggleelement')as HTMLElement


togglebutton.addEventListener("click",()=>{if(toggleelement.style.display==='none'){
  toggleelement.style.display='block'}else
  {toggleelement.style.display="none"}
});