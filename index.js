
const meterNum = 3.281 // meters to feet
const literNum = 0.264 // liters to gallons
const kiloNum = 2.204 // kilos to pounds
const input = document.getElementById("input-el") // text input
const convertBtn = document.getElementById("convert-btn")
const lengthEl = document.getElementById("length-el")
const volumnEl = document.getElementById("volume-el")
const massEl = document.getElementById("mass-el")
const lightBtn = document.getElementById("light-el")
const darkBtn = document.getElementById("dark-el")
const h2 = document.querySelectorAll("h2")
const boxes = document.querySelectorAll(".unit-box")
const appBottom = document.querySelector(".app-bottom")

/* checking for dark mode preference and then running darkmode function if true */

const runColorMode = (fn) => {
  if (!window.matchMedia) {
    return
  }
  
  const query = window.matchMedia('(prefers-color-scheme: dark)')

  fn(query.matches)

  query.addEventListener('change', (event) => fn(event.matches))
}

runColorMode((isDarkMode) => {
  if (isDarkMode) {
    darkMode()
  } else {
    lightMode()
  }
})

/* light and dark mode */

function darkMode() {
    lightBtn.classList.remove("active")
    darkBtn.classList.add("active")
    h2.forEach((h2) => {
        h2.classList.add("dark-mode")
    })
    boxes.forEach((boxes) => {
        boxes.classList.add("dark-mode")
    })
    appBottom.classList.add("dark-mode")
}

function lightMode() {
    darkBtn.classList.remove("active")
    lightBtn.classList.add("active")
    h2.forEach((h2) => {
        h2.classList.remove("dark-mode")
    })
    boxes.forEach((boxes) => {
        boxes.classList.remove("dark-mode")
    })
    appBottom.classList.remove("dark-mode")
}

lightBtn.addEventListener("click", function() {
    lightMode()
})
darkBtn.addEventListener("click", function() {
    darkMode()
})

/* input filter functionality */

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

setInputFilter(input, function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, "Only digits and '.' are allowed");

/* convert functionality*/

function convert(x) {
    let feet = x * meterNum
    let meters = x / meterNum
    let gallons = x * literNum
    let liters = x / literNum
    let pounds = x * kiloNum
    let kilos = x / kiloNum
    let arr = [feet,meters,gallons,liters,pounds,kilos]
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.round((arr[i] + Number.EPSILON) * 1000) / 1000
    }
    lengthEl.textContent = `${x} meters = ${arr[0]} feet | ${x} feet = ${arr[1]} meters`
    volumnEl.textContent = `${x} liters = ${arr[2]} gallons | ${x} gallons = ${arr[3]} liters`
    massEl.textContent = `${x} kilos = ${arr[4]} pounds | ${x} pounds = ${arr[5]} kilos`
}

convertBtn.addEventListener("click", function () {
    let inputVal = Number(input.value)
    convert(inputVal)
    
})


//Math.round((totalPrice + Number.EPSILON) * 1000) / 1000 // code for rounding up to three decimal places
