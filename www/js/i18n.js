'use strict';

/**
 * @ngdoc directive
 * @name AppBiblioteca.directive:i18n
 * @description
 * # i18n
 */
angular.module('AppBiblioteca.i18n', [])
    .directive('i18n', [
        'localize',
        function(localize) {
            var i18nDirective;
            i18nDirective = {
                restrict: 'EA',
                updateText: function(ele, input, placeholder) {
                    var result;
                    result = void 0;
                    if (input === 'i18n-placeholder') {
                        result = localize.getLocalizedString(placeholder);
                        return ele.attr('placeholder', result);
                    } else if (input.length >= 1) {
                        result = localize.getLocalizedString(input);
                        return ele.text(result);
                    }
                },
                link: function(scope, ele, attrs) {
                    console.log(scope, ele, attrs);
                    scope.$on('localizeResourcesUpdated', function() {
                        return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);
                    });
                    return attrs.$observe('i18n', function(value) {
                        return i18nDirective.updateText(ele, value, attrs.placeholder);
                    });
                }
            };
            return i18nDirective;
        }
    ]);