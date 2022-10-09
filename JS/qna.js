$(document).ready(function () {
    $.ajax({
        url: "../xml/QnA.xml",
        dataType: "text",
        async: true,
        success: showQ
    })
})

function showQ(xml) {
    let dataForm = ""
    $(xml).find("from").each(function () {
        if ($(this).find("status").text() == "succeed") {
            dataForm += "<p><b>Question : </b>" + $(this).find("question").text() + "</p>"
            dataForm += "<p><b>Answer : </b>" + $(this).find("Answer").text() + "</p>"
            dataForm += "<br>"
            dataForm += "<br>"
        }
        $("#Form_Q").html(dataForm)
    })
}
