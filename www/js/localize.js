'use strict';

/**
 * @ngdoc service
 * @name AppBiblioteca.localize
 * @description
 * # localize
 * Factory in the AppBiblioteca.
 */
angular.module('AppBiblioteca.localize', [])

    /*
     * English, Español, 日本語, 中文, Deutsch, français, Italiano, Portugal, Русский язык, 한국어
     * English:          EN-US
     * Spanish:          Español ES-ES
     * Japanese:         日本語 JA-JP
     * Chinese:          简体中文 ZH-CN
     * Chinese:          繁体中文 ZH-TW
     * German:           Deutsch DE-DE
     * French:           français FR-FR
     * Italian:          Italiano IT-IT
     * Portugal:         Portugal PT-BR
     * Russian:          Русский язык RU-RU
     * Korean:           한국어 KO-KR

     * thanks for the icons: https://www.iconfinder.com/search/?q=iconset%3Aflags_gosquared
     */

    .factory('localize', [
        '$http', '$rootScope', '$window',
        function($http, $rootScope, $window) {
            var localize;
            localize = {
                language: '',
                url: void 0,
                resourceFileLoaded: false,
                successCallback: function(data) {
                    localize.dictionary = data;
                    localize.resourceFileLoaded = true;
                    return $rootScope.$broadcast('localizeResourcesUpdated');
                },
                setLanguage: function(value) {
                    localize.language = value.toLowerCase().split('-')[0];
                    return localize.initLocalizedResources();
                },
                setUrl: function(value) {
                    localize.url = value;
                    return localize.initLocalizedResources();
                },
                buildUrl: function() {
                    if (!localize.language) {
                        localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase();
                        localize.language = localize.language.split('-')[0];
                    }
                    return 'i18n/' + localize.language + '.js';
                },
                initLocalizedResources: function() {
                    var url;
                    url = localize.url || localize.buildUrl();
                    return $http({
                        method: 'GET',
                        url: url,
                        cache: false
                    }).success(localize.successCallback).error(function() {
                        return $rootScope.$broadcast('localizeResourcesUpdated');
                    });
                },
                getLocalizedString: function(value) {
                    var result, valueLowerCase;
                    result = void 0;
                    if (localize.dictionary && value) {
                        valueLowerCase = value.toLowerCase();
                        if (localize.dictionary[valueLowerCase] === '') {
                            result = value;
                        } else {
                            result = localize.dictionary[valueLowerCase];
                        }
                    } else {
                        result = value;
                    }
                    return result;
                }
            };
            localize.initLocalizedResources();
            return localize;
        }
    ]);