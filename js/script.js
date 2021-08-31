const filterByType = (type, ...values) => values.filter(value => typeof value === type), // Объявление функции filterByType, которая принимает тип данных и массив значений, возвращает значения нужного типа

	hideAllResponseBlocks = () => { // Объявление функции hideAllResponseBlocks, которая скрывате все "лишние" блоки с результатами
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // Находятся все контейнеры с классом "dialog__response-block", преобразуются в массив и сохраняются в переменную responseBlocksArray
		responseBlocksArray.forEach(block => block.style.display = 'none'); // Каждому элементу из найденных ранее присваивается стиль display = 'none'
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // Объявление функции, которая принимает селектор нужного блока ответа, сообщение, которое будет в этом блоке, селектор надписи-подсказки и показывает нужный блок
		hideAllResponseBlocks(); // Скрывается тот блок, который уже есть на странице
		document.querySelector(blockSelector).style.display = 'block'; // Переданному контейнеру присваивается стиль display = 'block' (он показывается на странице)
		if (spanSelector) { // если был передан текстовый блок, в который нужно поместить сообщение
			document.querySelector(spanSelector).textContent = msgText; // На странице находится блок с переданным селектором, его тексту присваивается переданное сообщение
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Функция вызывает showResponseBlock и передает туда красный блок, принятый текст (формулировку ошибки), id span'а в который будет помещено это сообщение

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Функция вызывает showResponseBlock и передает туда зеленый блок, принятый текст (либо полученные данные, либо сообщение о том, что данные нужного типа отсутствуют), id span'а в который будет помещено это сообщение

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // Функция, которая вызывает функцию showResponseBlock и передает туда блок, который не содержит информации (тот, что изначально был на странице)

	tryFilterByType = (type, values) => { // Объявляется функция tryFilterByType, которая принимает 2 строки: тип данных и сами данные
		try { // Объявляется блок "try", браузер пытается выполнить код из строк 24-28
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Запускается функция eval, которая пытается выполнить функцию filterByType, передавая туда тип данных и данные в виде массива, возможный результат записывается в переменную valuesArray
			const alertMsg = (valuesArray.length) ?  // Объявляется переменная alertMsg и тернарный оператор с условием "существует ли длина значения переменной valuesArray"
				`Данные с типом ${type}: ${valuesArray}` : // Если длина valuesArray больше 0 (были найдены данные с нужным типом), переменной alertMsg присваивается текст этой строки
				`Отсутствуют данные типа ${type}`; // Если длина valuesArray равна 0 (значений с нужным типом данных нет в строке), переменной alertMsg присваивается текст этой строки
			showResults(alertMsg); // Вызывается функция showResults, ей передается переменная alertMsg
		} catch (e) { // Если в блоке кода на строках 24-28  происходит ошибка
			showError(`Ошибка: ${e}`);  // Вызывается функция showError, в которую передается "пойманная" ошибка
		}
	};

const filterButton = document.querySelector('#filter-btn'); // Находится кнопка, запускающая программу

filterButton.addEventListener('click', e => { // На кнопку навешивается обработчик события "Клик", который вызывает стрелочную функцию
	const typeInput = document.querySelector('#type'); // Находится выпадающий список с типом данных
	const dataInput = document.querySelector('#data'); // Находится строка ввода данных

	if (dataInput.value === '') { // Условие: Если поле с входными данными пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // К полю добавляется сообщение валидации
		showNoResults(); // Вызывается функция showNoResults из 20 строки
	} else { // Иначе
		dataInput.setCustomValidity(''); // Сообщению валидации присваивается путсое значение
		e.preventDefault(); // Отменятеся стандартное поведение при событии "Клик" (отправка формы)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // Вызывается функция tryFilterByType из 22 строки, в неё передаются значение поля с типом данных и значение поля с данными
	}
});

