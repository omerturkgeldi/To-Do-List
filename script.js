const isEkle_btn = document.querySelector("#isEkleButton");
const formInput = document.querySelector("#formInput");
const todoList = document.getElementById("todoList");
const clearButton = document.getElementById("clear-todo");
let clearAll = document.querySelector("#clearAllTodos");
let tickButton = document.querySelector("#tick-todo");

//
// Tüm todoları temizle
//
clearAll.addEventListener("click", clearAllTodos);

function clearAllTodos(e) {
    if (confirm("Emin misiniz?")) {
        todoList.innerHTML = "";
    }
}

var addToUI = function(e) {

    const inputValue = document.getElementById("formInput").value;

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(inputValue);

    localStorage.setItem("todos", JSON.stringify(todos));
}

var getFromUI = function(e) {
    const inputValue = document.getElementById("formInput").value;
    let todos;

    console.log(localStorage.getItem("todos"));

}



/******************************************************************************************************/

//
// Tamamlandı olarak işaretle
//
tickButton.addEventListener("click", func_tickTodo);

var func_tickTodo = function(e) {
    var tiklananElement = e.target;
    if (tiklananElement.dataset.type == "icon") {
        tiklananElement = tiklananElement.parentElement;
    }

    if (tiklananElement.dataset.role === "tick-todo") {
        var classEklendiMi = tiklananElement.parentElement.parentElement.parentElement.classList.toggle("color-ticked");
        var tikIconu = `<i class="material-icons" data-type="icon" style="font-size: 24px;">done</i>`;
        var kaldirIconu = `<i class="material-icons" data-type="icon" style="font-size: 24px;">close</i>`;
        console.log(classEklendiMi);
        if (classEklendiMi) {
            tiklananElement.innerHTML = kaldirIconu;
        } else {
            tiklananElement.innerHTML = tikIconu;
        }
    }
}

/******************************************************************************************************/


var setDeleteOnClick = function() {
    var silButtonList = document.getElementsByClassName("silButonu");


    // Önce temizliyoruz...
    for (var i = 0; i < silButtonList.length; i++) {
        var btn = silButtonList[i];
        if (btn != null) {
            btn.removeEventListener("click", deleteItem);
        }
    }

    // Sonra fonksiyon atıyoruz
    for (var i = 0; i < silButtonList.length; i++) {
        var btn = silButtonList[i];
        btn.addEventListener("click", deleteItem);
    }
}

var setTickOnClick = function() {
    var tickButtonList = document.getElementsByClassName("tikButonu");

    for (var i = 0; i < tickButtonList.length; i++) {
        var btn = tickButtonList[i];
        if (btn != null) {
            btn.removeEventListener("click", func_tickTodo);
        }
    }

    for (var i = 0; i < tickButtonList.length; i++) {
        var btn = tickButtonList[i];
        btn.addEventListener("click", func_tickTodo);
    }



}


setDeleteOnClick();
setTickOnClick();

/******************************************************************************************************/


var deleteItem = function(e) {

    if (confirm("Emin misiniz?")) {
        var tiklananElement = e.target;
        if (tiklananElement.dataset.type == "icon") {
            tiklananElement = tiklananElement.parentElement;
        }

        if (tiklananElement.id === "clear-todo") {
            tiklananElement.parentElement.parentElement.parentElement.remove();
        }
    }
}

var input = document.getElementById("formInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("isEkleButonu").click();
    }
});


function getInputValue() {

    const inputValue = document.getElementById("formInput").value;

    if (inputValue == "" || inputValue == null) {
        alert("Lütfen iş tanımını giriniz!");
    } else {

        document.getElementById("todoList").innerHTML += `
    <div class=" div-card btn-todo alert alert-primary button-curved">
        <div class="row" id="checked-todo">
            <div class="col-md-6 col-7 col-lg-6">
                <h5 class="text-black todoTitle">${inputValue}</h5>
            </div>
            <div class="col-md-6 col-5 col-lg-6 text-right">
                <a class="silButonu btn alert-danger button-curved col-4 col-md-3 col-lg-2"  style="color: white;" id="clear-todo"><i data-type="icon" class="material-icons" style="font-size: 24px;">delete</i></a>
                <a class="tikButonu btn tickButton-color button-curved col-4 col-md-3 col-lg-2" style="color: white;" id="tick-todo" data-role="tick-todo"><i data-type="icon" class="material-icons" style="font-size: 24px;">done</i></a>
            </div>
        </div>
    </div>`;


        /********************************************************/


        /********************************************************/

        addToUI();
        getFromUI();

        setDeleteOnClick();
        setTickOnClick();

        document.getElementById('formInput').value = '';
    }
}



var form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
});
