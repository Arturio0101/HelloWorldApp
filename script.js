// Client ID - f9abc199aaaae9b401d00f6375691435
// Client Secret (API Key) - e05c0062580287994183c26b545406b1

//  5260e1bc9ffbfa84616968566140338c
//  2e3a382f352547efbdf61afa86d77a5f

//  6897061e5cab90bceba49c2a9e1627a5
//  88c370475fe84a4b2cca8d4803b96128



        document.getElementById('fetch-button').addEventListener('click', function () {
            const stationNumber = document.getElementById('station-number').value;
            const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/stations/${stationNumber}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ClientID': '0e5548e0b97ad272470004fed518ae57', // Замените на ваш ClientID
                    'ClientSecret': '86ba2eedce6199dc6c6d0f624f08acc0' // Замените на ваш ClientSecret
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    // Обработка ошибок на основе статуса
                    switch (response.status) {
                        case 404:
                            throw new Error('Станция с указанным номером не найдена.');
                        case 406:
                            throw new Error('Запрашиваемый формат представления недоступен.');
                        case 503:
                            throw new Error('Сервис временно отключен.');
                        default:
                            throw new Error(`Произошла ошибка: ${response.status}`);
                    }
                }
            })
            .then(data => {
                // Отображение информации о станции
                const stationInfo = document.getElementById('station-info');
                stationInfo.innerHTML = `
                    <h2>Информация о станции</h2>
                    <p><strong>Название:</strong> ${data.name}</p>
                    <p><strong>Код станции:</strong> ${data.stationnumber}</p>
                    <p><strong>Услуги:</strong> ${data.services.join(', ')}</p>
                `;
                stationInfo.style.display = 'block'; // Показываем блок с информацией
                document.getElementById('error-message').innerText = ''; // Очищаем сообщение об ошибке
            })
            .catch(error => {
                // Отображение сообщения об ошибке
                document.getElementById('error-message').innerText = error.message;
                document.getElementById('station-info').style.display = 'none'; // Скрываем блок с информацией
            });
        });