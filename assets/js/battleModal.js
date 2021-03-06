// generates content for the modal
var modalHandler = function () {
    var monsterContainerEl = $("#monsterList-container")
    var monsterList = monsterContainerEl.find(".monster-container") || [];

    // takes each monster entered and makes their name into a button in the modal
    monsterList.each(function () {
        var monsterName = $(this).find(".card-title").text().split(":")[1].trim();
        var monsterId = $(this).attr("data-id")
        var modalButtonEl = $("<a>")
            .addClass("waves-effect waves-light btn modalButton")
            .text(monsterName)
            .attr("data-id", monsterId);

        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl);
    });
}

// on click of buttons in modal removes that button and formats <p> in .modal-content
var initiativeHandler = function (buttonEl) {
    // remove button clicked, save to list
    var searchHistory = JSON.parse(localStorage.getItem("monster")) || [];
    if (!searchHistory.length) {
        var id = 0;
    }
    else {
        var id = searchHistory[searchHistory.length - 1].id; // set id to last id saved
    }
    if (Number.isInteger(searchHistory[searchHistory.length - 1])) {
        var orderNum = searchHistory.pop() + 1;
    }
    else {
        var orderNum = 1;
    }
    var monsterIndex = searchHistory.findIndex(element => element.id === buttonEl.attr("data-id"));
    searchHistory[monsterIndex].orderNum = orderNum;
    searchHistory.push(orderNum);
    localStorage.setItem(JSON.stringify(searchHistory));
    buttonEl.remove();

    // reformat <p> in .modal-content
    var modalContent = $(".modal-content").children().eq(1).text().trim();
    modalContent = modalContent.split(" ")
    modalContent.pop()
    modalContent = `${modalContent.join(" ")} next?`;
    $(".modal-content p").text(modalContent);
}

$('.dropdown-trigger').dropdown();

$(document).ready(function () {
    $('.tooltipped').tooltip();
});

$(document).ready(function () {
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler($(this).html())
});

$(document).ready(function () {
    $('.tabs').tabs();
});

$(".classOption").click(function () {
    $("#playerClass").text($(this).text());
})

$(".raceOption").click(function () {
    $("#playerRace").text($(this).text());
})

$(".statusOption").click(function () {
    $("#playerStatus").text($(this).text());
})
