"use strict";
/**
 * this is a class for creating progress buttons somewhat easily
 * transition times are still hardcoded which is something that one might want to externalize
 */

/** you can edit these options */
var options = {

'progress-duration': 0.4, /* time the progress bar takes, in [s] */
'fadeout-delay': 0.3,
'fadeout-duration': 0.5,
'progress-bar-color': '' /* OPTIONAL: color of the progress bar, in the format 'rgba(*red value*, *green value*, *blue value*, *alpha value*)' - color values ranging from 0-255, alpha from 0-1, for example 'rgba(255,255,255,1)' */

};


/* helper array to keep track of all buttons */
var buttons = [];

/**
 * Represents a progress button
 * @Constructor
 * @arg {object} buttonElement - DOM element for the button
 * @arg {float} percentage - default percentage of the button that the progress bar should span [0-1]
 * @arg {bool} clicktrigger - should a default "click"-eventlistener be attached to the button? (so it triggers the progress bar when you click it) [default: false]
 */
function Pb(buttonElement, percentage, clicktrigger) {
	var self = this;
	self.b = buttonElement;

	self.timeouts = [];
	self.percentage = percentage;

	self.b.classList.add('progressbutton');
	self.span = document.createElement("span");
	self.span.innerHTML=self.b.innerHTML;
	self.b.innerHTML="";
	self.div = document.createElement("div");
	self.div.classList.add('progressbar');

	if (clicktrigger) {
		self.b.addEventListener('click', function(){ self.trigger(); });
	}

	buttons.push(self);
	self.b.appendChild(self.div);
	self.b.appendChild(self.span);
}

/**
 * Makes the animation start but removes old ones before
 * @arg {float} percentage - percentage of the button that the progress bar should span _this_ time [0-1]
 */
Pb.prototype.trigger = function(percentage) {
	var self = this;
	var d = self.div;
	self.stop();

	setTimeout( function () {
		self.addTransition(percentage);
	}, 10);
};

Pb.prototype.addTransition = function (percentage) {
	var self = this;
	var d = this.div;
	var perc = percentage || this.percentage;
	perc = Math.min(Math.max(perc, 0),1);

	if (options['progress-bar-color']) {
		d.style.backgroundColor = options['progress-bar-color'];
	}
	d.style.transition = "width linear " + options['progress-duration'] + "s";
	d.style.width = 100*perc + "%";

	var fo_delay = (options['progress-duration'] + options['fadeout-delay'])*1000;
	var fo_time = options['fadeout-time']*1000;

	var to = setTimeout( function (argument) {
		d.style.transition = "";
		d.classList.add('fadeout');
		var to2 = setTimeout( function () {
			d.classList.remove('fadeout');
			d.style.width = "0";
		}, fo_time);
		self.timeouts.push(to2);
	}, fo_delay);
	this.timeouts.push(to);
};

/* it's important to destroy all timeouts before creating new ones */
Pb.prototype.stop = function(div) {
	var d = this.div;
	d.style.transition = "";
	d.style.width = "0";
	for (var i = 0, len = this.timeouts.length; i < len; i++) {
		clearTimeout(this.timeouts[i]);	
		this.timeouts.length = 0;
	}
};

