(function () {
    'use strict';

    angular
        .module('app', ['templates', 'ui.router', 'ui-leaflet'])
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('');

            $stateProvider
                .state('root', {
                    url: '',
                    templateUrl: 'main/partials/main.tpl.html'
                });
        }]);
})();