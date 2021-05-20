let currentLocation = window.location.href;
let currentLocationArr = {};
currentLocation = currentLocation.split('?')[1].split('&').forEach(item => currentLocationArr[item.split('=')[0]] = item.split('=')[1]);

let firstImgBase64 = '';
let secondImgBase64 = '';

document.querySelector('.f-1').onchange = function(event) {
    let files = event.target.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => {
            firstImgBase64 = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
    else {
    }
}

document.querySelector('.f-2').onchange = function(event) {
    let files = event.target.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => {
            secondImgBase64 = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
    else {
    }
}


document.querySelector('.send-data').onclick = () => {
    if(firstImgBase64 && !secondImgBase64) {
        firebase.database().ref(`Images/${currentLocationArr['id']}`).set({
            image_1: firstImgBase64
        });
        sendMessage();
    }
    else if(secondImgBase64 && !firstImgBase64) {
        firebase.database().ref(`Images/${currentLocationArr['id']}`).set({
            image_1: secondImgBase64
        });
        sendMessage();
    }
    else if(firstImgBase64 && secondImgBase64) {
        firebase.database().ref(`Images/${currentLocationArr['id']}`).set({
            image_1: firstImgBase64,
            image_2: secondImgBase64,
        });
        sendMessage();
    }
    else {
        alert('err');
    }
}

let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function (e) {
    let countFiles = '';
    if (this.files && this.files.length >= 1)
        countFiles = this.files.length;
    if (countFiles)
        label.querySelector('.input__file-button-text').innerText = 'Вибрано файлів: ' + countFiles;
    else
        label.querySelector('.input__file-button-text').innerText = labelVal;
    });
});


const lowLetters = 'abcdefghijklmnopqrstuvwxyz';
const upLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const arrNumbers = {
    '0': 'B',
    '1': 'D',
    '2': 'A',
    '3': 'F',
    '4': 'Q',
    '5': 'Y',
    '6': 'V',
    '7': 'M',
};

function deCodeStr(userName) {
    return userName.replace(/[a-zA-Z]/g, (element) => {
        if (upLetters.indexOf(element) != -1) {
            for (let key in arrNumbers) {
                if (arrNumbers[key] == element) return key;
            }
        }
        if (lowLetters.indexOf(element) != -1) {
            let index = lowLetters.indexOf(element);
            if (index > 6) return lowLetters[index - 7];
            else return lowLetters[26 - (7 - index)];
        }
        if (element == 'X') return '\_';
    });
};

const problemsList = {
    '01': 'Бот видав неправильну відповідь на питання із тесту',
    '02': 'Не зарахувались спроби після успішної оплати',
    '03': 'Не отримав бонусний тест',
    '04': 'Бот видав неправильну відповідь на питання із тесту',
    '05': 'Жодна із перелічених вище проблем',
}

const name = document.querySelector('#fname');

const token = '1756797458:AAG3f32xEQy8S-WNIDrOCtDesNLBrvAqMx8';
const chatId = currentLocationArr['id'];
const groupId = '-1001492578402';
const problem = problemsList[currentLocationArr['code']];

function sendMessage() {
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupId}&text=Проблема: ${problem}%0AКористувач: @${deCodeStr(currentLocationArr['user'])}%0AІм'я: ${name.value}%0ATelegramID: ${chatId}%0AФото: https://testskl.github.io/image-view?id=${chatId}`);

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Ваша заявка прийнята. Незабаром з Вами зв'яжеться менеджер.`)
}
