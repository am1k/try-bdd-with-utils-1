var utils = require('./utils'),
	expect =  require('expect.js');

describe('Utils', function() {

	describe('#sort()', function() {
		it('should sort given array of numbers with ascending ordering', function() {
			expect(utils.sort([2, 1, 3, 0]).join()).to.equal([0, 1, 2, 3].join());
		});

		it('should sort given array of numbers with ascending ordering', function() {
			expect(utils.sort([2, 1, 3, 0], function(a, b){return a > b}).join()).to.equal([0, 1, 2, 3].join());
		});

	});

	describe('#capitalize()', function() {
		it('should make first letter of given string upper case', function() {
			expect(utils.capitalize('just do it!')).to.equal('Just do it!');
		});

		it('should make first letter of given string upper case', function() {
			expect(utils.capitalize('JUST DO IT')).to.equal('Just do it');
		});

		it('should make first letter of given string upper case', function() {
			expect(utils.capitalize('jUST DO IT')).to.equal('Just do it');
		});

	});

	describe('#camelize()', function() {
		it('should make all first letter to upper case', function() {
			expect(utils.camelize('Equipment Class name')).to.equal('EquipmentClassName');
		});

		it('should make all first letter to upper case', function() {
			expect(utils.camelize('Equipment class Name')).to.equal('EquipmentClassName');
		});

		it('should make all first letter to upper case', function() {
			expect(utils.camelize('equipment class name')).to.equal('EquipmentClassName');
		});

		it('should make all first letter to upper case', function() {
			expect(utils.camelize('Equipment Class Name')).to.equal('EquipmentClassName');
		});

		it('should make all first letter to upper case', function() {
			expect(utils.camelize(['Equipment', 'Class', 'Name'])).to.equal('EquipmentClassName');
		});

	});


	describe('#trim()', function() {
		it('should make one word', function() {
			expect(utils.trim(' just  do  it ')).to.equal('justdoit');
		});

		it('should make one word', function() {
			expect(utils.trim(' just  do  it          ')).to.equal('justdoit');
		});

		it('should make one word', function() {
			expect(utils.trim('         just  do  it          ')).to.equal('justdoit');
		});

	});
	describe('#reverse()', function() {
		it ('should show word reverse', function() {
			expect(utils.reverse(['just', 'do', 'it']).join()).to.equal(['it', 'do', 'just'].join());
		})
	});

	describe('#map()', function () {
		it('should change each list element by applying handler', function () {
			var newArr = [10, 20, 30, 40, 50];

			expect(utils.map(newArr, function (int) {
				return --int;
			}).join()).to.equal([9, 19, 29, 39, 49].join());
		});

		it('should change each list element by applying handler', function () {
			var firstObj = {
				firstName: 'Vitaliy',
				lastName: 'Bog',
				address: 'india, deli, ololoeva str, 4b',
				age: 35
			};

			var secondObj = {
				firstName: 'VITALIY',
				lastName: 'BOG',
				address: 'INDIA, DELI, OLOLOEVA STR, 4B',
				age: 35
			};

			expect(utils.map(firstObj, function (string) {
				string += '';
				return string.toUpperCase();
			}).toString()).to.equal(secondObj.toString());
		});
	});

	describe('#groupBy()',  function () {
		it('Should accept array with single element and return according object', function () {
			var testArray = [1.1,1.2,2.1,2.3];

			expect(utils.groupBy(testArray, function (num) {
				return Math.floor(num);
			})).to.eql({'1': [ 1.1, 1.2 ], '2': [ 2.1, 2.3 ]});
		});

		it('Should accept array with single element and return according object', function () {
			var testArray = [1.1,1.2,2.1,2.3];

			expect(utils.groupBy(testArray, function (num) {
				return Math.floor(num);
			})).to.eql({'1': [ 1.1, 1.2 ], '2': [ 2.1, 2.3 ]});
		});
	});

	describe('#once()', function () {
		it('function that can only be called one time', function () {
			var count = 0;
			var newFunction = utils.once(function(){count++});
			newFunction();
			newFunction();
			expect(count).to.equal(1);
		})
	});

	describe('#debounce()', function () {
		it('new debounced version of the passed function', function () {
			var count = 1000;
			var text = 'Hello';
			var newFunction = utils.debounce(function() {return text.toUpperCase()}, count);
			newFunction();
			newFunction();
			newFunction();
			newFunction();
			console.log(newFunction);
			expect(text.toUpperCase()).to.equal('HELLO');
		});
	});

	describe('#deepEqual()', function () {
		it ('This is the same object', function () {
			var first = {2: [2,3]};
			var second = {2: [2,3]};
			expect(utils.deepEqual(second,first)).to.equal(true);
		});
		it('different types', function () {
			var first = [2,4];
			var second = {3: 5};
			expect(utils.deepEqual(first,second)).to.equal(false);
		});
		it('different arrays', function () {
			var first = [2,4,6];
			var second = [2,5,7];
			expect(utils.deepEqual(first,second)).to.equal(false);
		});
		it('different objects', function () {
			var first = {2: 4};
			var second = {2: 5};
			expect(utils.deepEqual(first,second)).to.equal(false);
		});
	});
});