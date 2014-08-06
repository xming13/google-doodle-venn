var XMing = XMing || {};

XMing.SpriteManager = new function() {
	this.bigDefaultLeftIcon			= null;
	this.bigDefaultRightIcon 		= null;
	this.smallLeftIcons 			= [];
	this.smallRightIcons 			= [];
	this.bigLeftIcons 				= [];
	this.bigRightIcons 				= [];
	
	this.bigDefaultLeftColorIcon	= null;
	this.bigDefaultRightColorIcon 	= null;
	this.smallLeftColorIcons		= [];
	this.smallRightColorIcons 		= [];
	this.bigLeftColorIcons			= [];
	this.bigRightColorIcons			= [];
	
	// declare variable
	var TYPE_ICON_LEFT 	= 'left',
		TYPE_ICON_RIGHT = 'right';
	
	this.init = function() {
		this.reset();
		this.loadInitial();
		this.loadCircles();
		this.loadColorIcons();
	},
	this.reset = function() {
		this.bigDefaultLeftIcon			= null;
		this.bigDefaultRightIcon 		= null;
		this.smallLeftIcons 			= [];
		this.smallRightIcons 			= [];
		this.bigLeftIcons 				= [];
		this.bigRightIcons 				= [];
		
		this.bigDefaultLeftColorIcon	= null;
		this.bigDefaultRightColorIcon 	= null;
		this.smallLeftColorIcons		= [];
		this.smallRightColorIcons 		= [];
		this.bigLeftColorIcons			= [];
		this.bigRightColorIcons			= [];
	},
	this.loadInitial = function() {
		var imageInitial = new Image();
		imageInitial.src = 'images/sprite-initial.png';
		var coordsArray = [
			[0, 1266, 178, 178],
			[0, 1637, 178, 178]
		];
		
		this.bigDefaultLeftIcon = new Icon(-1, TYPE_ICON_LEFT, imageInitial, coordsArray[0]);
		this.bigDefaultRightIcon = new Icon(-1, TYPE_ICON_RIGHT, imageInitial, coordsArray[1]);
	},
	this.loadCircles = function() {
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
				icon = new Icon(this.smallLeftIcons.length, TYPE_ICON_LEFT, imageCircles, coordsArray[i]);
				icon.alpha = 0.8;
				this.smallLeftIcons.push(icon);
			} 
			else if (i < 10) {
				icon = new Icon(this.smallRightIcons.length, TYPE_ICON_RIGHT, imageCircles, coordsArray[i]);
				icon.alpha = 0.0;
				this.smallRightIcons.push(icon);
			}
			else if (i < 15) {
				icon = new Icon(this.bigLeftIcons.length, TYPE_ICON_LEFT, imageCircles, coordsArray[i]);
				this.bigLeftIcons.push(icon);
			}
			else {
				icon = new Icon(this.bigRightIcons.length, TYPE_ICON_RIGHT, imageCircles, coordsArray[i]);
				this.bigRightIcons.push(icon);
			}
		}
	},	
	this.loadColorIcons = function() {	
		this.bigDefaultLeftColorIcon = new ColorIcon(-1, TYPE_ICON_LEFT, '#F3F3F3', 178, 178);
		this.bigDefaultRightColorIcon = new ColorIcon(-1, TYPE_ICON_RIGHT, '#F3F3F3', 178, 178);
		
		this.smallLeftColorIcons.push(new ColorIcon(0, TYPE_ICON_LEFT, '#FFFF00', 49, 49)); // yellow
		this.smallLeftColorIcons.push(new ColorIcon(1, TYPE_ICON_LEFT, '#00FFFF', 49, 49)); // cyan
		this.smallLeftColorIcons.push(new ColorIcon(2, TYPE_ICON_LEFT, '#FF00FF', 49, 49)); // magenta
		
		this.smallRightColorIcons.push(new ColorIcon(0, TYPE_ICON_RIGHT, '#00FFFF', 49, 49)); // cyan
		this.smallRightColorIcons.push(new ColorIcon(1, TYPE_ICON_RIGHT, '#0000FF', 49, 49)); // blue
		this.smallRightColorIcons.push(new ColorIcon(2, TYPE_ICON_RIGHT, '#FF00FF', 49, 49)); // magenta
		this.smallRightColorIcons.push(new ColorIcon(3, TYPE_ICON_RIGHT, '#FF0000', 49, 49)); // red
		this.smallRightColorIcons.push(new ColorIcon(4, TYPE_ICON_RIGHT, '#00FF00', 49, 49)); // green
		this.smallRightColorIcons.push(new ColorIcon(5, TYPE_ICON_RIGHT, '#FFFF00', 49, 49)); // yellow
		
		this.bigLeftColorIcons.push(new ColorIcon(0, TYPE_ICON_LEFT, '#FFFF00', 178, 178)); // yellow
		this.bigLeftColorIcons.push(new ColorIcon(1, TYPE_ICON_LEFT, '#00FFFF', 178, 178)); // cyan
		this.bigLeftColorIcons.push(new ColorIcon(2, TYPE_ICON_LEFT, '#FF00FF', 178, 178)); // magenta
		
		this.bigRightColorIcons.push(new ColorIcon(0, TYPE_ICON_RIGHT, '#00FFFF', 178, 178)); // cyan
		this.bigRightColorIcons.push(new ColorIcon(1, TYPE_ICON_RIGHT, '#0000FF', 178, 178)); // blue
		this.bigRightColorIcons.push(new ColorIcon(2, TYPE_ICON_RIGHT, '#FF00FF', 178, 178)); // magenta
		this.bigRightColorIcons.push(new ColorIcon(3, TYPE_ICON_RIGHT, '#FF0000', 178, 178)); // red
		this.bigRightColorIcons.push(new ColorIcon(4, TYPE_ICON_RIGHT, '#00FF00', 178, 178)); // green
		this.bigRightColorIcons.push(new ColorIcon(5, TYPE_ICON_RIGHT, '#FFFF00', 178, 178)); // yellow
	}
	var ColorIcon = function(index, type, hex, width, height) {
		this.index 		= index;
		this.type 		= type;
		this.hex 		= hex;
		this.width 		= width;
		this.height 	= height;
		this.centerX 	= 0;
		this.centerY 	= 0;
		this.alpha 		= 1.0;
		this.factor 	= type == TYPE_ICON_LEFT ? 1.0 : 0.0;
		this.isStart 	= false;
		this.isOverlay 	= false;
		this.rotateRad 	= 0;
		this.isHovered 	= false;
	};
	ColorIcon.prototype = {
		copyImage: function(colorIcon) {
			this.hex = colorIcon.hex;
			this.width = colorIcon.width;
			this.height = colorIcon.height;
		},
		updateRotateRad: function(tick) {
			if (tick > 160) {
				return;
			} 
			else if (tick > 140) {
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					Math.PI * 2 * 2 / 360 :
					-Math.PI * 2 * 2 / 360;
			}
			else if (tick > 120) {			
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					-Math.PI * 2 * 4 / 360 :
					Math.PI * 2 * 4 / 360;
			}
			else if (tick > 100) {
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					Math.PI * 2 * 2 / 360 :
					-Math.PI * 2 * 2 / 360;
			}	
		},
		setHover: function(isHover) {
			if (!this.isHovered && isHover) {
				this.isHovered = isHover;
				this.alpha = 1.0;
			}
			else if (this.isHovered && !isHover) {
				this.isHovered = isHover;
				this.alpha = 0.8;
			}
		},
		render: function(context, centerX, centerY) {
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
			context.fillStyle = this.hex;
			context.fill();
				
			context.restore();
		}		
	};
	
	var Icon = function(index, type, image, coords) {
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
		this.alpha 		= 1.0;
		this.factor 	= type == TYPE_ICON_LEFT ? 1.0 : 0.0;
		this.isStart 	= false;
		this.isOverlay 	= false;
		this.rotateRad 	= 0;
		this.isHovered 	= false;
	};
	Icon.prototype = {
		copyImage: function(icon) {
			this.image = icon.image;
			this.clipX = icon.clipX;
			this.clipY = icon.clipY;
			this.width = icon.width;
			this.height = icon.height;
		},
		updateRotateRad: function(tick) {
			if (tick > 160) {
				return;
			} 
			else if (tick > 140) {
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					Math.PI * 2 * 2 / 360 :
					-Math.PI * 2 * 2 / 360;
			}
			else if (tick > 120) {			
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					-Math.PI * 2 * 4 / 360 :
					Math.PI * 2 * 4 / 360;
			}
			else if (tick > 100) {
				this.rotateRad += (this.type == TYPE_ICON_LEFT) ?
					Math.PI * 2 * 2 / 360 :
					-Math.PI * 2 * 2 / 360;
			}	
		},
		setHover: function(isHover) {
			if (!this.isHovered && isHover) {
				this.isHovered = isHover;
				this.alpha = 1.0;
			}
			else if (this.isHovered && !isHover) {
				this.isHovered = isHover;
				this.alpha = 0.8;
			}
		},
		render: function(context, centerX, centerY) {
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
				this.clipX, this.clipY, 
				this.width, this.height, 
				centerX - this.width / 2, centerY - this.height / 2, 
				this.width, this.height
			);
			
			if (this.isOverlay) {
				context.globalAlpha = (1.0 - this.alpha) / 2;
				context.fillStyle = '#777';
				context.fill();
			}
			context.restore();
		}
	};
};
