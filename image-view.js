let currentLocation = window.location.href;
let currentLocationArr = {};
currentLocation = currentLocation.split('?')[1].split('&').forEach(item => currentLocationArr[item.split('=')[0]] = item.split('=')[1]);

fetch(`https://testskl-image-default-rtdb.europe-west1.firebasedatabase.app/Images/${currentLocationArr['id']}.json`)
.then(response => response.json())
.then(image => {
    for(let key in image) {
        let img = document.createElement('img');
        img.classList.add(key);
        document.querySelector('.image-view').append(img);
        img.src = image[key];
    }
});

const btn_plus = document.querySelector('.btn-plus');
const btn_minus = document.querySelector('.btn-minus');
const img_1 = document.querySelector('.btn-img-1');
const img_2 = document.querySelector('.btn-img-2');


img_1.onclick = function() {
    img_2.classList.remove('active');
    this.classList.add('active');
    resize(document.querySelector('.image_1'));
}

img_2.onclick = function() {
    img_1.classList.remove('active');
    this.classList.add('active');
}


function resize(img) {
    let width = img.width;
    console.log(width);
    btn_plus.onclick = () => {
        img.style.width += `${width + 100}px`;
        width += 100;
    }
}