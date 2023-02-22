"use strict"

const boxDays = document.querySelector('.time-box__days');
const boxHours = document.querySelector('.time-box__hours');
const boxMinutes = document.querySelector('.time-box__minutes');
const boxSeconds = document.querySelector('.time-box__seconds');
const input = document.querySelector('.form__input');
const form = document.querySelector(".form");
const formInputButton = document.querySelector(".form__input-button");
const notification = document.querySelector(`#alert`);


// Таймер
document.addEventListener('DOMContentLoaded', function() {
    const deadline = new Date('2023, 05, 31');
    let timerId = null;

    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        boxDays.textContent = days < 10 ? '0' + days : days;
        boxHours.textContent = hours < 10 ? '0' + hours : hours;
        boxMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        boxSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
});

// template 
function showТotification(type, header, paragraf) {
    const messageFail = type;
    const success = messageFail.content.firstElementChild.cloneNode(true);
    success.querySelector('.popup__heading-two').textContent = header;
    success.querySelector('.popup__paragraf').textContent = paragraf;
    document.body.classList.add('active');
    document.body.append(success);

    const popupButton = document.querySelector(".popup__button");
    const buttonIcon = document.querySelector(".popup__button-icon");

    popupButton.addEventListener("click", closeAwindow);
    buttonIcon.addEventListener("click", closeAwindow);

    function closeAwindow() {
        success.remove();
        document.body.classList.remove('active');
        return
    }

}



formInputButton.addEventListener("click", () => {
    // Валидация формы
    const REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const address = document.querySelector('.form__input').value;
    if (REG.test(address) == false) {
        alert('Введите корректный e-mail');
        return false
    }

    // Отправка данных с помощью ajax
    const getOutcome = (resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve("Запись успешно внесена!");
        } else {
            reject("Ошибка!");
        }
    };

    async function makeExperiment() {
        const result = await new Promise(function(resolve, reject) {
            getOutcome(resolve, reject);
        });
        return result;
    }

    makeExperiment()
        .then(() => showТotification(notification, 'SUCCESS!', 'You have successfully subscribed to the email newsletter'))
        .catch(() => showТotification(notification, 'ERROR!', 'Try again'))
        .finally(() => form.reset());

});