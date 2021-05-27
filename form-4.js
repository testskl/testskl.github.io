let currentLocation = window.location.href;
let currentLocationArr = {};
currentLocation = currentLocation.split('?')[1].split('&').forEach(item => currentLocationArr[item.split('=')[0]] = item.split('=')[1]);

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

const token = '1756797458:AAEqhA0-E9pGtvKsHuw-6ulsjPahpq0N79g';
const chatId = currentLocationArr['id'];
const groupId = '-1001492578402';
const problem = problemsList[currentLocationArr['code']];

const name = document.querySelector('#fname');
const topic = document.querySelector('#topic');
const problemText = document.querySelector('#problem');

document.querySelector('#send').onclick = () => {
    if(!!name.value && !!topic.value && !!problemText.value) {
        fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupId}&text=Проблема: ${problem}%0AКористувач: @${deCodeStr(currentLocationArr['user'])}%0AІм'я: ${name.value}%0ATelegramID: ${chatId}%0AТема: ${topic.value}%0AТекст проблеми: ${problemText.value}`);

        fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Ваша заявка прийнята. Незабаром з Вами зв'яжеться менеджер.`)
    }
    else {
        alert('Всі поля повинні бути заповнені.')
    }
}
