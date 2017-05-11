(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainController', ["leafletData", "$window", function (leafletData, $window) {
            var vm = this;
            var map = null;
            var lastLayer = null;

            vm.selectedAge = null;

            leafletData.getMap('spb').then(function (newMap) {
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
                name: 'Петровское барроко (1697-1730 гг.)',
                buildings: [{
                    name: 'Кунстка́мера',
                    desc: 'Кунстка́мера — кабинет редкостей, в настоящее время — Музей антропологии и этнографии имени Петра Великого Российской академии наук (МАЭ РАН) — первый музей России, учреждённый императором Петром Первым и находящийся в Санкт-Петербурге.',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kunstkamera_SPB.jpg/300px-Kunstkamera_SPB.jpg',
                    url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BD%D1%81%D1%82%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0',
                    pos: {
                        lat: 59.941,
                        lng: 30.304
                    }
                }, {
                    name: 'Меншиковский дворец',
                    desc: 'Меншиковский дворец — построенный для приближенного императора Петра Первого, первого губернатора Санкт-Петербурга Александра Даниловича Меншикова, дворец выполнен в стиле петровского барокко, первое каменное здание Санкт-Петербурга[3][4]. Авторы проекта — приглашённые зодчие Д. М. Фонтана и Г. И. Шедель[4].',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Menshikov_Palace_in_SPB.jpg/300px-Menshikov_Palace_in_SPB.jpg',
                    url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BD%D1%88%D0%B8%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B2%D0%BE%D1%80%D0%B5%D1%86_(%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3)',
                    pos: {
                        lat: 59.939,
                        lng: 30.295
                    }
                }]
            }];

            vm.selectAge = function (age) {
                if (lastLayer) {
                    map.removeLayer(lastLayer);
                }

                vm.selectedAge = age;

                map.fitBounds(age.buildings.map(function (building) {
                    return [building.pos.lat, building.pos.lng];
                }), {
                    padding: L.point(10, 10)
                });
                lastLayer = L.featureGroup(age.buildings.map(function (building) {

                    var marker = L.marker([building.pos.lat, building.pos.lng]);
                    marker.bindTooltip(
                        "<p>" + "<img src=\"" + building.image + "\">" + building.desc + "</p>", {
                        className: 'building-tooltip'
                    });
                    marker.on('click', function () {
                        $window.open(building.url, '_blank');
                    });

                    return marker;
                }));
                map.addLayer(lastLayer);
            };
        }]);
})();