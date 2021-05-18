let currentLocation = window.location.href;
let currentLocationArr = {};
currentLocation = currentLocation.split('?')[1].split('&').forEach(item => currentLocationArr[item.split('=')[0]] = item.split('=')[1]);

console.log(currentLocationArr);

fetch(`https://testskl-image-default-rtdb.europe-west1.firebasedatabase.app/Images/${currentLocationArr['id']}.json`)
.then(response => response.json())
.then(image => {
    for(let key in image) {
        let img = document.createElement('img');
        document.querySelector('.image-view').append(img);
        img.src = image[key];
    }
})