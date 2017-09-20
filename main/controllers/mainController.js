(function() {
  'use strict';

  angular
    .module('app')
    .controller('mainController', function(leafletData, $window) {
      var vm = this;
      var map = null;
      var lastLayer = null;

      vm.selectedAge = null;

      leafletData.getMap('spb').then(function(newMap) {
        map = newMap;
      });

      angular.extend(vm, {
        center: {
          lat: 59.93,
          lng: 30.33,
          zoom: 10
        },
        tiles: {
          url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          options: {
            attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        },
        defaults: {
          scrollWheelZoom: false
        }
      });

      vm.ages = [{
        name: 'Санкт-Петербург в эпоху Петра Великого (1703-1725 гг.)',
        buildings: [{
            name: 'Зимний дворец',
            desc: 'Зи́мний дворе́ц Петра́ I — личная резиденция императора Петра I, возведённая на набережной Невы у Зимней канавки, архитектурно-мемориальный памятник архитектуры начала XVIII века, частично сохранившийся и находящийся в здании Эрмитажного театра, включён в музейный комплекс Государственного Эрмитажа.',
            image: 'http://www.saint-petersburg.com/images/history/st-petersburg-in-the-era-of-peter-the-great/winter-palace-of-peter-the-great.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_%D0%9F%D0%B5%D1%82%D1%80%D0%B0_I',
            pos: {
              lat: 59.9403958,
              lng: 30.3137962
            }
          }, {
            name: 'Летний сад',
            desc: 'Ле́тний сад\\xa0— парковый ансамбль, памятник садово-паркового искусства первой трети XVIII века[1] в Центральном районе Санкт-Петербурга. Сад был заложен по повелению Петра I в 1704 году и первоначально был регулярным.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/%D0%92%D1%85%D0%BE%D0%B4_%D0%B2_%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4.jpg/320px-%D0%92%D1%85%D0%BE%D0%B4_%D0%B2_%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4',
            pos: {
              lat: '59.94472',
              lng: '30.33556'
            }
          },
          {
            name: 'Домик Петра I',
            desc: 'Домик Петра I\xa0— первая постройка в Санкт-Петербурге, летнее жилище царя Петра I в период с 1703 по 1708 годы. Этот небольшой деревянный домик площадью 60 м² был построен солдатами-плотниками недалеко от Троицкой площади всего за три дня\xa0— 13\xa0(24)\xa0мая по 15\xa0(26)\xa0мая\xa01703[1]. Здесь же 16\xa0(27)\xa0мая прошло празднование по случаю присоединения земель и основания нового города.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Domick_Petra_I-2.jpg/250px-Domick_Petra_I-2.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B8%D0%BA_%D0%9F%D0%B5%D1%82%D1%80%D0%B0_I_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
            pos: {
              lat: 59.95333,
              lng: 30.33083
            }
          },
          {
            name: 'Главное адмиралтейство',
            desc: 'Зда́ние Гла́вного Адмиралте́йства\xa0— комплекс адмиралтейских построек в Санкт-Петербурге на 2-м Адмиралтейском острове, расположенный на берегу реки Нева, значительный памятник архитектуры русского ампира. Изначально построенный в качестве верфи, подвергался перестройке в XVIII—XIX веках.',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B0%D0%B4%D0%BC%D0%B8%D1%80%D0%B0%D0%BB%D1%82%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%BE',
            pos: {
              lat: 59.9374583,
              lng: 30.30855
            }
          },
          {
            name: 'Кикины палаты',
            desc: 'Ки́кины пала́ты\xa0— памятник архитектуры петровского барокко, находящийся в Санкт-Петербурге по адресу Ставропольская улица, дом 9.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kikin_palace_SPB.jpg/300px-Kikin_palace_SPB.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B8%D0%BA%D0%B8%D0%BD%D1%8B_%D0%BF%D0%B0%D0%BB%D0%B0%D1%82%D1%8B',
            pos: {
              lat: 59.9496889,
              lng: 30.3867
            }
          },
          {
            name: 'Здание Двенадцати коллегий',
            desc: 'Здание Двенадцати коллегий\xa0— здание на Университетской набережной Васильевского острова в Санкт-Петербурге, выстроенное в 1722—1742 гг. для размещения петровских коллегий. Крупнейший по размерам памятник петровского барокко состоит из двенадцати идентичных трёхэтажных секций.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Twelvecollegia.jpg/267px-Twelvecollegia.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5_%D0%94%D0%B2%D0%B5%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D0%B8_%D0%BA%D0%BE%D0%BB%D0%BB%D0%B5%D0%B3%D0%B8%D0%B9',
            pos: {
              lat: 59.94167,
              lng: 30.29861
            }
          },
          {
            name: 'Меншиковский дворец (Санкт-Петербург)',
            desc: 'Меншиковский дворец (филиал Эрмитажа\xa0— дворец Меншикова[1], в реестре культурных памятников\xa0— дворец Меншикова А. Д.[2])\xa0— построенный для приближенного императора Петра Первого, первого губернатора Санкт-Петербурга Александра Даниловича Меншикова, дворец выполнен в стиле петровского барокко, первое каменное здание Санкт-Петербурга[3][4]. Авторы проекта\xa0— приглашённые зодчие Д.\xa0М.\xa0Фонтана и Г.\xa0И.\xa0Шедель[4].',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BD%D1%88%D0%B8%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
            pos: {
              lat: 59.93889,
              lng: 30.29583
            }
          },
          {
            name: 'Летний дворец Петра I',
            desc: 'Ле́тний дворе́ц Петра́ I\xa0— название сохранившейся до наших дней в первозданном виде резиденции Петра I в Летнем саду Санкт-Петербурга. Используется как музей (филиал Русского музея). В настоящее время закрыт на реставрацию и для посещения не доступен. Обновлённый дворец откроется в 2017 году.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4_%D1%81_%D0%9F%D1%80%D0%B0%D1%87%D0%B5%D1%87%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BC%D0%BE%D1%81%D1%82%D0%B0.jpg/267px-%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4_%D1%81_%D0%9F%D1%80%D0%B0%D1%87%D0%B5%D1%87%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BC%D0%BE%D1%81%D1%82%D0%B0.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D1%82%D0%BD%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_%D0%9F%D0%B5%D1%82%D1%80%D0%B0_I',
            pos: {
              lat: 59.947333330028,
              lng: 30.336166670028
            }
          }

        ]
      }, {
        name: 'Санкт-Петербург в эпоху Екатерины I (1725-1727 гг.)',
        buildings: [{
          name: 'Кунстка́мера',
          desc: 'Кунстка́мера — кабинет редкостей, в настоящее время — Музей антропологии и этнографии имени Петра Великого Российской академии наук (МАЭ РАН) — первый музей России, учреждённый императором Петром Первым и находящийся в Санкт-Петербурге.',
          image: 'http://www.saint-petersburg.com/images/history/st-petersburg-in-the-era-of-catherine-i/the-kunstkammer-the-first-building-of-the-academy-of-sciences.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BD%D1%81%D1%82%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0',
          pos: {
            lat: 59.9414967,
            lng: 30.3045327
          }
        }, {
          name: 'Екатеринго́ф',
          desc: 'Екатеринго́ф (нем. Ekaterinhof, то есть «двор Екатерины») — исторический пейзажный парк на юго-западе Санкт-Петербурга, ведущий свою историю с петровского времени, когда в устье речки Екатерингофки был выстроен Подзорный дворец. В советское время переименован в парк имени 1-го Мая, затем в парк имени 30-летия ВЛКСМ.',
          image: 'http://www.saint-petersburg.com/images/history/st-petersburg-in-the-era-of-catherine-i/island-and-rotunda-in-catherinehof-park.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_%D0%9F%D0%B5%D1%82%D1%80%D0%B0_I',
          pos: {
            lat: 59.9019701,
            lng: 30.2600831
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Петра II (1727-1730 гг.)',
        buildings: [{
          name: 'Дворец Меньшикова',
          desc: 'Меншиковский дворец — построенный для приближенного императора Петра Первого, первого губернатора Санкт-Петербурга Александра Даниловича Меншикова, дворец выполнен в стиле петровского барокко, первое каменное здание Санкт-Петербурга.',
          image: 'http://s-pb.in/images/stories/museums/menshikov.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BD%D1%88%D0%B8%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
          pos: {
            lat: 59.9395254,
            lng: 30.295545
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Анны Иоановны (1730-1740 гг.)',
        buildings: [{
          name: 'Церковь Симеона и Анны',
          desc: 'Цéрковь Симео́на и А́нны (официальное название — церковь святых и праведных Симеона Богоприимца и Анны Пророчицы) — действующая православная церковь в Санкт-Петербурге, находящаяся на углу улицы Белинского и Моховой улицы, памятник архитектуры, один из старейших храмов Санкт-Петербурга. Церковь являлась капитульным храмом ордена Святой Анны.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Spb_06-2012_Simeon_and_Anna_Church_02.jpg',
          url: 'https://ru.wikipedia.org/wiki/Церковь_Симеона_и_Анны',
          pos: {
            lat: 59.938569,
            lng: 30.345781
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Ивана VI и Анны Леопольдовны (1740-1741 гг.)',
        buildings: [{
          name: 'Летний дворец Петра I',
          desc: 'Ле́тний дворе́ц Петра́ I — название сохранившейся до наших дней в первозданном виде резиденции Петра I в Летнем саду Санкт-Петербурга. Используется как музей (филиал Русского музея). В настоящее время закрыт на реставрацию и для посещения не доступен. Обновлённый дворец откроется в 2017 году.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Вид_на_Летний_сад_с_Прачечного_моста.jpg',
          url: 'https://ru.wikipedia.org/wiki/Летний_дворец_Петра_I',
          pos: {
            lat: 59.9472116,
            lng: 30.3338712
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Елизаветы I Петровны (1741-1762 гг.)',
        buildings: [{
          name: 'Зимний дворец',
          desc: 'Зимний дворец в Санкт-Петербурге — в прошлом главный императорский дворец России, расположенный по адресу: Дворцовая площадь, 2 / Дворцовая набережная, 38. Нынешнее здание дворца (пятое) построено в 1754—1762 годах итальянским архитектором Б. Ф. Растрелли в стиле пышного елизаветинского барокко с элементами французского рококо в интерьерах. Начиная с советского времени в стенах дворца размещена основная экспозиция Государственного Эрмитажа.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Winter_Palace_Panorama_3.jpg',
          url: 'https://ru.wikipedia.org/wiki/Зимний_дворец',
          pos: {
            lat: 59.9403958,
            lng: 30.3116075
          }
        }, {
          name: 'Летний дворец Елизаветы Петровны',
          desc: 'Летний дворец Елизаветы Петровны — несохранившаяся императорская резиденция в Санкт-Петербурге, построенная Б. Ф. Растрелли в 1741—1744 годах на месте, где теперь расположен Михайловский (Инженерный) замок. Снесён в 1797 году',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Summer_Palace_St_Petersburg.jpeg',
          url: 'https://ru.wikipedia.org/wiki/Летний_дворец_Елизаветы_Петровны',
          pos: {
            lat: 59.9399937,
            lng: 30.3358576
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Петра III (1762 гг.)',
        buildings: [{
          name: 'Дворец Петра III',
          desc: 'Дворец Петра III — дворец, расположенный в юго-восточной части дворцово-паркового ансамбля «Ораниенбаум». Был построен в 1758—1762 гг. по проекту архитектора Антонио Ринальди для наследника русского престола Великого князя Петра Федоровича, будущего императора Петра III, и являлся главной постройкой в потешной крепости Петерштадт. Дворец сохранился до наших дней, и в настоящее время в нём располагается музей «Дворец Петра III».',
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Peter_III_Palace_in_Oranienbaum.jpg',
          url: 'https://ru.wikipedia.org/wiki/Дворец_Петра_III',
          pos: {
            lat: 59.9104859,
            lng: 29.7555621
          }
        }, {
          name: 'Петершта́дт',
          desc: 'Петершта́дт (нем. «город Петра») — потешная военная крепость, построенная в 1759—1762 годах в Ораниенбауме для великого князя Петра Федоровича, в будущем императора Петра III. В цельном виде до наших дней не сохранилась, остались только дворец Петра III, Въездные (Почётные) ворота) и часть земляных насыпей, сегодня больше похожие на склоны оврагов. Занимала площадь в 2 гектара и служила своеобразным учебным пособием в натуральную величину для обучения наследника престола военному делу. Одновременно с созданием Петерштадта в 1758—1762 годах велось строительство дворца для Петра III по проекту архитектора Антонио Ринальди.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Макет_крепости_Петерштадт.jpg',
          url: 'https://ru.wikipedia.org/wiki/Петерштадт',
          pos: {
            lat: 59.9112366,
            lng: 29.7441375
          }
        }, {
          name: 'Большой дворец (Ораниенбаум)',
          desc: 'Большой (Меншиковский) дворец[1][2] — первый и наиболее крупный архитектурный памятник дворцово-паркового ансамбля Ораниенбаум в городе Ломоносов. Выстроен по заказу князя А. Д. Меншикова в 1711—1727 гг. Вместе с Нижним садом, Картинным домом, морским каналом и Нижними домами образует крупнейший ансамбль петровского барокко, сохранивший до настоящего времени композиционное единство, законченность и стилистическую целостность[3].',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Menshikov_palace_Oranienbaum.JPG',
          url: 'https://ru.wikipedia.org/wiki/Большой_дворец_(Ораниенбаум)',
          pos: {
            lat: 59.9150219,
            lng: 29.7519206
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Екатерины II (1762-1796 гг.)',
        buildings: [{
          name: 'Ани́чков дворе́ц',
          desc: 'Ани́чков дворе́ц[1]— один из императорских дворцов Санкт-Петербурга, у Ани́чкова моста на набережной реки Фонта́нки (Невский проспект, 39). Своё название дворец получил от Ани́чкова моста (см. Ани́чковы). Старейшее из сохранившихся зданий на Невском проспекте.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Spb_06-2012_Nevsky_various_04.jpg',
          url: 'https://ru.wikipedia.org/wiki/Аничков_дворец',
          pos: {
            lat: 59.9329554,
            lng: 30.3378873
          }
        }, {
          name: 'Невские ворота Петропавловской крепости',
          desc: 'Не́вские воро́та — ворота Петропавловской крепости в Санкт-Петербурге, находящиеся в Невской куртине между Государевым и Нарышкиным бастионами. Соединяют крепость с Комендантской пристанью. Памятник архитектуры классицизма.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Невская_куртина_и_Невские_ворота.JPG',
          url: 'https://ru.wikipedia.org/wiki/Невские_ворота_Петропавловской_крепости',
          pos: {
            lat: 59.9493298,
            lng: 30.3171489
          }
        }, {
          name: 'Дворцовая набережная',
          desc: 'Дворцо́вая набережная Невы в центре Санкт-Петербурга находится по левому берегу от Набережной Кутузова до Адмиралтейской набережной. На набережной расположены здания Государственного Эрмитажа, Русского музея и пр.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Admiralty_1_Island.jpg',
          url: 'https://ru.wikipedia.org/wiki/Дворцовая_набережная',
          pos: {
            lat: 59.94395,
            lng: 30.3187588
          }
        }, {
          name: 'Царское Село (музей-заповедник)',
          desc: 'Царское Село — музей-заповедник в г. Пушкин, включающий в себя дворцово-парковый ансамбль XVIII—XIX веков, бывшую загородную царскую резиденцию, превращённую в музей после национализации в марте 1918 года. Современное название музей-заповедник получил в 1992 году.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Catherine_Palace_in_Tsarskoe_Selo%2C_grille.jpg',
          url: 'https://ru.wikipedia.org/wiki/Царское_Село_(музей-заповедник)',
          pos: {
            lat: 59.7153155,
            lng: 30.3928254
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Павла I (1796-1801 гг.)',
        buildings: [{
          name: 'Михайловский замок',
          desc: 'Миха́йловский, или Инженерный за́мок — бывший императорский дворец в центре Санкт-Петербурга по адресу Садовая ул., № 2, на рубеже XVIII—XIX веков построенный как замок на воде по заказу императора Павла I и ставший местом его смерти. Это здание — крупнейший архитектурный памятник, завершающий собою историю петербургского зодчества XVIII века[1].',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/RUS-2016-Aerial-SPB-St_Michael%27s_Castle.jpg',
          url: 'https://ru.wikipedia.org/wiki/Михайловский_замок',
          pos: {
            lat: 59.9399937,
            lng: 30.3358576
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Александра I (1801-1825 гг.)',
        buildings: [{
          name: 'Марсово поле',
          desc: 'Ма́рсово по́ле — площадь в центре Санкт-Петербурга. В начале XVIII века к западу от Летнего Сада была незастроенная территория, которую называли «Потешное поле» или «Большой», а позже «Царицын луг». На лугу проходили военные парады. В 1798—1801 годах там были установлены памятники полководцам П. А. Румянцеву (архитектор В. Ф. Бренна), и А. В. Суворову (скульптор М. И. Козловский). В 1818 году Румянцевский обелиск перенесли на Васильевский остров, но за площадью утвердилось название Марсово поле (подобно Марсову полю в древнем Риме и Париже). С 1918 по 1944 год называлось площадь Жертв революции.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/RUS-2016-Aerial-SPB-Field_of_Mars.jpg',
          url: 'https://ru.wikipedia.org/wiki/Марсово_поле_(Санкт-Петербург)',
          pos: {
            lat: 59.9440512,
            lng: 30.3296336
          }
        }, {
          name: 'Румянцевский обелиск',
          desc: 'Румянцевский обелиск (обелиск «Румянцева победам») — памятник на Румянцевской площади Васильевского острова Санкт-Петербурга.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Румянцевский_обелиск_и_сквер.jpg',
          url: 'https://ru.wikipedia.org/wiki/Румянцевский_обелиск',
          pos: {
            lat: 59.7143,
            lng: 30.3897113
          }
        }, {
          name: 'Стрелка Васильевского острова',
          desc: 'Стрелка Васильевского острова — восточная оконечность Васильевского острова в Санкт-Петербурге; один из самых завораживающих архитектурных ансамблей города; пример гармонии архитектуры города с пейзажем берегов Невы.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Neva_river_01.jpg',
          url: 'https://ru.wikipedia.org/wiki/Стрелка_Васильевского_острова',
          pos: {
            lat: 59.9442409,
            lng: 30.3049493
          }
        }, {
          name: 'Здание Главного штаба',
          desc: 'Зда́ние Гла́вного шта́ба — историческое здание, располагающееся на Дворцовой площади в Санкт-Петербурге. Строительство здания продолжалось с 1819 по 1829 год. Архитектор: К. И. Росси. Скульпторы: С. С. Пименов, В. И. Демут-Малиновский.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Дворцовая_площадь_Санкт-Петербурга._Вид_из_Эрмитажа..JPG',
          url: 'https://ru.wikipedia.org/wiki/Здание_Главного_штаба_(Санкт-Петербург)',
          pos: {
            lat: 59.939034,
            lng: 30.3164953
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Николая I (1825-1855)',
        buildings: [{
          name: 'Александровская коло́нна',
          desc: 'Алекса́ндровская коло́нна — памятник в стиле ампир, находящийся в центре Дворцовой площади Санкт-Петербурга. ',
          image: 'http://magic-ays.com/Buildings/AlexanderColumn.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BA%D0%BE%D0%BB%D0%BE%D0%BD%D0%BD%D0%B0',
          pos: {
            lat: 59.9390682,
            lng: 30.3158059
          }
        }, {
          name: 'Александровская коло́нна',
          desc: 'Зда́ние Гла́вного шта́ба — историческое здание, располагающееся на Дворцовой площади в Санкт-Петербурге',
          image: 'http://www.saint-petersburg.com/images/history/st-petersburg-in-the-era-of-nicholas-i/part-of-the-panorama-of-palace-square-general-staff-building.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5_%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE_%D1%88%D1%82%D0%B0%D0%B1%D0%B0_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
          pos: {
            lat: 59.939034,
            lng: 30.318684
          }
        }, {
          name: 'Дворцовая площадь',
          desc: 'Дворцо́вая пло́щадь — главная площадь Санкт-Петербурга, архитектурный ансамбль, возникший во второй половине XVIII — первой половине XIX века',
          image: 'http://www.saint-petersburg.com/images/history/st-petersburg-in-the-era-of-nicholas-i/part-of-the-panorama-of-palace-square-general-staff-building.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%BE%D1%80%D1%86%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C',
          pos: {
            lat: 59.938942,
            lng: 30.3149874
          }
        }, {
          name: 'Здания Сената и Синода',
          desc: 'Зда́ния Сена́та и Сино́да — памятник архитектуры — здания в стиле позднего классицизма, расположенные на Сенатской площади в Санкт-Петербурге. Возведены в 1829–1834 годах. Соединены триумфальной аркой, перекинутой над Галерной улицей.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Saint-P%C3%A9tersbourg_-_Senat.jpg/1920px-Saint-P%C3%A9tersbourg_-_Senat.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F_%D0%A1%D0%B5%D0%BD%D0%B0%D1%82%D0%B0_%D0%B8_%D0%A1%D0%B8%D0%BD%D0%BE%D0%B4%D0%B0',
          pos: {
            lat: 59.9359348,
            lng: 30.300847
          }
        }, {
          name: 'Александрийский театр',
          desc: 'Александри́нский театр — русский петербургский театр, один из старейших драматических театров России, сохранившихся до нашего времени.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Alexandrinsky_Theatre.jpg/1920px-Alexandrinsky_Theatre.jpg',
          url: 'https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%82%D0%B5%D0%B0%D1%82%D1%80',
          pos: {
            lat: 59.931785,
            lng: 30.336157
          }
        }, {
          name: 'Росси́йская национа́льная библиоте́ка',
          desc: 'Росси́йская национа́льная библиоте́ка — одна из первых публичных библиотек в Восточной Европе, расположена в Санкт-Петербурге.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/%D0%9D%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B937.JPG/2560px-%D0%9D%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B937.JPG',
          url: 'https://ru.wikipedia.org/wiki/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F_%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B0',
          pos: {
            lat: 59.9335441,
            lng: 30.3357343
          }
        }]
      }, {
        name: 'Санкт-Петербург в эпоху Александра II (1855-1881 гг.)',
        buildings: [{
            name: 'Литейный мост',
            desc: 'Координаты: 59°57′05″\xa0с.\xa0ш. 30°20′57″\xa0в.\xa0д.HGЯO',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Liteyny_Bridge_Panorama.jpg/310px-Liteyny_Bridge_Panorama.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%82%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82',
            pos: {
              lat: 59.9515917,
              lng: 30.3493611
            }
          },
          {
            name: 'Исаакиевский собор',
            desc: 'Состояниеотпатрулирована',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Blue_star_unboxed.svg/13px-Blue_star_unboxed.svg.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%98%D1%81%D0%B0%D0%B0%D0%BA%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80',
            pos: {
              lat: 59.9342889,
              lng: 30.30667
            }
          },
          {
            name: 'Мариинский театр',
            desc: 'Ленинградский государственный академический театр оперы и балета им. С. М. Кирова',
            image: 'https://upload.wikimedia.org/wikipedia/ru/d/d6/Mariinsky_Theatre_logo.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D0%B8%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%82%D0%B5%D0%B0%D1%82%D1%80',
            pos: {
              lat: 59.925645,
              lng: 30.295997
            }
          },
          {
            name: 'Большой Санкт-Петербургский государственный цирк',
            desc: 'Большо́й Санкт-Петербу́ргский госуда́рственный цирк (также широко используется историческое название Цирк Чинизелли)\xa0— цирк города Санкт-Петербурга, первый каменный стационарный цирк России, один из старейших цирков России.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Curcus_in_SPB.jpg/300px-Curcus_in_SPB.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%86%D0%B8%D1%80%D0%BA',
            pos: {
              lat: 59.938569,
              lng: 30.34117
            }
          },
          {
            name: 'Дача Безбородко',
            desc: 'Дача Безбородко (усадьба Кушелева-Безбородко, она же, Кушелева дача) — усадьба со знаменитой «львиной» оградой. Архитекторы Джакомо Кваренги, Н. А. Львов. Кто же автор львиной ограды — никто не знает.',
            image: 'https://upload.wikimedia.org/wikipedia/ru/a/ad/Kushelevadacha.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%B8%D0%B9_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%86%D0%B8%D1%80%D0%BA',
            pos: {
              lat: 59.9588996,
              lng: 30.4002682
            }
          },
          {
            name: 'Дом учёных (Санкт-Петербург)',
            desc: 'Дом учёных имени М. Горького РАН (Дворцовая набережная, 26)\xa0— старейший в бывшем СССР творческий клуб научной интеллигенции[1].',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC_%D1%83%D1%87%D1%91%D0%BD%D1%8B%D1%85_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
            pos: {
              lat: 59.943404000028,
              lng: 30.319668000028
            }
          }
        ]
      }, {
        name: 'Санкт-Петербург в эпоху Александра III (1881-1894 гг.)',
        buildings: [{
            name: 'Спас на Крови',
            desc: 'Собо́р Воскресе́ния Христо́ва на Крови́, или храм Спа́са на Крови́ в Санкт-Петербурге\xa0— православный мемориальный однопрестольный храм во имя Воскресения Христова; сооружён в память того, что на этом месте 1\xa0(13)\xa0марта\xa01881 года в результате покушения был смертельно ранен император Александр II (выражение на крови указывает на кровь царя). Храм был сооружён как памятник царю-мученику на средства, собранные по всей России[1].',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Auferstehungskirche_%28Sankt_Petersburg%29.JPG/267px-Auferstehungskirche_%28Sankt_Petersburg%29.JPG',
            url: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B0%D1%81_%D0%BD%D0%B0_%D0%9A%D1%80%D0%BE%D0%B2%D0%B8',
            pos: {
              lat: 59.9401611,
              lng: 30.3285972
            }
          },
          {
            name: 'Санкт-Петербургская художественно-промышленная академия имени А. Л. Штиглица',
            desc: 'Центральное училище технического рисования барона Штиглица, Ленинградское высшее художественно-промышленное училище им. В.И. Мухиной',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%B0%D1%8F_%D1%85%D1%83%D0%B4%D0%BE%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE-%D0%BF%D1%80%D0%BE%D0%BC%D1%8B%D1%88%D0%BB%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D1%8F_%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8_%D0%90._%D0%9B._%D0%A8%D1%82%D0%B8%D0%B3%D0%BB%D0%B8%D1%86%D0%B0',
            pos: {
              lat: 59.94361,
              lng: 30.34083
            }
          },
          {
            name: 'Дворец великого князя Алексея Александровича',
            desc: '\xa0памятник архитектуры',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Alexis_palace.jpeg/300px-Alexis_palace.jpeg',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%BE%D1%80%D0%B5%D1%86_%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D0%BD%D1%8F%D0%B7%D1%8F_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D1%8F_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87%D0%B0',
            pos: {
              lat: 59.928055555584,
              lng: 30.283416666695
            }
          },
          {
            name: 'Владимирский дворец',
            desc: 'Владимирский дворец\xa0— резиденция великого князя Владимира Александровича, расположенная в Санкт-Петербурге (Дворцовая набережная, 26).',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86',
            pos: {
              lat: 59.943303060028,
              lng: 30.319766110028
            }
          },
          {
            name: 'Кресты',
            desc: 'Санкт-Петербург',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%80%D0%B5%D1%81%D1%82%D1%8B',
            pos: {
              lat: 59.95389,
              lng: 30.36444
            }
          },
          {
            name: 'Дом Мурузи',
            desc: 'Дом Мурузи\xa0— бывший доходный дом в Санкт-Петербурге, расположенный по адресу Литейный проспект, 24 (27\xa0— по улице Пестеля, 14\xa0— по улице Короленко).',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC_%D0%9C%D1%83%D1%80%D1%83%D0%B7%D0%B8',
            pos: {
              lat: 59.942500000028,
              lng: 30.348888888917
            }
          },
          {
            name: 'Большая хоральная синагога (Санкт-Петербург)',
            desc: '\xa0памятник архитектуры\xa0(федеральный)',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Grand_Choral_Synagogue_of_SPB.jpg/300px-Grand_Choral_Synagogue_of_SPB.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D1%85%D0%BE%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D0%BD%D0%B0%D0%B3%D0%BE%D0%B3%D0%B0_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
            pos: {
              lat: 59.924713,
              lng: 30.2895573
            }
          },
          {
            name: 'Певческая капелла',
            desc: '\xa0памятник архитектуры\xa0(федеральный)',
            image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/%D0%9E%D0%B1%D1%89%D0%B8%D0%B9_%D0%B2%D0%B8%D0%B4_%D0%9F%D0%B5%D0%B2%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9_%D0%9A%D0%B0%D0%BF%D0%B5%D0%BB%D0%BB%D1%8B_%D1%81%D0%BE_%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D1%8B_%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE_%D1%88%D1%82%D0%B0%D0%B1%D0%B0.JPG',
            url: 'https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D0%BA%D0%B0%D0%BF%D0%B5%D0%BB%D0%BB%D0%B0_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B0',
            pos: {
              lat: 59.939931,
              lng: 30.3188723
            }
          }
        ]
      }, {
        name: 'Санкт-Петербург в эпоху Николая II (1894-1917 гг.)',
        buildings: [{
            name: 'Троицкий мост (Санкт-Петербург)',
            desc: 'Координаты: 59°56′55″\xa0с.\xa0ш. 30°19′38″\xa0в.\xa0д.HGЯO',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Trinity_Bridge_in_Saint_Petersburg.jpg/285px-Trinity_Bridge_in_Saint_Petersburg.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%BE%D0%B8%D1%86%D0%BA%D0%B8%D0%B9_%D0%BC%D0%BE%D1%81%D1%82_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
            pos: {
              lat: 59.9487528,
              lng: 30.3274056
            }
          },
          {
            name: 'Великокняжеская усыпальница',
            desc: 'Великокняжеская усыпальница\xa0— усыпальница некоронованных членов российского императорского дома, расположена в Санкт-Петербурге в Петропавловской крепости рядом с православным Петропавловским собором. Традиционное название «Великокняжеская усыпальница» не совсем точно: помимо особ, имевших титул великих князей и княгинь, усыпальница была предназначена также для князей императорской крови и членов породнившейся с Романовыми семьи Богарне, имевших титул герцогов Лейхтенбергских и светлейших князей Романовских.',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%BA%D0%BD%D1%8F%D0%B6%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%83%D1%81%D1%8B%D0%BF%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0',
            pos: {
              lat: 59.9506417,
              lng: 30.3173278
            }
          },
          {
            name: 'Финляндский железнодорожный мост',
            desc: 'Координаты: 59°54′55″\xa0с.\xa0ш. 30°24′34″\xa0в.\xa0д.HGЯO',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/IvanSmelov-FINLYANDSKY.jpg/300px-IvanSmelov-FINLYANDSKY.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BD%D0%BB%D1%8F%D0%BD%D0%B4%D1%81%D0%BA%D0%B8%D0%B9_%D0%B6%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82',
            pos: {
              lat: 59.9154944,
              lng: 30.4094556
            }
          },
          {
            name: 'Дом компании «Зингер»',
            desc: 'Дом компа́нии «Зи́нгер» (известный также как «Дом кни́ги»)\xa0— здание в Санкт-Петербурге, расположенное по адресу Невский проспект, дом 28, памятник архитектуры федерального значения, находится в государственной собственности.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Singer_House_SPB_01.jpg/270px-Singer_House_SPB_01.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC_%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8_%C2%AB%D0%97%D0%B8%D0%BD%D0%B3%D0%B5%D1%80%C2%BB',
            pos: {
              lat: 59.935667,
              lng: 30.325917
            }
          },
          {
            name: 'Дом торгового товарищества «Братья Елисеевы»',
            desc: 'Дом торгового товарищества «Братья Елисеевы» (Елисеевский магазин)\xa0— здание на углу Невского проспекта (дом 56) и Малой Садовой улицы (дом 8) в Санкт-Петербурге, памятник архитектуры раннего модерна.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eliseevs%27_House_SPB_01.jpg/267px-Eliseevs%27_House_SPB_01.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC_%D1%82%D0%BE%D1%80%D0%B3%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE_%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B8%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0_%C2%AB%D0%91%D1%80%D0%B0%D1%82%D1%8C%D1%8F_%D0%95%D0%BB%D0%B8%D1%81%D0%B5%D0%B5%D0%B2%D1%8B%C2%BB',
            pos: {
              lat: 59.9342,
              lng: 30.3377
            }
          },
          {
            name: 'Wawelberg Bank building',
            desc: 'The Wawelberg Bank Building in St. Petersburg, Russia was built by the Wawelbergs - a prominent Polish banking family active in the Russian Empire. Although this building bears initials HW (Hipolit Wawelberg), it was commissioned by his son, Michael Wawelberg. It is located at 7/9 Nevsky Prospekt and is an important Nevsky Prospekt landmark. Architect Marian Peretiatkovich, also Peretyatkovich, Peretiatkowicz; Style: Historicism, Neo-Renaissance with elements of Art Nouveau',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/7-9_Nevsky_07_HW2.jpg/220px-7-9_Nevsky_07_HW2.jpg',
            url: 'https://en.wikipedia.org/wiki/Wawelberg_Bank_building',
            pos: {
              lat: 59.9365765,
              lng: 30.3120039
            }
          },
          {
            name: 'Санкт-Петербургская соборная мечеть',
            desc: '\xa0памятник архитектуры\xa0(региональный)',
            image: 'https:/w/extensions/FlaggedRevs/frontend/modules/img/1.png',
            url: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%B0%D1%8F_%D1%81%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0%D1%8F_%D0%BC%D0%B5%D1%87%D0%B5%D1%82%D1%8C',
            pos: {
              lat: 59.955167,
              lng: 30.323889
            }
          },
          {
            name: 'Буддийский храм в Санкт-Петербурге',
            desc: 'Будди́йский храм в Санкт-Петербу́рге (официально: Санкт-Петербу́ргский будди́йский храм «Даца́н Гунзэчойнэ́й» (тиб. ཀུན་བརྩེ་ཆོས་གནས་གྲྭ་ཚང),\xa0в переводе с тибетского Гунзэчойнэй — источник святого учения Всесострадающего [Владыки-отшельника]) — до недавнего времени[1] самый северный в мире буддийский храм. Относится к Буддийской традиционной сангхе России, школа гелугпа.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Datsan_Gunzechoinei_Face.jpg/300px-Datsan_Gunzechoinei_Face.jpg',
            url: 'https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B4%D0%B4%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%85%D1%80%D0%B0%D0%BC_%D0%B2_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B5',
            pos: {
              lat: 59.98361,
              lng: 30.25583
            }
          },
          {
            name: 'Дворец Николая Николаевича Младшего',
            desc: 'Дворец Николая Николаевича Младшего. Последниц дворец в истории России',
            image: 'https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:%D0%94%D0%B2%D0%BE%D1%80%D0%B5%D1%86_%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D0%BD%D1%8F%D0%B7%D1%8F_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%8F_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87%D0%B0-%D0%BC%D0%BB%D0%B0%D0%B4%D1%88%D0%B5%D0%B3%D0%BE.JPG',
            url: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87_%D0%9C%D0%BB%D0%B0%D0%B4%D1%88%D0%B8%D0%B9',
            pos: {
              lat: 59.98361,
              lng: 30.25583
            }
          }
          {
            name: 'Residential Building of the First Russian Insurance Company',
            desc: 'The house was built at the height of the Russian Neoclassical Revival; the facades were lined with expensive soapstone from Sweden and decorated with monumental columns and sculptures.',
            image: 'http://www.saint-petersburg.com/images/apartment-buildings/residential-building-of-the-first-russian-insurance-company/facade-of-the-apartment-building-of-the-first-russian-insurance-society-facing-kamennoostrovskiy-prospekt.jpg',
            url: 'http://www.saint-petersburg.com/apartment-buildings/residential-building-of-the-first-russian-insurance-company/',
            pos: {
              lat: 59.962307,
              lng: 30.313799
            }
          }
        ]
      }, {
        name: 'Санкт-Петербург в эпоху Сталина (1924-1941 гг.)',
        buildings: []
      }, {
        name: 'Санкт-Петербург в эпоху Сталина 2 (1945-1953 гг.)',
        buildings: []
      }, {
        name: 'Санкт-Петербург в эпоху Хрущева (1725-1727 гг.)',
        buildings: []
      }, {
        name: 'Санкт-Петербург в эпоху Брежнева (1725-1727 гг.)',
        buildings: []
      }, {
        name: 'Санкт-Петербург в эпоху Горбачева (1725-1727 гг.)',
        buildings: []
      }];

      vm.selectAge = function(age) {
        if (lastLayer) {
          map.removeLayer(lastLayer);
        }

        vm.selectedAge = age;

        map.fitBounds(age.buildings.map(function(building) {
          return [building.pos.lat, building.pos.lng];
        }), {
          padding: L.point(10, 10)
        });
        if (age.buildings.length === 1) {
          map.setZoom(15);
        }
        lastLayer = L.featureGroup(age.buildings.map(function(building) {

          var marker = L.marker([building.pos.lat, building.pos.lng]);
          marker.bindTooltip(
            "<p>" + "<img src=\"" + building.image + "\">" + building.desc + "</p>", {
              className: 'building-tooltip'
            });
          marker.on('click', function() {
            $window.open(building.url, '_blank');
          });

          return marker;
        }));
        map.addLayer(lastLayer);
      };
    });
})();
