
// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";



window.addEventListener("load", function (e) {
	const bg = document.querySelectorAll('[data-bg]');
	if (bg.length) {
		bg.forEach(bgItem => {
			bgItem.insertAdjacentHTML('beforeend', '<div class="bg-item"></div>');
		});
	}


	if (document.querySelector('.video-module')) {
		document.addEventListener("watcherCallback", function (e) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			if (targetElement.dataset.watch === 'video' && !targetElement.classList.contains('_init')) {
				if (entry.isIntersecting) {
					// Видим объект
					targetElement.querySelector('video').play();
				} else {
					// Не видим объект
					targetElement.querySelector('video').pause();
				}
			}
		});
	}
});





// плвное появление при скролле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				// scroll bottom to hide no animation
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}

			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }

	}

	animOnScroll();
}






// check for PC or mobile
const menuArrows = document.querySelectorAll('.menu__arrow');
if (isMobile.any()) {
	document.body.classList.add('_touch');


	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener('click', function (e) {
				for (let index = 0; index < menuArrows.length; index++) {
					if (menuArrows[index] !== e.target) {
						menuArrows[index].parentElement.classList.remove('_active')
					}
				}
				menuArrow.parentElement.classList.toggle('_active');
			});

		}
	}
} else {
	document.body.classList.add('_pc');
}


// document.addEventListener("click", function (e) {
// 	if (e.target !== document.querySelector('.menu__arrow')) {
// 		for (let index = 0; index < menuArrows.length; index++){
// 			const menuAr = menuArrows[index];
// 			menuAr.parentElement.classList.remove('_active')
// 			}
// 	}
// 	console.log('doc click');
// });









// send form to telegram boots
const form = document.querySelector('.form');
const nameInput = document.querySelector('input[name="name"]');
const numberInput = document.querySelector('input[name="number"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('.form__textarea');

form.addEventListener('submit', (e) => {
	// location.reload();
	e.preventDefault();

	const name = nameInput.value.trim();
	const number = numberInput.value.trim();
	const email = emailInput.value.trim();
	const message = messageInput.value.trim();
	const url = `https://api.telegram.org/bot6041296828:AAFAXgZWKb8xqt5umV3Y0okx0msQvVm3NTY/sendMessage?chat_id=-994071360&text=Имя:%20${name}%0AНомер:%20${number}%0AEmail:%20${email}%0AСообщение:%20${message}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.ok) {
				let langs;
				if (localStorage.getItem('langs') === null) {
					langs = ["ru"];
				} else {
					langs = JSON.parse(localStorage.getItem('langs'));
				}
				let lang = langs[langs.length - 1];
				if (lang == "ru") {
					alert('Сообщение успешно отправлено!');
				}
				if (lang == "en") {
					alert('The message is successfully sent!');
				}
				nameInput.value = '';
				numberInput.value = '';
				emailInput.value = '';
				messageInput.value = '';
			} else {
				alert('Возникла ошибка при отправке сообщения. Попробуйте позже.');
			}
		})
		.catch(error => console.error(error));
});






document.addEventListener('DOMContentLoaded', getLocalLang)
const arrLang = {
	'en': {
		'main': 'Home',
		'goods': 'Catalog',
		'delivery': 'Shipping and payment',
		'contact': 'Contacts',
		'catBut': 'To catalog',
		'bouqets': 'Bouquets',
		'bouqetsQ': 'Flowers are a moment of nature captured in time',
		'fruitComp': 'Fruit compositions',
		'fruitCompQ': 'Fruit is the magic of nature that we turn into art',
		'regHol': 'Holiday decoration',
		'regHolQ': 'Each holiday is unique, and we create decorations that reflect its personality.',
		'airBall': 'Balloons and figures',
		'airBallQ': 'We create a real air fairy tale that will allow you to immerse yourself in the world of fantasy and magic',
		'plants': 'House plants',
		'plantsQ': 'Bring nature into your home with our collection of beautiful and healthy indoor plants',
		'wedFlor': 'Wedding floristry',
		'wedFlorQ': 'Flowers for the bride are a hymn of femininity and sensuality',
		'gift': 'Souvenirs and gifts',
		'giftQ': 'Our team of experts is always ready to help you choose the gift that is right for you and the person you want to please.',
		'MensBouqets': "Men's bouquets",
		'MensBouqetsQ': "Give your man something special with our men's bouquets that reflect his personality and style.",
		'flowerComp': 'Flower arrangements',
		'flowerCompQ': 'A reverent attitude to flowers and the skill of florists is a guarantee that the gift will bring joy and pleasure to you and the person to whom it is intended.',
		'catalog': 'Catalog',
		'ourTeam': 'Our Team',
		'ourTeamQ': "We are the team of professional florists existing more than 5 years and working with love and passion to the business. We are proud of the fact that we could become reliable partners and part of the life of our clients within all these years. Ours the purpose - to surpass expectations and to embody your ideas in unique flower relations. We are glad to be in the city of Slonim and to share beauty and a cosiness of our salon with inhabitants this wonderful place. Thank you for choosing our flower salon, and are always ready to create for you unforgettable flower compositions which will be presented to you joy and impressions for many years.",
		'ourTeamLead': 'Martynenko Svetlana',
		'ourWork': 'Our Work',
		'ourWorkQ': 'Collecting a bouquet is not difficult. And only we can make an original gift that will touch the recipient to the core!',
		'costDelivery': 'Delivery cost',
		'booking': 'Orders are accepted from 9:00 to 22:00.',
		'deliveryOrders': 'Orders are delivered around the clock.',
		'deliveryZone': 'Delivery zone',
		'green': 'Green zone',
		'greenCondition': 'At the order from 60 rubles free shipping. If order value is lower than 60 rubles, the cost of delivery will be 5 rubles.',
		'violet': 'Violet zone',
		'violetCondition': 'At the order from 80 rubles free shipping. If order value ranging from 60 up to 80 rubles, - the cost of delivery is 2 rubles. If order value is lower than 60 rubles, - the cost of delivery will be 7 rubles.',
		'deliveryOut': 'Delivery cost out of limits of a violet zone makes a reservation upon.',
		'deliveryPossible': 'Delivery is possible to any region of Belarus.',


		'regionFreeDelivery': 'Regions of free delivery (when ordering from 55 rubles).',
		'bolVil': 'Bolsheshilovichsky Village Council:',
		'bolShil': 'village Bolshie Shilovichi ',
		'shapaevo': 'village Chepelevo ',
		'shilovichi': 'village Shilovichi (distillery)',
		'vasilSelsovet': 'Vasilevichsky Village Council:',
		'vorobevichi': 'village Vorobyevichi:',
		'razanovschina': 'village Rezanovshchina ',
		'villageSel': 'Derevyanchitsky Village Council:',
		'brakovo': 'village Brakovo ',
		'derevian': 'village Derevyanchitsy',
		'skoldichi': 'village Skoldichi',
		'tyshevichi': 'village Tushevichi',
		'jirovichskiySel': 'Zhirovichi Village Council:',
		'jirovichi': 'village Zhirovichi ',
		'ozginovskiySel': 'Ozginovichsky Village Council:',
		'chemery': 'village Chemery',
		'pavlovskiySel': 'Pavlovsky Village Council:',
		'petralevichiOne': 'village Petralevichi I',
		'petralevichiTwo': 'village Petralevichi II',
		'talkovschina': 'village Talkovshchina',
		'cost': 'Price',
		'costOfDelivery': 'The cost of delivery in the city and within 10 km of our salon when ordering from 55.00 rubles is free.',
		'ifSumm': 'If the order amount is less than 55.00 rubles, - the delivery cost will be 5.00 rubles.',
		'calculationOfSumm': 'Calculation of the cost of delivery beyond 10 km from our salon for each 1 km + 1 ruble.',
		'paymanMethod': 'Payment Methods',
		'possiblePayment': 'Payment is possible for cash and bank transfer. It is possible to pay by bank card online using WebPay, as well as through the ERIP "Settlement" system.',
		'shipmentOwn': 'Payment on pickup',
		'cashOrCard': '- cash or card in the flower shop;',
		'fromErip': '- through the system "Settlement" ERIP;',
		'fromWebpay': '- by bank card online using WebPay.',
		'paymentOnDelivery': 'Payment on delivery',
		'cashBeforeDelivery': '- cash or card in the flower shop before delivery;',
		'eripBeforeDelivery': '- through the system "Settlement" ERIP before delivery;',
		'webpayBeforeDelivery': '- by bank card online using WebPay before delivery;',
		'cashToCourier': '- in cash to the courier upon receipt.',
		'documentExample': 'A sample document confirming the payment for the goods.',
		'togeverWithOrdered': 'Together with the ordered goods, you will receive a set of documents: a cash receipt and a sales receipt (when paying in cash).',
		'cashExample': 'Sample document confirming the payment of goods in cash.',
		'terminalExample': 'Sample document confirming payment for goods through the terminal.',
		'electronPayExample': 'Sample document confirming electronic payment for goods.',
		'payExampleOnline': 'Online payment methods',
		'payWebpay': 'WebPay payment',
		'paymentAccepted': 'BELKART, VISA, MasterCard, Visa Electron and Maestro cards with CVC code are accepted for payment. Payment for the order occurs instantly after entering the card number, its validity date and the three-digit CVC code on the page of the WEBPAY payment system, where you will be redirected upon successful completion of the order.',
		'afterPayment': 'After making a payment using a bank card, it is necessary to save the received card checks (payment confirmations received in the online store) for reconciliation with an extract from the card account (in order to confirm the transactions performed in case of disputes)',
		'atPaymentBankCard': 'When paying with a bank payment card, the refund, in case of an erroneous operation, is carried out to the same card with which the payment was made. A full refund is possible only in case of an erroneous transaction.',
		'dataTransmission': 'Data is transmitted via a separate channel using modern encryption methods. This excludes any possibility of interception of confidential information. Data is transmitted in encrypted form and stored only on a specialized server of the WEBPAY™ system.',
		'paymentFromErip': 'ERIP payment',
		'paymentfromBank': 'You can pay at any bank using:',
		'internetBanking': 'internet banking;',
		'mobileBanking': 'mobile banking;',
		'serviceTerminal': 'information kiosk;',
		'bankomat': 'ATM;',
		'cashDesk': 'itIsPosible;',
		'itIsPosible': 'Payment can be made using:',
		'inCash': 'cash;',
		'anyElectronicMonny': 'any electronic money;',
		'bankPaymantCard': 'bank payment cards.',
		'toMakePaymentYouNeed': 'TO MAKE A PAYMENT YOU NEED:',
		'choose': 'Choose:',
		'selectItem': 'Select Item System "Settlement" (ERIP);',
		'onlineStores': 'Internet shops/services;',
		'latinDomains': 'A-Z Latin domains;',
		'numberOfOrder': 'To pay for the “Service”, enter the Order Number;',
		'toEnterAmountOfPayment': 'Enter the payment amount (if not specified);',
		'CheckCorrectnessOfInformation': 'Check the correctness of the information;',
		'makeAPayment': 'Make a payment.',
		'ifYouMakingPayment': "If you are making a payment at the bank's cash desk, please inform the cashier about the need to make a payment through the 'Settlement' system (ERIP)",
		'constructARout': "construct a route",
		'writeToUs': "Write to us!",
		'streat': "Kosowski St. path 100, Slonim",
		'send': "Send",
		'ip': "IP Martynenko Svetlana Valeryevna UNP: 590093381 Certificate of April 12, 2006.",
		'ipAdress': "Slonim, Kosowski St. path, 108, quarter 45 Operating mode: from 9:00 till 20:00",
		'num1': "Number 1",
		'num2': "Number 2",
		'num3': "Number 3",
		'num4': "Number 4",
		'num5': "Number 5",
		'num6': "Number 6",
		'num7': "Number 7",
		'num8': "Number 8",
		'num9': "Number 9",
		'num10': "Number 10",
		'num11': "Number 11",
		'num12': "Number 12",
		'num13': "Number 13",
		'num14': "Number 14",
		'num15': "Number 15",
		'num16': "Number 16",


	},
	'ru': {
		'main': 'Главная',
		'goods': 'Каталог',
		'delivery': 'Доставка и оплата',
		'contact': 'Контакты',
		'catBut': 'В каталог',
		'bouqets': 'Букеты',
		'bouqetsQ': 'Цветы - это мгновение природы, запечатленное во времени',
		'fruitComp': 'Фруктовые композиции',
		'fruitCompQ': 'Фрукты - это магия природы, которую мы превращаем в искусство',
		'regHol': 'Оформление праздников',
		'regHolQ': 'Каждый праздник уникален, и мы создаем оформление, которое отражает его индивидуальность',
		'airBall': 'Воздушные шары и фигуры',
		'airBallQ': 'Мы создаем настоящую воздушную сказку, которая позволит вам погрузиться в мир фантазии и волшебства',
		'plants': 'Комнатные растения',
		'plantsQ': 'Привнесите природу в свой дом с нашей коллекцией красивых и здоровых комнатных растений',
		'wedFlor': 'Свадебные букеты',
		'wedFlorQ': 'Цветы для невесты – это гимн женственности и чувственности',
		'gift': 'Сувениры и подарки',
		'giftQ': 'Наша команда экспертов всегда готова помочь вам выбрать подарок, который подойдет именно для вас и для того, кого вы хотите порадовать',
		'MensBouqets': 'Мужские букеты',
		'MensBouqetsQ': 'Подарите своему мужчине нечто особенное с помощью наших мужских букетов, которые отражают его индивидуальность и стиль.',
		'flowerComp': 'Цветочные композиции',
		'flowerCompQ': 'Трепетное отношение к цветам и мастерство флористов – залог того, что подарок доставит радость и удовольствие Вам и тому, кому он предназначен.',
		'catalog': 'Каталог',
		'ourTeam': 'Наша команда',
		'ourTeamQ': 'Мы - команда профессиональных флористов, существующая уже более 5 лет и работающая с любовью и страстью к своему делу. Мы гордимся тем, что смогли стать надежными партнерами и частью жизни наших клиентов в течение всех этих лет. Наша цель - превзойти ожидания и воплотить ваши идеи в уникальных цветочных творениях. Мы рады находиться в городе Слоним и делиться красотой и уютом нашего салона с жителями этого прекрасного места. Благодарим вас за выбор нашего цветочного салона, и мы всегда готовы создать для вас незабываемые цветочные композиции, которые подарят вам радость и впечатления на долгие годы.',
		'ourTeamLead': 'Мартыненко Светлана',
		'ourWork': 'Наши работы',
		'ourWorkQ': 'Собрать букет – не сложно. А сделать оригинальный подарок, который тронет получателя до глубины души – можем только мы!',
		'costDelivery': 'Стоимость доставки',
		'booking': 'Приём заказов осуществляется с 9:00 до 22:00.',
		'deliveryOrders': 'Доставка заказов осуществляется круглосуточно.',
		'deliveryZone': 'Зона доставки',
		'green': 'Зелёная зона',
		'greenCondition': 'При заказе от 60 рублей доставка бесплатная. Если сумма заказа ниже 60 рублей, - стоимость доставки составит 5 рублей.',
		'violet': 'Фиолетовая зона',
		'violetCondition': 'При заказе от 80 рублей доставка бесплатная. Если сумма заказа в пределах от 60 до 80 рублей, - стоимость доставки составит 2 рубля. Если сумма заказа ниже 60 рублей, - стоимость доставки составит 7 рублей.',
		'deliveryOut': 'Стоимость доставки за пределы фиолетовой зоны оговаривается по факту.',
		'deliveryPossible': 'Доставка возможна в любой регион Беларуси.',


		'regionFreeDelivery': 'Регионы бесплатной доставки (при заказе от 55 руб.).',
		'bolVil': 'Большешиловичский сельсовет:',
		'bolShil': 'д. Большие Шиловичи',
		'shapaevo': 'д. Чепелёво',
		'shilovichi': 'д. Шиловичи(спиртзавод)',
		'vasilSelsovet': 'Василевичский сельсовет:',
		'vorobevichi': 'д. Воробьевичи:',
		'razanovschina': 'д. Резановщина',
		'villageSel': 'Деревянчицкий сельсовет:',
		'brakovo': 'д. Браково',
		'derevian': 'д. Деревянчицы',
		'skoldichi': 'д. Сколдичи',
		'tyshevichi': 'д. Тушевичи',
		'jirovichskiySel': 'Жировичский сельсовет:',
		'jirovichi': 'д. Жировичи',
		'ozginovskiySel': 'Озгиновичский сельсовет:',
		'chemery': 'д. Чемеры',
		'pavlovskiySel': 'Павловский сельсовет:',
		'petralevichiOne': 'д. Петралевичи I',
		'petralevichiTwo': 'д. Петралевичи II',
		'talkovschina': 'д. Тальковщина',
		'cost': 'Стоимость',
		'costOfDelivery': 'Стоимость доставки по городу и в пределах 10 кмот нашего салона при заказе от 55,00 рублей -бесплатная.',
		'ifSumm': 'Если сумма заказа ниже 55,00 рублей, стоимость доставки составит 5,00 рублей.',
		'calculationOfSumm': 'Расчёт стоимости доставки за пределы 10 км отнашего салона за каждый 1 км + 1 рубль.',
		'paymanMethod': 'Способы оплаты',
		'possiblePayment': 'Оплата возможна за наличный и безналичный расчет. Существует возможность оплаты банковской картой онлайн с помощью WebPay, а так же через систему «Расчет» ЕРИП.',
		'shipmentOwn': 'Оплата при самовывозе',
		'cashOrCard': '- наличными или картой в салоне цветов;',
		'fromErip': '- через систему «Расчет» ЕРИП;',
		'fromWebpay': '- банковской картой онлайн с помощью WebPay.',
		'paymentOnDelivery': 'Оплата при доставке',
		'cashBeforeDelivery': '- наличными или картой в салоне цветов перед доставкой;',
		'eripBeforeDelivery': '- через систему «Расчет» ЕРИП перед доставкой;',
		'webpayBeforeDelivery': '- банковской картой онлайн с помощью WebPay перед доставкой;',
		'cashToCourier': '- наличными курьеру при получении.',
		'documentExample': 'Образец документа, подтверждающий оплату товара.',
		'togeverWithOrdered': 'Вместе c заказанным товаром Вы получите комплект документов: кассовый и товарный чеки (при оплате наличными деньгами).',
		'cashExample': 'Образец документа, подтверждающий оплату товара наличными.',
		'terminalExample': 'Образец документа, подтверждающий оплату товара через терминал.',
		'electronPayExample': 'Образец документа, подтверждающий электронную оплату товара.',
		'payExampleOnline': 'Способы оплаты Online',
		'payWebpay': 'Оплата WebPay',
		'paymentAccepted': 'К оплате принимаются карты БЕЛКАРТ, VISA, MasterCard, Visa Electron и Maestro с CVC-кодом. Оплата заказа происходит мгновенно после ввода номера карты, даты ее действия и трехзначного CVC кода на странице платежной системы WEBPAY, куда вы будете перенаправлены при успешном оформлении заказа.',
		'afterPayment': 'После совершения оплаты с использованием банковской карточки необходимо сохранять полученные карт-чеки (подтверждения об оплате, полученные в Интернет-магазине) для сверки с выпиской из карт-счёта (с целью подтверждения совершённых операций в случае возникновения спорных ситуаций)',
		'atPaymentBankCard': 'После совершения оплаты с использованием банковской карточки необходимо сохранять полученные карт-чеки (подтверждения об оплате, полученные в Интернет-магазине) для сверки с выпиской из карт-счёта (с целью подтверждения совершённых операций в случае возникновения спорных ситуаций)',
		'dataTransmission': 'Передача данных осуществляется по отдельному каналу с применением современных методов шифрования. При этом исключается любая возможность перехвата конфиденциальной информации. Данные передаются в зашифрованном виде и сохраняются только на специализированном сервере системы WEBPAY™.',
		'paymentFromErip': 'Оплата ЕРИП',
		'paymentfromBank': 'Оплату Вы можете произвести в любом банке с помощью:',
		'internetBanking': 'интернет-банкинга;',
		'mobileBanking': 'мобильного банкинга;',
		'serviceTerminal': 'инфокиоска;',
		'bankomat': 'инфокиоска;',
		'cashDesk': 'кассы и т.д.',
		'itIsPosible': 'Совершить оплату можно с использованием:',
		'inCash': 'наличных денежных средств;',
		'anyElectronicMonny': 'любых электронных денег;',
		'bankPaymantCard': 'банковских платежных карточек.',
		'toMakePaymentYouNeed': 'ДЛЯ ПРОВЕДЕНИЯ ПЛАТЕЖА НЕОБХОДИМО:',
		'choose': 'Выбрать:',
		'selectItem': 'Пункт Система "Расчет" (ЕРИП);',
		'onlineStores': 'Интернет-магазины/сервисы;',
		'latinDomains': 'A-Z Латинские домены;',
		'numberOfOrder': 'Для оплаты «Услуги» ввести Номер заказа;',
		'toEnterAmountOfPayment': 'Ввести сумму платежа (если не указана);',
		'CheckCorrectnessOfInformation': 'Проверить корректность информации;',
		'makeAPayment': 'Совершить платеж.',
		'ifYouMakingPayment': "Если Вы осуществляете платеж в кассе банка, пожалуйста, сообщите кассиру о необходимости проведения платежа через систему 'Расчет' (ЕРИП).",
		'constructARout': "построить маршрут",
		'writeToUs': "Напишите нам!",
		'streat': "ул. Коссовский тракт 100, Слоним",
		'send': "Отправить",
		'ip': "ИП Мартыненко Светлана Валерьевна УНП: 590093381 Свидетельство от 12 апреля 2006 г.",
		'ipAdress': "г. Слоним, ул. Коссовский тракт, 108, кв.45 Режим работы: с 9:00 до 20:00",
		'num1': "Номер 1",
		'num2': "Номер 2",
		'num3': "Номер 3",
		'num4': "Номер 4",
		'num5': "Номер 5",
		'num6': "Номер 6",
		'num7': "Номер 7",
		'num8': "Номер 8",
		'num9': "Номер 9",
		'num10': "Номер 10",
		'num11': "Номер 11",
		'num12': "Номер 12",
		'num13': "Номер 13",
		'num14': "Номер 14",
		'num15': "Номер 15",
		'num16': "Номер 16",
	}
}

const language = document.querySelectorAll('.lang');
const translate = document.querySelectorAll('.translate');
const langActive = document.querySelectorAll('.header-item-lang');
const menuLang = document.querySelector('.menu__lang');
menuLang.addEventListener('click', function (e) {
	e.preventDefault();
})


for (let ev of translate) {
	ev.addEventListener("click", function (e) {

		let lang = e.target.id;
		console.log(lang);
		
		let activeLang = e.target.closest('.header-item-lang');
		changeActiveLanguage(lang);
		saveLocalLang(lang);
		for (let act of langActive) {
			act.classList.remove('active')
		}
		activeLang.classList.add('active')
		for (let lan of language) {
			let text = arrLang[lang][lan.getAttribute('key')]
			lan.textContent = `${text}`;

		}
		location.reload();
	});
}

function saveLocalLang(language) {
	let langs;
	if (localStorage.getItem('langs') === null) {
		langs = [];
	} else {
		langs = JSON.parse(localStorage.getItem('langs'))
	}
	langs.push(language);
	localStorage.setItem('langs', JSON.stringify(langs));
}

function getLocalLang() {
	let langs
	if (localStorage.getItem('langs') === null) {
		langs = [];
	} else {
		langs = JSON.parse(localStorage.getItem('langs'));
	}
	let lang = langs[langs.length - 1];
	
	if (lang) {
		for (let lan of language) {

			let text = arrLang[lang][lan.getAttribute('key')];
			lan.textContent = `${text}`;
		}
		let active = document.querySelector(`#${lang}`)


		let activeLang = active.closest('.header-item-lang');
		for (let act of langActive) {
			act.classList.remove('active')
		}
		activeLang.classList.add('active')
		changeActiveLanguage(lang);
	}

}

function changeActiveLanguage(lang) {
	let currentLanguageRef;
	let currentLang;
	const nameIn = document.querySelector('.input-name');
	const messageIn = document.querySelector('.input-message');
	const errorLangName = document.querySelector('.input-name');
	const errorLangTel = document.querySelector('.input-tel');


	if (lang == "ru") {
		currentLanguageRef = "img/odonata/ic/2.png";
		currentLang = "Ru";
		nameIn.placeholder = "Имя"
		messageIn.placeholder = "Сообщение"
	}
	if (lang == "en") {
		currentLanguageRef = "img/odonata/ic/40.png";
		currentLang = "En"
		nameIn.placeholder = "Name"
		messageIn.placeholder = "Message"
		errorLangName.dataset.error = "It is necessary to fill the field"
		errorLangTel.dataset.error = "It is necessary to fill the field"
	}


	const flag = document.querySelector('.active-lang');
	const currentLanguage = document.querySelector('.current-language');

	flag.src = currentLanguageRef;
	currentLanguage.innerText = currentLang;


}





















const menuValute = document.querySelector('.menu__valute');
menuValute.addEventListener('click', function (e) {
	e.preventDefault();
})
const changeValuteOff = document.querySelector('.change-valute');
// valute change
// цены 
const valuteVal = document.querySelectorAll('.val');
// выбранная валюта
const translateVal = document.querySelectorAll('.change-val');
// ключ валюты
const valActive = document.querySelectorAll('.header-item-val');
//перебор всех цен
for (let val of translateVal) {
	val.addEventListener("click", function (e) {
		e.preventDefault(); // temporary
		// получение текущего ключа
		let valute = e.target.id;
		let activeValute = e.target.closest('.header-item-val');
		//изменение текущего статуса валюты на сайте
		changeActiveValute(valute);
		// кэширование текущего значения валюты в браузере
		saveLocalValute(valute);
		// изменение активного пункта валюты
		for (let val of valActive) {
			val.classList.remove('active')
		}
		activeValute.classList.add('active')

		// изменение цен
		changePrice(valute);
		// location.reload();
		changeValuteOff.classList.remove('_active')
		// const documentHtml = document.querySelector('.watcher');
		// documentHtml.classList.remove('menu-open')
	});
}



//изменение текущего статуса валюты на сайте
function changeActiveValute(valute) {
	// переменная ссылки на активный язык
	// let currentValuteRef;
	// текущая валюта
	let currentValute;
	// условие изменения валют
	if (valute == "rub") {
		// currentValuteRef = "img/odonata/ic/2.png"
		currentValute = "₽ - RUB";
	}
	if (valute == "dol") {
		currentValute = "$ - USD"
		// currentValuteRef = "img/odonata/ic/4.png";
		// console.log(currentValuteRef);
	}
	if (valute == "bRubl") {
		currentValute = "Br - BYN"
		// currentValuteRef = "img/odonata/ic/4.png";
		// console.log(currentValuteRef);
	}
	if (valute == "eur") {
		currentValute = "€ - EUR"
		// currentValuteRef = "img/odonata/ic/4.png";
		// console.log(currentValuteRef);
	}

	// активная валюта флажок
	// const flag = document.querySelector('.active-val');
	// console.log(currentValuteRef);
	// flag.src = currentValuteRef;
	// активная валюта
	const currentVal = document.querySelector('.current-valute');
	currentVal.innerText = currentValute;


}

// функция кэширования выбранной валюты
function saveLocalValute(valute) {
	let valutes;
	// проверка на наличие в кеше
	if (localStorage.getItem('valutes') === null) {
		// если кэш пуст создание масива
		valutes = [];
	} else {
		// если кэш создан, присвоение выбранного значения
		valutes = JSON.parse(localStorage.getItem('valutes'))
	}
	// добавление масиива в кэш
	valutes.push(valute);
	localStorage.setItem('valutes', JSON.stringify(valutes));
}

function getLocalVal() {
	let valutes
	if (localStorage.getItem('valutes') === null) {
		valutes = [];
	} else {
		valutes = JSON.parse(localStorage.getItem('valutes'));
	}
	let currentValutes = valutes[valutes.length - 1];
	if (currentValutes) {
		changePrice(currentValutes);
		changeActiveValute(currentValutes);
	}

}
document.addEventListener('DOMContentLoaded', getLocalVal)


function changePrice(valute) {
	let currentlanguageGlobal = document.querySelector('.current-language').textContent;
	data(valute, currentlanguageGlobal);
}




async function data(valute, currentlanguageGlobal) {
	try {
		await fetch('https://api.nbrb.by/exrates/rates?periodicity=0')
			.then(response => response.json())
			.then(json => rates(json))
			.then(function () {
				for (let item of valuteVal) {
					let itemKey = parseInt(item.getAttribute('key'));
					let text = (itemKey / convertRate[valute]).toFixed(1);
					if(currentlanguageGlobal == 'En'){
						switch (valute) {
						case "bRubl":
							item.textContent = `from ${itemKey}.00 Br`;
							break;
						case "dol":
							item.textContent = `from ${text}0 $`;
							break;
						case "eur":
							item.textContent = `from ${text}0 €`;
							break;
						case "rub":
							item.textContent = `from ${Math.round(text * 100)}.00 ₽`;
							break;
						default:
							break;
						}
					} else {
						switch (valute) {
							case "bRubl":
								item.textContent = `от ${itemKey}.00 Br`;
								break;
							case "dol":
								item.textContent = `от ${text}0 $`;
								break;
							case "eur":
								item.textContent = `от ${text}0 €`;
								break;
							case "rub":
								item.textContent = `от ${Math.round(text * 100)}.00 ₽`;
								break;
							default:
								break;
						}
					}
					
				}
			}

			)
	} catch (err) {
		console.log("Текущий курс валют недоступен"); // TypeError: failed to fetch
		convertRate.dol = 2.9352;
		convertRate.eur = 3.1492;
		convertRate.rub = 3.6294;
		for (let item of valuteVal) {
			let itemKey = parseInt(item.getAttribute('key'));
			let text = (itemKey / convertRate[valute]).toFixed(1);
			if(currentlanguageGlobal == 'En'){
				switch (valute) {
				case "bRubl":
					item.textContent = `from ${itemKey}.00 Br`;
					break;
				case "dol":
					item.textContent = `from ${text}0 $`;
					break;
				case "eur":
					item.textContent = `from ${text}0 €`;
					break;
				case "rub":
					item.textContent = `from ${Math.round(text * 100)}.00 ₽`;
					break;
				default:
					break;
				}
			} else {
				switch (valute) {
					case "bRubl":
						item.textContent = `от ${itemKey}.00 Br`;
						break;
					case "dol":
						item.textContent = `от ${text}0 $`;
						break;
					case "eur":
						item.textContent = `от ${text}0 €`;
						break;
					case "rub":
						item.textContent = `от ${Math.round(text * 100)}.00 ₽`;
						break;
					default:
						break;
				}
			}
		}
	}
}



function rates(data) {
	const usd = data.findIndex(function (cur) {
		return cur.Cur_Abbreviation == "USD"
	})
	const eur = data.findIndex(function (cur) {
		return cur.Cur_Abbreviation == "EUR"
	})
	const rub = data.findIndex(function (cur) {
		return cur.Cur_Abbreviation == "RUB"
	})
	convertRate.dol = data[usd].Cur_OfficialRate
	convertRate.eur = data[eur].Cur_OfficialRate
	convertRate.rub = data[rub].Cur_OfficialRate
}

const convertRate = {

}





// ///////////////PHONE
const headerPhone = document.querySelector('.header__p');
const phoneMenu = document.querySelector('.phone-body');
headerPhone.addEventListener("click", function (e) {
	e.preventDefault()
	const documentHtml = document.querySelector('.watcher');
	documentHtml.classList.remove('menu-open')
	phoneMenu.classList.toggle('_active')
	const phoneIcon = document.querySelector('.phone-icon');
	if(phoneMenu.classList.contains('_active')) {
		phoneIcon.src = "img/odonata/ic/80.png"
	}
	if(!phoneMenu.classList.contains('_active')){
		phoneIcon.src = "img/odonata/ic/50.png"
	}
});