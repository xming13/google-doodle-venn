var XMing = XMing || {};

// Base SpriteManager	
XMing.SpriteManager = function() {
	this.bigDefaultLeftIcon			= null;
	this.bigDefaultRightIcon 		= null;
	this.smallLeftIcons 			= [];
	this.smallRightIcons 			= [];
	this.bigLeftIcons 				= [];
	this.bigRightIcons 				= [];
	
	this.resetIcon					= null;
};
XMing.SpriteManager.prototype.init = function() {
	this.reset();
	this.loadIcons();
};
XMing.SpriteManager.prototype.reset = function() {
	this.bigDefaultLeftIcon		= null;
	this.bigDefaultRightIcon 	= null;
	this.smallLeftIcons 		= [];
	this.smallRightIcons 		= [];
	this.bigLeftIcons 			= [];
	this.bigRightIcons 			= [];
	
	this.resetIcon				= null;
};

// GoogleSpriteManager (inherits Base SpriteManager)
XMing.GoogleSpriteManager = function() {
	XMing.SpriteManager.call(this);
	this.ribbonLeftIcon		= null;
	this.ribbonRightIcon 	= null;
};
XMing.GoogleSpriteManager.prototype = Object.create(XMing.SpriteManager.prototype);
XMing.GoogleSpriteManager.prototype.constructor = XMing.GoogleSpriteManager;
XMing.GoogleSpriteManager.prototype.reset = function() {
	XMing.SpriteManager.prototype.reset.call(this);
	this.ribbonLeftIcon			= null;
	this.ribbonRightIcon		= null;
};
XMing.GoogleSpriteManager.prototype.loadIcons = function() {
	var TYPE_ICON_LEFT = 'left',
		TYPE_ICON_RIGHT = 'right',
		TYPE_ICON_RESET = 'reset';
		
	// initial icons
	var imageInitial = new Image();
	imageInitial.src = 'images/sprite-initial.png';
	var initialCoordsArray = [
		[0, 1266, 178, 178],
		[0, 1637, 178, 178],
	];
	
	this.bigDefaultLeftIcon = new GoogleIcon(-1, TYPE_ICON_LEFT, imageInitial, initialCoordsArray[0]);
	this.bigDefaultRightIcon = new GoogleIcon(-1, TYPE_ICON_RIGHT, imageInitial, initialCoordsArray[1], 0.75);
	this.bigDefaultRightIcon.isOverlay = true;
	
	// circle icons
	var imageCircles = new Image();
	imageCircles.src = 'images/sprite-circles.png';
	var coordsArray = [
		[52, 2509, 49, 49],
		[52, 2276, 49, 49],
		[0, 2043, 49, 49],
		[104, 2509, 49, 49],
		[0, 2509, 49, 49],
		
		[0, 2276, 49, 49],
		[52, 0, 49, 49],
		[104, 0, 49, 49],
		[104, 2276, 49, 49],
		[0, 0, 49, 49],
		
		[0, 414, 178, 178],
		[0, 957, 178, 178],
		[0, 776, 178, 178],
		[0, 1500, 178, 178],
		[0, 1319, 178, 178],
		
		[0, 1862, 178, 178],
		[0, 1138, 178, 178],
		[0, 2561, 178, 178],
		[0, 52, 178, 178],
		[0, 233, 178, 178],
		[0, 2095, 178, 178],
		[0, 595, 178, 178],
		[0, 1681, 178, 178],
		[0, 2328, 178, 178],
		[0, 2742, 178, 178]	
	];
	
	var icon;
	for (var i = 0; i < coordsArray.length; i++) {
		if (i < 5) {
			icon = new GoogleIcon(this.smallLeftIcons.length, TYPE_ICON_LEFT, imageCircles, coordsArray[i], 0.0);
			this.smallLeftIcons.push(icon);
		} 
		else if (i < 10) {
			icon = new GoogleIcon(this.smallRightIcons.length, TYPE_ICON_RIGHT, imageCircles, coordsArray[i], 0.0);
			this.smallRightIcons.push(icon);
		}
		else if (i < 15) {
			icon = new GoogleIcon(this.bigLeftIcons.length, TYPE_ICON_LEFT, imageCircles, coordsArray[i]);
			this.bigLeftIcons.push(icon);
		}
		else {
			icon = new GoogleIcon(this.bigRightIcons.length, TYPE_ICON_RIGHT, imageCircles, coordsArray[i]);
			this.bigRightIcons.push(icon);
		}
	}
	
	// end icons
	var imageEnd = new Image();
	imageEnd.src = 'images/sprite-end.png';
	var endCoordsArray = [
		[0, 2334, 48, 48],
		[0, 1609, 18, 38],
		[21, 1609, 19, 38]
	];
	this.resetIcon = new GoogleIcon(-1, TYPE_ICON_RESET, imageEnd, endCoordsArray[0], 0.8);
	this.ribbonLeftIcon = new GoogleIcon(-1, '', imageEnd, endCoordsArray[1]);
	this.ribbonRightIcon = new GoogleIcon(-1, '', imageEnd, endCoordsArray[2]);
};
	
// ColorSpriteManager (inherits Base SpriteManager)
XMing.ColorSpriteManager = function() {
	XMing.SpriteManager.call(this);
};
XMing.ColorSpriteManager.prototype = Object.create(XMing.SpriteManager.prototype);
XMing.ColorSpriteManager.prototype.constructor = XMing.ColorSpriteManager;
XMing.ColorSpriteManager.prototype.loadIcons = function() {
	var sizeSmall = 45,
		sizeBig = 178,
		TYPE_ICON_LEFT = 'left',
		TYPE_ICON_RIGHT = 'right',
		TYPE_ICON_RESET = 'reset';
	
	this.bigDefaultLeftIcon = new ColorIcon(-1, 'Grey', '#F3F3F3', TYPE_ICON_LEFT, sizeBig, sizeBig);
	this.bigDefaultRightIcon = new ColorIcon(-1, 'Grey', '#F3F3F3', TYPE_ICON_RIGHT, sizeBig, sizeBig);
	
	this.smallLeftIcons.push(new ColorIcon(0, 'Yellow', '#FFFF00', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	this.smallLeftIcons.push(new ColorIcon(1, 'Cyan', '#00FFFF', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	this.smallLeftIcons.push(new ColorIcon(2, 'Magenta', '#FF00FF', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	this.smallLeftIcons.push(new ColorIcon(3, 'Red', '#FF0000', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	this.smallLeftIcons.push(new ColorIcon(4, 'Green', '#00FF00', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	this.smallLeftIcons.push(new ColorIcon(5, 'Blue', '#0000FF', TYPE_ICON_LEFT, sizeSmall, sizeSmall));
	
	this.smallRightIcons.push(new ColorIcon(0, 'Yellow', '#FFFF00', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	this.smallRightIcons.push(new ColorIcon(1, 'Cyan', '#00FFFF', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	this.smallRightIcons.push(new ColorIcon(2, 'Magenta', '#FF00FF', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	this.smallRightIcons.push(new ColorIcon(3, 'Red', '#FF0000', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	this.smallRightIcons.push(new ColorIcon(4, 'Green', '#00FF00', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	this.smallRightIcons.push(new ColorIcon(5, 'Blue', '#0000FF', TYPE_ICON_RIGHT, sizeSmall, sizeSmall));
	
	this.bigLeftIcons.push(new ColorIcon(0, 'Yellow', '#FFFF00', TYPE_ICON_LEFT, sizeBig, sizeBig));
	this.bigLeftIcons.push(new ColorIcon(1, 'Cyan', '#00FFFF', TYPE_ICON_LEFT, sizeBig, sizeBig));
	this.bigLeftIcons.push(new ColorIcon(2, 'Magenta', '#FF00FF', TYPE_ICON_LEFT, sizeBig, sizeBig));
	this.bigLeftIcons.push(new ColorIcon(3, 'Red', '#FF0000', TYPE_ICON_LEFT, sizeBig, sizeBig));
	this.bigLeftIcons.push(new ColorIcon(4, 'Green', '#00FF00', TYPE_ICON_LEFT, sizeBig, sizeBig));
	this.bigLeftIcons.push(new ColorIcon(5, 'Blue', '#0000FF', TYPE_ICON_LEFT, sizeBig, sizeBig));
	
	this.bigRightIcons.push(new ColorIcon(0, 'Yellow', '#FFFF00', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	this.bigRightIcons.push(new ColorIcon(1, 'Cyan', '#00FFFF', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	this.bigRightIcons.push(new ColorIcon(2, 'Magenta', '#FF00FF', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	this.bigRightIcons.push(new ColorIcon(3, 'Red', '#FF0000', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	this.bigRightIcons.push(new ColorIcon(4, 'Green', '#00FF00', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	this.bigRightIcons.push(new ColorIcon(5, 'Blue', '#0000FF', TYPE_ICON_RIGHT, sizeBig, sizeBig));
	
	// end icons
	var imageEnd = new Image();
	imageEnd.src = 'images/sprite-end.png';
	var endCoords = [0, 2334, 48, 48];
	this.resetIcon = new GoogleIcon(-1, TYPE_ICON_RESET, imageEnd, endCoords, 0.8);
};

var GoogleIcon = function(index, type, image, coords, alpha) {		
	this.index 		= index;
	this.type 		= type;
	this.image 		= image;
	if (coords != null) {
		this.clipX 	= coords[0];
		this.clipY 	= coords[1];
		this.width 	= coords[2];
		this.height = coords[3];
	}
	this.centerX 	= 0;
	this.centerY 	= 0;
	if (alpha == 0.0) {
		this.alpha = alpha;
	}
	else {
		this.alpha 	= alpha || 1.0;
	}
	this.factor 	= 0.0;
	this.isStart 	= false;
	this.isOverlay 	= false;
	this.rotateRad 	= 0;
	this.isHovered 	= false;
};
GoogleIcon.prototype = {
	copyImage : function(icon) {
		this.image = icon.image;
		this.clipX = icon.clipX;
		this.clipY = icon.clipY;
		this.width = icon.width;
		this.height = icon.height;
		this.rotateRad = icon.rotateRad;
	},
	updateRotateRad : function(tick) {
		if (tick > 160) {
			return;
		} 
		else if (tick > 140) {
			this.rotateRad += this.isTypeLeft() ?
				Math.PI * 2 * 2 / 360 :
				-Math.PI * 2 * 2 / 360;
		}
		else if (tick > 120) {			
			this.rotateRad += this.isTypeLeft() ?
				-Math.PI * 2 * 4 / 360 :
				Math.PI * 2 * 4 / 360;
		}
		else if (tick > 100) {
			this.rotateRad += this.isTypeLeft() ?
				Math.PI * 2 * 2 / 360 :
				-Math.PI * 2 * 2 / 360;
		}	
	},
	rotateRebounce : function(tick) {		
		var numTickForward 			= 30;
			numTickBackward 		= 15;
			fractionCircleForward 	= 3.0 / 8;
			fractionCircleBackward 	= 1.0 / 8;
			
		if (tick > numTickForward + numTickBackward) {
			return;
		} 
		else if (tick > numTickForward) {
			var radBackwordRate = Math.PI * 2 * fractionCircleBackward / numTickBackward;
			this.rotateRad += this.isTypeLeft() ?
				radBackwordRate : -radBackwordRate;
		}
		else {
			var radForwardRate = Math.PI * 2 * fractionCircleForward / numTickForward;
			this.rotateRad += this.isTypeLeft() ?
				-radForwardRate : radForwardRate;
		}
	},
	setHover : function(isHover) {
		if (!this.isHovered && isHover) {
			this.isHovered = isHover;
			this.alpha = 1.0;
		}
		else if (this.isHovered && !isHover) {
			this.isHovered = isHover;
			this.alpha = 0.8;
		}
	},
	isTypeLeft : function() {
		var TYPE_ICON_LEFT  = 'left';
		return this.type == TYPE_ICON_LEFT;
	},
	isTypeRight : function() {
		var TYPE_ICON_RIGHT  = 'right';
		return this.type == TYPE_ICON_RIGHT;
	},
	isTypeReset : function() {
		var TYPE_ICON_RESET  = 'reset';
		return this.type == TYPE_ICON_RESET;
	},
	render : function(context, centerX, centerY) {
		this.centerX = centerX;
		this.centerY = centerY;
		context.save();
		context.globalAlpha = this.alpha;
		context.beginPath();
		context.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();
		context.translate(this.centerX, this.centerY);
		context.rotate(this.rotateRad);
		context.translate(-this.centerX, -this.centerY);
		context.drawImage(
			this.image, 
			this.clipX, 
			this.clipY, 
			this.width, 
			this.height, 
			centerX - this.width / 2, 
			centerY - this.height / 2, 
			this.width, this.height
		);
		
		if (this.isOverlay) {
			context.globalAlpha = 0.1;
			context.fillStyle = '#848482';
			context.fill();
		}
		context.restore();
	}
};

var ColorIcon = function(index, name, hex, type, width, height) {		
	this.index 		= index;
	this.name		= name;
	this.hex 		= hex;
	this.type 		= type;
	this.width 		= width;
	this.height 	= height;
	this.centerX 	= 0;
	this.centerY 	= 0;
	this.alpha 		= 0.8;
	this.factor 	= this.isTypeLeft() ? 1.0 : 0.0;
	this.isStart 	= false;
	this.isOverlay 	= false;
	this.rotateRad 	= 0;
	this.isHovered 	= false;
};
ColorIcon.prototype = {
	copyImage: function(colorIcon) {
		this.name = colorIcon.name;
		this.hex = colorIcon.hex;
		this.width = colorIcon.width;
		this.height = colorIcon.height;
	},
	updateRotateRad: function(tick) {
		if (tick > 160) {
			return;
		} 
		else if (tick > 140) {
			this.rotateRad += this.isTypeLeft() ?
				Math.PI * 2 * 2 / 360 :
				-Math.PI * 2 * 2 / 360;
		}
		else if (tick > 120) {			
			this.rotateRad += this.isTypeLeft() ?
				-Math.PI * 2 * 4 / 360 :
				Math.PI * 2 * 4 / 360;
		}
		else if (tick > 100) {
			this.rotateRad += this.isTypeLeft() ?
				Math.PI * 2 * 2 / 360 :
				-Math.PI * 2 * 2 / 360;
		}	
	},
	setHover: function(isHover) {
		if (!this.isHovered && isHover) {
			this.isHovered = isHover;
			this.alpha = 0.8;
		}
		else if (this.isHovered && !isHover) {
			this.isHovered = isHover;
			this.alpha = 1.0;
		}
	},
	isTypeLeft : function() {
		var TYPE_ICON_LEFT  = 'left';
		return this.type == TYPE_ICON_LEFT;
	},
	isTypeRight : function() {
		var TYPE_ICON_RIGHT  = 'right';
		return this.type == TYPE_ICON_RIGHT;
	},
	isTypeReset : function() {
		var TYPE_ICON_RESET  = 'reset';
		return this.type == TYPE_ICON_RESET;
	},
	render: function(context, centerX, centerY) {
		this.centerX = centerX;
		this.centerY = centerY;
		context.save();
		context.globalAlpha = this.index == -1 ? 1.0 : this.alpha;
		context.beginPath();
		context.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();
		context.translate(this.centerX, this.centerY);
		context.rotate(this.rotateRad);
		context.translate(-this.centerX, -this.centerY);
		context.fillStyle = this.hex;
		context.shadowColor = '#111111';
		context.shadowBlur = 20;
		context.shadowOffsetX = 15;
		context.shadowOffsetY = 15;
		context.fill();
			
		context.restore();
	}		
};
