function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
} 

function init(){
    document.getElementById("defaultOpen").click();
    const text = document.getElementById("notepad");
    text.addEventListener("keydown",function(evt){
        const key = evt.key
        if(key == "Tab"){
            evt.preventDefault();
            const start = text.selectionStart;
            text.value = text.value.slice(0,start) + "\t" + text.value.slice(start);
            text.selectionStart = text.selectionEnd = start + 1;
        }
        else if(key == "ArrowUp" || key == "ArrowDown" || key == "Enter"){
            setTimeout(() => {
                const endOfLastLine = text.value.lastIndexOf("\n", text.selectionStart);
                const startOfLastWord = Math.max(text.value.lastIndexOf(" ", endOfLastLine - 2), text.value.lastIndexOf("\n", endOfLastLine - 2))
                const lastWord = text.value.slice(startOfLastWord + 1, endOfLastLine + 1);
                getRhymes(lastWord);
            },5);
        }
    }, false)
}

function inspire(){
    fetch("/api/random_word")
    .then(response => response.text())
    .then(response => console.log(response));
}

let timeout;
function input(){
    clearInterval(timeout);
    timeout = setTimeout(() => {
        save();
    }, 1500)
}

function save(){
    console.log("SAVED!");
}

function getRhymes(lastWord){
    fetch("https://api.datamuse.com/words?rel_rhy=" + lastWord)
    .then(response => response.json())
    .then(response => {
       const rhymes = response.slice(0,10)
                              .map(el => el.word);
       console.log(rhymes)
       const element = document.getElementById("rhymes");
       element.innerText = rhymes.join(", ");
    });
}