(function wrapper() {
	'use strict';

	angular
		.module('app.directives')
		.directive('coco', cocoDirective);

	function cocoDirective($filter) {
		var directiveDefinition = {
			restrict: "A",
    		require: "?ngModel",
			link: link
		};

		function link(scope, element, attrs, ngModel) {

			if(!ngModel){
				return;
			}

			var dateTestRegex = /\d{4}\/\d{1,2}\/\d{1,2}/;

			ngModel.$parsers.push(parser);
  		ngModel.$formatters.push(formatter);

			function parser(value) {
				if (dateTestRegex.test(value) && !isNaN(Date.parse(value))) {
					value = new Date(value);
					ngModel.$setValidity('textDate', true);
				} else {
					var dateFormat = new Date(ngModel.$viewValue);
					var dateLong = dateFormat.getTime();
					value = dateLong;
					ngModel.$setValidity('textDate', false);
				}
        //return long date to model
				return value;
			}

			function formatter(value) {
				value = new Date(value);
        //return input formated
				return value;
			}
		}

		return directiveDefinition;
	}
})();
