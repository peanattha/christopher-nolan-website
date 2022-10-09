function searchMovie() {
  let inputMovieName = document.getElementById("inputNameMovie").value
  let lowCase = inputMovieName.toLocaleLowerCase()
  if (lowCase == "") {
    popupPleaseInput()
  } else {
    let arrNameMovie = ["dunkirk", "inception", "tenet", "batman begins", "the dark knight", "the dark knight rises",
      "following", "insomnia", "memento", "the prestige", "quay", "doodlebug", "batman v superman", "justice league",
      "man of steel", "transcendence", "interstellar",
    ]
    for (let i = 0; i < arrNameMovie.length; i++) {
      if (lowCase == arrNameMovie[i]) {
        let url = window.location.href
        let resultUrl = "movie/" + inputMovieName + ".html"
        let newUrl = url.replace("filmography.html", resultUrl)
        window.location.href = newUrl
        break
      } else {
        if (i == arrNameMovie.length - 1) {
          document.getElementById("inputNameMovie").value = ""
          notFundMovie()
        }
      }
    }
  }
}


function popupPleaseInput() {
  let popup = document.getElementById("popup")
  popup.classList.add('active')

  let popup1 = document.getElementById("popup-body1")
  popup1.classList.add('active')

  let close = document.getElementById("close")
  close.addEventListener("click", closePopup)

  let blur = document.getElementById("background-blur")
  blur.classList.add('active')

}

function notFundMovie() {
  let popup = document.getElementById("popup")
  popup.classList.add('active')

  let popup2 = document.getElementById("popup-body2")
  popup2.classList.add('active')

  let close = document.getElementById("close")
  close.addEventListener("click", closePopup)

  let blur = document.getElementById("background-blur")
  blur.classList.add('active')
}


function closePopup() {
  let popup = document.getElementById("popup")
  popup.classList.remove('active')

  let popup1 = document.getElementById("popup-body1")
  popup1.classList.remove('active')

  let popup2 = document.getElementById("popup-body2")
  popup2.classList.remove('active')

  let blur = document.getElementById("background-blur")
  blur.classList.remove('active')
}


$(document).ready(function () {
  $.ajax({
    url: "xml/flim.xml",
    dataType: "text",
    async: true,
    success: function (xml) {
      let releaseDate = ''
      let nameMovie = ''
      let caption = ''
      let arrDate = []
      let arrMovie = []
      let arrCaption = []
      let i = 0
      let pos = 1
      $(xml).find("movie").each(function () {
        releaseDate = $(this).find("date").text()
        nameMovie = $(this).find("nameMovie").text()
        caption = $(this).find("captionMovie").text()

        arrDate.push(releaseDate)
        arrMovie.push(nameMovie)
        arrCaption.push(caption)

        let posDate = "#date1"
        let newDate = posDate.replace("#date1", "#date" + pos)

        let posName = "#name1"
        let newName = posName.replace("#name1", "#name" + pos)

        $(newDate).html(arrDate[i])

        $(newName).html("<h1>" + arrMovie[i] + "</h1>" + "<p>" + arrCaption[i] + "</p>")

        pos++
        i++

      })
    }
  })
})

