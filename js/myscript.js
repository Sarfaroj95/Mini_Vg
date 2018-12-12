function getValues() {
			var errors = [];
			var rgxpos = /^\d+$/;
			var rgxneg = /^\-?\d+$/;
			var els = {
				howmany: document.querySelector('[name=howmany]'),
				min:     document.querySelector('[name=min]'),
				max:     document.querySelector('[name=max]'),
				sortem:  document.querySelector('[name=sortem]')
			};
			var values = {
				howmany: els.howmany.value,
				min:     els.min.value,
				max:     els.max.value,
				sortem:  els.sortem.options[els.sortem.selectedIndex].value
			};
			if (!rgxpos.test(values.howmany) || values.howmany == 0) {
				els.howmany.classList.add('error');
				errors.push('Enter a number of results greater than zero');
			}
			if (!rgxneg.test(values.min)) {
				els.min.classList.add('error');
				errors.push('Enter a minimum number');
			}
			if (!rgxneg.test(values.max)) {
				els.max.classList.add('error');
				errors.push('Enter a maximum number');
			}
			if (errors.length > 0) {
				values = null;
				document.getElementById('errors').innerHTML = '<p>Please fix the following errors:</p><ul><li>' + errors.join('</li><li>') + '</li></ul>';
			}
			else {
				['howmany', 'min', 'max'].forEach(function (el) {
					els[el].classList.remove('error');
				});
				document.getElementById('errors').innerHTML = '';

				values.howmany = +values.howmany;
				values.min     = +values.min;
				values.max     = +values.max;
			}
			return values;
		}

		// from: http://stackoverflow.com/a/1527820/11577
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var rnd = function () {
			var loader = document.getElementById('ajax-loader');
			var values = getValues();
			if (values) {
				loader.style.display = 'inline';
				setTimeout(function () {
					var numbers = [];
					loader.style.display = 'none';
					for (var i = 0; i < values.howmany; i += 1) {
						numbers.push(getRandomInt(values.min, values.max));
					}
					if ('sorted' === values.sortem) {
						numbers.sort(function (a, b) {
							return a > b ? 1 : a < b ? -1 : 0;
						});
					}
					document.getElementById('result').innerHTML = numbers.join('<br>','<hr>');
				}, 333);
			}
		};