const pannel = document.querySelector(".nav-hidden-pannel");


function closeactive(){
    pannel.classList.remove("active");
}
function navactive(){
  pannel.classList.toggle("active");
}

window.addEventListener("resize",()=>{
    pannel.classList.remove("active");
});




