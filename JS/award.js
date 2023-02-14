var formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits:0,
    minimumFractionDigits:0,
    style: 'currency',
    currency: 'USD',
  });

$(document).ready(function(){
    $.ajax({
      url:"../xml/award.xml",
      dataType:"text",
      async: true,
      success: showAwardsAll
    })
})

function showAwardsAll(xml) {
    let i=1
    let dataAwardsAll=""
    let OscarAward_n=0
    let OscarAward_w=0
    let BAFTA_n=0
    let BAFTA_w=0
    let GoldenGlobeAward_n=0
    let GoldenGlobeAward_w=0
    $(xml).find("AwardsAll").each(function () {
        $(this).find("Awards").each(function(){
            if(i==1){
                dataAwardsAll+="<table border=1>"
                dataAwardsAll+="<tr><th rowspan='2'>ปี</th><th rowspan='2'>เรื่อง</th><th colspan='2'>Oscar Award</th><th colspan='2'>BAFTA</th><th colspan='2'>Golden Globe Award</th></tr>"
                dataAwardsAll+="<tr><th>เสนอชื่อเข้าชิง</th><th>ชนะ</th><th>เสนอชื่อเข้าชิง</th><th>ชนะ</th><th>เสนอชื่อเข้าชิง</th><th>ชนะ</th></tr>"
            }
            dataAwardsAll+="<tr>"
            dataAwardsAll+="<td>"+$(this).find("year").text()+"</td>"
            dataAwardsAll+="<td><a href='"+$(this).find("a").text()+"'>"+$(this).find("subject").text()+"</a></td>"
            $(this).find("OscarAward").each(function(){
                if($(this).find("nominated").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("nominated").text()+"</td>"
                    OscarAward_n+=parseInt($(this).find("nominated").text())
                }
                if($(this).find("win").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("win").text()+"</td>"
                    OscarAward_w+=parseInt($(this).find("win").text())
                }
            })
            $(this).find("BAFTA").each(function(){
                if($(this).find("nominated").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("nominated").text()+"</td>"
                    BAFTA_n+=parseInt($(this).find("nominated").text())
                }
                if($(this).find("win").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("win").text()+"</td>"
                    BAFTA_w+=parseInt($(this).find("win").text())
                }
            })
            $(this).find("GoldenGlobeAward").each(function(){
                if($(this).find("nominated").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("nominated").text()+"</td>"
                    GoldenGlobeAward_n+=parseInt($(this).find("nominated").text())
                }
                if($(this).find("win").text()=="0"){
                    dataAwardsAll+="<td></td>"
                }
                else{
                    dataAwardsAll+="<td>"+$(this).find("win").text()+"</td>"
                    GoldenGlobeAward_w+=parseInt($(this).find("win").text())
                }
            })
            dataAwardsAll+="</tr>"
            i++;
        }) 
        dataAwardsAll+="<tr><th colspan='2'>ทั้งหมด<th>"+OscarAward_n+"</th><th>"+OscarAward_w+"</th><th>"+BAFTA_n+"</th><th>"+BAFTA_w+"</th><th>"+GoldenGlobeAward_n+"</th><th>"+GoldenGlobeAward_w+"</th></tr>"
        $("#AwardsAll").html(dataAwardsAll)
    })
}

$(document).ready(function(){
    $.ajax({
      url:"../xml/award.xml",
      dataType:"text",
      async: true,
      success: showFeedback
    })
})

function showFeedback(xml) {
    let i=0
    let dataFeedback=""
    let allcapital=0
    let allpercent=0
    let allscore=0
    let allsum=0
    $(xml).find("feedback").each(function () {
        $(this).find("Awards").each(function(){
            if(i==0){
                dataFeedback+="<table border=1>"
                dataFeedback+="<tr><th>ปี</th><th>เรื่อง</th><th>Rotten Tomatoes</th><th>ทุนสร้าง</th><th>รายได้ทั่วโลก</th></tr>"
            }
            dataFeedback+="<tr>"
            dataFeedback+="<td>"+$(this).find("year").text()+"</td>"
            dataFeedback+="<td><a href='"+$(this).find("a").text()+"'>"+$(this).find("subject").text()+"</a></td>"
            $(this).find("rottentomatoes").each(function(){
                dataFeedback+="<td>"+$(this).find("percent").text()+"% ("+$(this).find("score").text()+"/10) ("+$(this).find("review").text()+" รีวิว)"
                allpercent+=parseInt($(this).find("percent").text())
                allscore+=parseInt($(this).find("score").text())
            })
            dataFeedback+="<td>"+formatter.format(parseInt($(this).find("capital").text()))+"</td>"
            allcapital+=parseInt($(this).find("capital").text())
            dataFeedback+="<td>"+formatter.format(parseInt($(this).find("sum").text()))+"</td>"
            allsum+=parseInt($(this).find("sum").text())
            dataFeedback+="</tr>"
            i++;
        })
        dataFeedback+="<tr><th colspan='2'>รวม<th>"
        +(allpercent/11).toFixed(0)+"% ("
        +(allscore/11).toFixed(2)+"/10)</th><th>"
        +formatter.format(allcapital)+"</th><th>"
        +formatter.format(allsum)+"</th></tr>"
        $("#Feedback").html(dataFeedback)
    })
}

$(document).ready(function(){
    $.ajax({
      url:"../xml/award.xml",
      dataType:"text",
      async: true,
      success: showDirectors
    })
})

function showDirectors(xml) {
    let i=0
    let dataDirectors=""
    $(xml).find("Directors_work").each(function () {
        $(this).find("Awards").each(function(){
            if(i==0){
                dataDirectors+="<table border=1>"
                dataDirectors+="<tr><th rowspan='2'>ปี</th><th rowspan='2'>เรื่อง</th><th colspan='2'>ร่วมด้วย</th><th rowspan='2'>หมายเหตุ</th></tr>"
                dataDirectors+="<tr><th>อำนวยการสร้าง</th><th>เขียนบท</th></tr>"
            }
            dataDirectors+="<tr>"
            dataDirectors+="<td>"+$(this).find("year").text()+"</td>"
            if($(this).find("a").text()=="0"){
                dataDirectors+="<td>"+$(this).find("subject").text()+"</td>"
            }
            else{
                dataDirectors+="<td><a href='"+$(this).find("a").text()+"'>"+$(this).find("subject").text()+"</a></td>"
            }
            $(this).find("join").each(function(){
                if($(this).find("executive_p").text()=="0"){
                    dataDirectors+="<td></td>"
                }
                else{
                    dataDirectors+="<td class='y'>"+$(this).find("executive_p").text()+"</td>"
                }
                if($(this).find("write_script").text()=="0"){
                    dataDirectors+="<td></td>"
                }
                else{
                    dataDirectors+="<td class='y'>"+$(this).find("write_script").text()+"</td>"
                }
            })
            dataDirectors+="<td>"
            $(this).find("note").each(function(){
                if($(this).find("p").text()=="0"){
                    dataDirectors+=" "
                }
                else{
                    dataDirectors+=$(this).find("p").text()+" "
                }
            })
            dataDirectors+="</td>"
            dataDirectors+="</tr>"
            i++;
        })
        $("#Directors").html(dataDirectors)
    })
}

$(document).ready(function(){
    $.ajax({
      url:"../xml/award.xml",
      dataType:"text",
      async: true,
      success: showex_producer
    })
})

function showex_producer(xml) {
    let i=0
    let dataex_producer=""
    $(xml).find("executiveproducer").each(function () {
        $(this).find("Awards").each(function(){
            if(i==0){
                dataex_producer+="<table border=1>"
                dataex_producer+="<tr><th rowspan='2'>ปี</th><th rowspan='2'>เรื่อง</th><th colspan='2'>ร่วมด้วย</th><th rowspan='2'>หมายเหตุ</th></tr>"
                dataex_producer+="<tr><th>อำนวยการสร้าง</th><th>เขียนบท</th></tr>"
            }
            dataex_producer+="<tr>"
            dataex_producer+="<td>"+$(this).find("year").text()+"</td>"
            if($(this).find("a").text()=="0"){
                dataex_producer+="<td>"+$(this).find("subject").text()+"</td>"
            }
            else{
                dataex_producer+="<td><a href='"+$(this).find("a").text()+"'>"+$(this).find("subject").text()+"</a></td>"
            }
            $(this).find("join").each(function(){
                if($(this).find("executive_p").text()=="0"){
                    dataex_producer+="<td></td>"
                }
                else{
                    dataex_producer+="<td class='y'>"+$(this).find("executive_p").text()+"</td>"
                }
                if($(this).find("write_script").text()=="0"){
                    dataex_producer+="<td></td>"
                }
                else{
                    dataex_producer+="<td class='y'>"+$(this).find("write_script").text()+"</td>"
                }
            })
            dataex_producer+="<td>"
            $(this).find("note").each(function(){
                if($(this).find("p").text()=="0"){
                    dataex_producer+=" "
                }
                else{
                    dataex_producer+=$(this).find("p").text()+" "
                }
            })
            dataex_producer+="</td>"
            dataex_producer+="</tr>"
            i++;
        })
        $("#ex_producer").html(dataex_producer)
    })
}