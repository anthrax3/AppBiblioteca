'use strict';

/**
 * @ngdoc function
 * @name AppBiblioteca.controller:LangController
 * @description
 * # LangController
 * Controller of the AppBiblioteca
 */
angular.module('AppBiblioteca.lang', [])
    .controller('LangController', [
        '$scope', 'localize',
        function($scope, localize) {
            $scope.lang = 'English';
            $scope.setLang = function(lang) {
                switch (lang) {
                    case 'English':
                        localize.setLanguage('EN-US');
                        break;
                    case 'Español':
                        localize.setLanguage('ES-ES');
                        break;
                    case '日本語':
                        localize.setLanguage('JA-JP');
                        break;
                    case '中文':
                        localize.setLanguage('ZH-TW');
                        break;
                    case 'Deutsch':
                        localize.setLanguage('DE-DE');
                        break;
                    case 'français':
                        localize.setLanguage('FR-FR');
                        break;
                    case 'Italiano':
                        localize.setLanguage('IT-IT');
                        break;
                    case 'Portugal':
                        localize.setLanguage('PT-BR');
                        break;
                    case 'Русский язык':
                        localize.setLanguage('RU-RU');
                        break;
                    case '한국어':
                        localize.setLanguage('KO-KR');
                }
                $scope.lang = lang;
            };
        }
    ]);