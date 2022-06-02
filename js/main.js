/*
для решения домашней работы использована информация:
https://learn.javascript.ru/number#okruglenie - тип данных числа
https://habr.com/ru/post/657625/ способ №9 - 10 способов поменять местами два значения в JavaScript
*/

/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.
Диапазон может быть только положительный, включая ноль.
Придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
*/

function getNumber(num1, num2) {
  if (Math.abs(+num1) > Math.abs(+num2)) {
    [num1, num2] = [num2, num1];
  }
  return Math.floor((Math.random()*(Math.abs(+num2)-Math.abs(+num1)+1))+Math.abs(+num1));
}

getNumber();
// console.log(getNumber(0.00009, 1.00001)); //может выдать 0

/*
Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
Диапазон может быть только положительный, включая ноль.
Придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях.
Например, 1.1, 1.2 — корректный диапазон.
Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
*/

// функция getNumber является частным случаем для getRandomNumber без указания 3го параметра, с пустой строкой или указанным 0.
// убрали +1 так как выходит за верхний диапазон (другой принцип округления)
// положительный диапазон Math.abs()
// пустая строка = 0
// если 'от' больше чем 'до' => меняем местами
// если 'от' = 'до' считаем что норм (пока не понятно как это повлияет на то что будем делать потом...)
// в интернете говорят... что для gps координат 5 знаков после точки более чем достаточно)
// 6 цифр находится в сантиметровом диапазоне, и обычно Наиболее точным, что имеет смысл для устройства GPS

function getRandomNumber(fromNumber, toNumber, floatNumber,) {
  if (Math.abs(+fromNumber) > Math.abs(+toNumber)) {
    [fromNumber, toNumber] = [toNumber, fromNumber];
  }
  return +((Math.random()*(Math.abs(+toNumber)-Math.abs(+fromNumber)))+Math.abs(+fromNumber)).toFixed(Math.abs(+floatNumber));
}

getRandomNumber();
// Проверки
// console.log(getRandomNumber(0, 100, 0));
// console.log(getRandomNumber(0, 100, 5));
// console.log(getRandomNumber(0, 100));

// console.log(getRandomNumber(1.4, 5.458, 1));
// console.log(getRandomNumber(0.04, 0.458, 5));
// console.log(getRandomNumber(5.04, -5.04));

// может выдать 0 (Наиболее часто встречающаяся ошибка при работе с числами в JavaScript – это потеря точности.)
// console.log(getRandomNumber(0.00009, 1.00001));

// console.log(getRandomNumber(10.4, -5.458, 2));
// console.log(getRandomNumber('1.4', -5.458, ''));
// console.log(getRandomNumber('', -58, 1));
// console.log(getRandomNumber(NaN, -58, 1)); // NaN
// console.log(getRandomNumber(Infinity, -58, 1)); // infinity
// console.log(getRandomNumber('', -58, NaN)); // идет как 0
// console.log(getRandomNumber('', -58, Infinity)); // а тут краш
