const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//Toggle function for blue/dark/white theme
document.addEventListener("DOMContentLoaded", function () {
    // Check local storage for user's mode preference
    const currentMode = localStorage.getItem('mode');
    const headingColor = localStorage.getItem('headingColor');
    const heading = document.querySelector('h1');
    
    // If no preference is set, default to light mode
    if (!currentMode) {
        heading.style.color = "darkred";
        localStorage.setItem('headingColor', "darkred"); 
        document.body.classList.add('light-mode');
        document.getElementById('mode-icon').style.color = 'black';
        document.body.style.backgroundColor = "white";
    } else {
        // Set body to the saved mode
        document.body.classList.add(currentMode); 
        if (currentMode === 'dark-mode') {
            heading.style.color = "rgb(172, 199, 241)";
            localStorage.setItem('headingColor', "rgb(172, 199, 241)");
            document.getElementById('mode-icon').style.color = 'white';
            document.body.style.backgroundColor = "#121212";
        } else if (currentMode === 'dark-shade-mode') {
            heading.style.color = "white";
            localStorage.setItem('headingColor', "white");
            document.getElementById('mode-icon').style.color = 'white';
            document.body.style.backgroundColor = "#2b2b2b";
        } else {
            heading.style.color = "darkred";
            localStorage.setItem('headingColor', "darkred");
            document.getElementById('mode-icon').style.color = 'black';
            document.body.style.backgroundColor = "white";
        }
    }

    // Toggle function
    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            // Toggle the mode
            if (document.body.classList.contains('dark-mode')) {
                // Switch to light mode
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('mode', 'light-mode');
                heading.style.color = "darkred";
                localStorage.setItem('headingColor', "darkred"); 
                document.getElementById('mode-icon').style.color = 'black'; 
                document.body.style.backgroundColor = "white";
            } else if (document.body.classList.contains('light-mode')) {
                // Switch to dark shade mode
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-shade-mode');
                localStorage.setItem('mode', 'dark-shade-mode');
                heading.style.color = "white"; 
                localStorage.setItem('headingColor', "white"); 
                document.getElementById('mode-icon').style.color = 'white'; 
                document.body.style.backgroundColor = "#2b2b2b"; 
            } else if (document.body.classList.contains('dark-shade-mode')) {
                // Switch to dark mode
                document.body.classList.remove('dark-shade-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('mode', 'dark-mode');
                heading.style.color = "rgb(172, 199, 241)"; 
                localStorage.setItem('headingColor', "rgb(172, 199, 241)"); 
                document.getElementById('mode-icon').style.color = 'white';
                document.body.style.backgroundColor = "#121212";
            }
        });
    }
});

//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//ste strength circle color to grey


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow - HW
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});