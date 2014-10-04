window.Tutorial = {
	Models: {},
	Collections: {},
	Views: {}
};

// Animal model
Tutorial.Models.Animal = Backbone.Model.extend({
	defaults: {
		name: 'Fido',
		color: 'black',
		sound: 'woof'
	},
	validate: function(attrs, options) {
		if (!attrs.name) {
			alert('Your animal must have a name!');
		}
		if (attrs.name < 2) {
			alert("Your animal\'s name must be more than 2 characters");
		}
	},
	sleep: function() {
		alert(this.get('name') + ' is sleeping.');
	}
});

// Animal view
Tutorial.Views.Animal = Backbone.View.extend({
	tagName: 'li', //defaults to div if not specified
	className: 'animal',
	id: 'dogs',
	events: {
		'click': 'alertTest',
		'click .edit': 'editAnimal',
		'click .delete': 'deleteAnimal'
	},
	initialize: function() {
		this.render();
		this.on('change', function() {
			console.log('Something has changed');
		});
	},
	newTemplate: _.template($('#dogTemplate').html()),
	render: function() {
		// this.$el.html(this.model.get('name') + ' is ' + this.model.get('color') + ' and says ' + this.model.get('sound'));
		this.$el.html(this.newTemplate(this.model.toJSON()));
	}
});

// Animal collection
Tutorial.Collections.Animal = Backbone.Collection.extend({
	model: Tutorial.Models.Animal
});

// View for all animals (collection)
Tutorial.Views.Animals = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.collection;
	},
	render: function() {
		this.collection.each(function(Animal) {
			var animalView = new AnimalView({
				model: Animal
			});
			$(document.body).append(animalView.el);
		});
	}
});


var animalCollection = new AnimalCollection(
	[{
		name: 'Sugar',
		color: 'tan',
		sound: 'woof'
	}, {
		name: 'Gizmo',
		color: 'tan',
		sound: 'woof'
	}, {
		name: 'Daisy',
		color: 'grey',
		sound: 'arf'
	}]
);

var animalsView = new AnimalsView({
	collection: animalCollection
});
animalsView.render();
