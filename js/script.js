const inputRub = document.querySelector('#mdl'),
    inputUsd = document.querySelector('#usd');


let valueBtnClick = 'MDLUSD';

const container = document.querySelector('.container');
totalCurse = document.createElement('div');
container.appendChild(totalCurse);

function changeTotalCurse(total) {
    totalCurse.innerHTML = `<h2>Текущий курс: ${total}</h2>`;
}



changeTotalCurse("0");


inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', `https://currate.ru/api/?get=rates&pairs=${valueBtnClick}&key=c5d61203133a4389db931c72a6d10bcf`, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
        if (request.status === 200) {
            const parseData = JSON.parse(request.response);
            total = parseData.data[valueBtnClick];
            inputUsd.value = (+inputRub.value * total).toFixed(2);

            changeTotalCurse(total);

            console.log(parseData.data[valueBtnClick]);
        } else {
            inputUsd.value = 'Что то пошло не так';
        }
    })
    console.log(request.responseText);
});

// c5d61203133a4389db931c72a6d10bcf


const curList = document.querySelector('#curList');

const curs = new XMLHttpRequest();

curs.open('GET', 'https://currate.ru/api/?get=currency_list&key=c5d61203133a4389db931c72a6d10bcf', true);
curs.setRequestHeader('Content-type', 'application/json; charset=utf-8');
curs.send();

curs.addEventListener('load', () => {
    if (curs.status === 200) {
        const parseCur = JSON.parse(curs.response);
        for (let i = 0; i < parseCur.data.length; i++) {
            if (i % 5 == 0) {
                curList.innerHTML += `<br>`;
            }
            // Создаем кнопку
            const buttonHTML = `<button class="selectCurrBtn" value=${parseCur.data[i]}>${parseCur.data[i]}</button>`;
            curList.innerHTML += buttonHTML;
        }

        const cursBtn = document.querySelectorAll('.selectCurrBtn'),
            firstCurName = document.querySelector('.firstCurName'),
            secondCurName = document.querySelector('.secondCurName');

        cursBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target;
                console.log(btn.value);
                valueBtnClick = btn.value;
                firstCurName.textContent = btn.value.substring(0, 3);
                secondCurName.textContent = btn.value.substring(3, 6);
            });
        });

    } else {
        curList.innerHTML = `<h2>Ошибка запроса!</h2>`;

    }
});







