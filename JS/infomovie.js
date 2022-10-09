window.addEventListener("scroll" , blur)
function blur(){
    let poster = document.getElementById("poster")
    if (window.pageYOffset > 300) {
        poster.classList.add('active')
    }else {
        poster.classList.remove('active')
    }
}

