var XMing = XMing || {};

XMing.VennsColor = new function() {
	// declare the variables
	var	requestID			= null,
		canvas 				= null,
		context 			= null,
		smallLeftIcons		= [],
		smallRightIcons 	= [],
		bigLeftIcons 		= [],
		bigRightIcons	 	= [],
		bigDefaultLeftIcon  = null,
		bigDefaultRightIcon = null,
		selectedLeftIcon 	= null,
		selectedRightIcon 	= null,
		leftAngle			= 0.0;
		rightAngle			= 0.0;
		requireCenterRender	= false,
		selectedAnimation   = null,
		bigLeftIconCenterX 	= 150,
		bigRightIconCenterX = 450,
		factorDistLeftIcon	= 1.0,
		factorDistRightIcon	= 1.0,
		tickRotate			= 0,
		tickLeftIcon		= 0,
		tickRightIcon		= 0,
		iconIndexRotate		= 0,
		animEvents			= { 
								'bigLeftIconSelected'   : { isEnd : false },
								'bigRightIconSelected'  : { isEnd : false },
								'rightIconExpand'		: { isEnd : false }
							  },
		smallestLeftIconFactor 		= 1.0,
		biggestLeftIconFactor		= 0.0,
		smallestRightIconFactor		= 1.0,
		biggestRightIconFactor		= 0.0;
		
	// declare constants
	var BIG_LEFT_ICON_CENTER_X_FINAL	= 264,
		BIG_RIGHT_ICON_CENTER_X_FINAL	= 336,
		BIG_LEFT_ICON_CENTER_Y 			= 109,
		BIG_RIGHT_ICON_CENTER_Y 		= 109,
		CENTER_X_FINAL					= 300,
		CENTER_Y_FINAL					= 109,
		BIG_ICON_RADIUS 				= 89,
		SMALL_ICON_DIST					= 122,
		TYPE_ICON_LEFT 					= 'left',
		TYPE_ICON_RIGHT 				= 'right',
		COLOR_MAPPING			= [ [0, 1, 2], [2, 3, 5], [5, 4, 0] ],
		LEFT_ICONS_TEXT_MAPPED 	= ['Yellow', 'Cyan', 'Magenta'],
		RIGHT_ICONS_INFO_MAPPED	= [
									// 0: green
									// 1: red
									// 2: blue
									// 3: black
									[
										{ index: 0, text: 'Cyan', animIndex: 0},
										{ index: 1, text: 'Blue', animIndex: 3},
										{ index: 2, text: 'Magenta', animIndex: 1}
									],
									[
										{},
										{},
										{ index: 2, text: 'Magenta', animIndex: 2},
										{ index: 3, text: 'Red', animIndex: 3},
										{},
										{ index: 5, text: 'Yellow', animIndex: 0}
									],
									[
										{ index: 0, text: 'Cyan', animIndex: 2},
										{},
										{},
										{},
										{ index: 4, text: 'Green', animIndex: 3},
										{ index: 5, text: 'Yellow', animIndex: 1}								
									]
								  ];
	
	// init method
	this.initialize = function() {
		canvas = document.getElementById("canvas-color");
		context = canvas.getContext('2d');
		
		XMing.SpriteManager.init();
		XMing.AnimationManager.init();
		smallLeftIcons		= XMing.SpriteManager.smallLeftColorIcons;
		smallRightIcons 	= XMing.SpriteManager.smallRightColorIcons;
		bigLeftIcons 		= XMing.SpriteManager.bigLeftColorIcons;
		bigRightIcons	 	= XMing.SpriteManager.bigRightColorIcons;
		bigDefaultLeftIcon  = XMing.SpriteManager.bigDefaultLeftColorIcon;
		bigDefaultRightIcon = XMing.SpriteManager.bigDefaultRightColorIcon;
		leftAngle 			= 90.0 / (smallLeftIcons.length - 1);
		rightAngle			= 90.0 / (smallRightIcons.length - 1);
		
		canvas.addEventListener("mousemove", onMouseMove, false);
		canvas.addEventListener("click", onClick, false);
		
		this.update();
	},
	// reset 
	this.reset = function() {
		cancelAnimationFrame(requestID);
		
		canvas 				= null,
		context 			= null,
		smallLeftIcons		= [],
		smallRightIcons 	= [],
		bigLeftIcons 		= [],
		bigRightIcons	 	= [],
		bigDefaultLeftIcon  = null,
		bigDefaultRightIcon = null,
		selectedLeftIcon 	= null;
		selectedRightIcon 	= null,
		requireCenterRender	= false,
		selectedAnimation   = null,
		bigLeftIconCenterX 	= 150,
		bigRightIconCenterX = 450,
		factorDistLeftIcon	= 1.0,
		factorDistRightIcon	= 1.0,
		tickRotate			= 0,
		tickLeftIcon		= 0,
		tickRightIcon		= 0,
		iconIndexRotate 	= 0;
		animEvents			= { 
								'bigLeftIconSelected'  	: { isStart: false, isEnd : false },
								'bigRightIconSelected'  : { isEnd : false },
								'rightIconExpand'		: { isStart: false, isEnd : false }
							  };
		XMing.SpriteManager.reset();
		XMing.AnimationManager.reset();
		XMing.VennsColor.initialize();
	},		
	// The main loop where everything happens
	this.update = function() {
		requestID = requestAnimFrame(this.update.bind(this));
		this.draw();
	},
	// tween utils
	this.tween = function(prop, changeValue, endValue) {
		if ((changeValue < 0 && prop + changeValue > endValue)
			|| (changeValue > 0 && prop + changeValue < endValue)) {
			prop += changeValue;
		}
		else {
			prop = endValue;
		}
		
		return prop;
	},
	// draw method
	this.draw = function() {
		tickRotate++;
		
		this.rotateSmallIcon();

		context.clearRect(0, 0, canvas.width, canvas.height);
		
		if (selectedLeftIcon) {
			// set Text based on selectedLeftIcon
			context.font = '14px Arial';
			context.textAlign = 'center';
			context.fillText(
				LEFT_ICONS_TEXT_MAPPED[selectedLeftIcon.index], 
				bigLeftIconCenterX - 8, 
				BIG_LEFT_ICON_CENTER_Y - BIG_ICON_RADIUS - 4
			);
			
			if (!selectedRightIcon) {			
				// set bigDefaultLeftIcon image based on selected left choice 
				if (!animEvents['bigLeftIconSelected'].isStart) {
					bigDefaultLeftIcon.alpha = 0.1;
					bigDefaultLeftIcon.copyImage(bigLeftIcons[selectedLeftIcon.index]);
										
					// set the right colors based on selected left choice
					colorIndexArray = COLOR_MAPPING[selectedLeftIcon.index];
					var tmpArray = [];
					for (var i = 0; i < colorIndexArray.length; i++) { 
						tmpArray.push(smallRightIcons[colorIndexArray[i]]);									
					}
					smallRightIcons = tmpArray;					
					rightAngle = 90.0 / (tmpArray.length - 1);
				} 
				// still animating left selection
				if (!animEvents['bigLeftIconSelected'].isEnd) {
					// set event 
					animEvents['bigLeftIconSelected'].isStart = true;
					
					// animate bigDefaultLeftIcon opacity
					bigDefaultLeftIcon.alpha = this.tween(bigDefaultLeftIcon.alpha, 0.02, 1.0)

					// set event bigLeftIconSelected end
					if (biggestLeftIconFactor <= 0 && bigDefaultLeftIcon.alpha == 1.0) {
						animEvents['bigLeftIconSelected'].isEnd = true;
					}
				}
				// pause a while
				else if (tickLeftIcon < 5) {
					tickLeftIcon++;
				}
				// animation of left selection finished
				else if (!animEvents['rightIconExpand'].isEnd) {
					//set event
					animEvents['rightIconExpand'].isStart = true;
					
					// change the opacity of bigDefaultLeftIcon
					bigDefaultLeftIcon.isOverlay = true;
					bigDefaultLeftIcon.alpha = this.tween(bigDefaultLeftIcon.alpha, -0.02, 0.5);
					
					// set event rightIconExpand end
					if (smallestRightIconFactor >= 1 && bigDefaultLeftIcon.alpha == 0.5) {
						animEvents['rightIconExpand'].isEnd = true;
					}
				}
			}
		}
		if (selectedRightIcon) {
			var info = RIGHT_ICONS_INFO_MAPPED[selectedLeftIcon.index][selectedRightIcon.index];
			
			// set Text based on selectedRightIcon
			context.font = '14px Arial';
			context.textAlign = 'center';
			context.fillText(
				info.text, 
				bigRightIconCenterX + 8, 
				BIG_RIGHT_ICON_CENTER_Y - BIG_ICON_RADIUS - 4
			);		
			
			// set selected Animation based on the combination of the selected left and right choices
			if (!selectedAnimation) {
				var animIndex = info.animIndex;
				selectedAnimation = XMing.AnimationManager.getColorAnimation(animIndex);
			}
					
			// set bigDefaultRightIcon image based on selected right choice
			if (!animEvents['bigRightIconSelected'].isStart) {
				bigDefaultRightIcon.alpha = 0.1;
				var index = info.index;
				bigDefaultRightIcon.copyImage(bigRightIcons[index]);
			} 
			// still animating right selection
			if (!animEvents['bigRightIconSelected'].isEnd) {
				// set event 
				animEvents['bigRightIconSelected'].isStart = true;
				
				// animate bigDefaultRightIcon opacity
				bigDefaultRightIcon.alpha = this.tween(bigDefaultRightIcon.alpha, 0.02, 1.0);
				
				// set event bigRightIconSelected end
				if (biggestRightIconFactor <= 0 && bigDefaultRightIcon.alpha == 1.0) {
					animEvents['bigRightIconSelected'].isEnd = true;
				}
			}
			// pause a while
			else if (tickRightIcon < 10) {
				tickRightIcon++;
			}	
			// finish animation of right selection
			// start animate BigIcons to center
			else {
				requireCenterRender = true;
				var speed = 7;
				
				// animate bigLeftIcon to center of the canvas				
				if (bigLeftIconCenterX > BIG_LEFT_ICON_CENTER_X_FINAL + speed) {
					bigLeftIconCenterX = BIG_LEFT_ICON_CENTER_X_FINAL + speed;
				} 
				else if (bigLeftIconCenterX == BIG_LEFT_ICON_CENTER_X_FINAL + speed) {
					bigLeftIconCenterX = BIG_LEFT_ICON_CENTER_X_FINAL;
				}
				else if (bigLeftIconCenterX != BIG_LEFT_ICON_CENTER_X_FINAL) {
					bigLeftIconCenterX += speed;
				}
			
				// animate bigRightIcon to center of the canvas					
				if (bigRightIconCenterX < BIG_RIGHT_ICON_CENTER_X_FINAL - speed) {
					bigRightIconCenterX = BIG_RIGHT_ICON_CENTER_X_FINAL - speed;
				} 
				else if (bigRightIconCenterX == BIG_RIGHT_ICON_CENTER_X_FINAL - speed) {
					bigRightIconCenterX = BIG_RIGHT_ICON_CENTER_X_FINAL;
				}
				else if (bigRightIconCenterX != BIG_RIGHT_ICON_CENTER_X_FINAL) {
					bigRightIconCenterX -= speed;
				}
				
				// big icons finish animating to center of the canvas
				if (bigLeftIconCenterX == BIG_LEFT_ICON_CENTER_X_FINAL &&
					bigRightIconCenterX == BIG_RIGHT_ICON_CENTER_X_FINAL) {
					
					// change the opacity of the bigDefaultRightIcon
					bigDefaultRightIcon.isOverlay = true;
					bigDefaultRightIcon.alpha = this.tween(bigDefaultRightIcon.alpha, -0.01, 0.5);
					
					// start center animation
					selectedAnimation.start();
					if (selectedAnimation.alpha + 0.5 < 1.0) {
						selectedAnimation.alpha += 0.5;						
					}
					else {
						selectedAnimation.alpha = 1.0;
						requireCenterRender = false;
					}
				}
			}	
		}
		
		// render smallLeftIcons
		biggestLeftIconFactor = smallLeftIcons[0].factor;
		smallestLeftIconFactor = smallLeftIcons[0].factor;
		for (var i = 0; i < smallLeftIcons.length; i++) {		
			var icon = smallLeftIcons[i];
			
			if (icon.factor > biggestLeftIconFactor) {
				biggestLeftIconFactor = icon.factor;
			}
			if (icon.factor < smallestLeftIconFactor) {
				smallestLeftIconFactor = icon.factor;
			}
			
			if (animEvents['bigLeftIconSelected'].isStart
				&& !animEvents['bigLeftIconSelected'].isEnd) {
				if (i == 0) {
					icon.isStart = true;
				}
				if (icon.isStart) {
					icon.factor = this.tween(icon.factor, -5 / 60, 0.0);
					icon.alpha = this.tween(icon.alpha, -10 / 60, 0);
					if (icon.factor <= 0.6 && i < smallLeftIcons.length - 1) {
						var iconNext = smallLeftIcons[i + 1];
						iconNext.isStart = true;
					}
				}
			}	
			
			icon.render(
				context,
				bigLeftIconCenterX - Math.cos((45.0 - i * leftAngle) / 180.0 * Math.PI) * SMALL_ICON_DIST * icon.factor, 
				BIG_LEFT_ICON_CENTER_Y - Math.sin((45.0 - i * leftAngle) / 180.0 * Math.PI) * SMALL_ICON_DIST * icon.factor
			);
		}
		
		// render smallRightIcons
		biggestRightIconFactor = smallRightIcons[0].factor;
		smallestRightIconFactor = smallRightIcons[0].factor;
		for (var i = 0; i < smallRightIcons.length; i++) {
			var icon = smallRightIcons[i];
			
			if (icon.factor > biggestRightIconFactor) {
				biggestRightIconFactor = icon.factor;
			}
			if (icon.factor < smallestRightIconFactor) {
				smallestRightIconFactor = icon.factor;
			}
			
			if (animEvents['rightIconExpand'].isStart
				&& !animEvents['rightIconExpand'].isEnd) {
				if (i == 0) {
					icon.isStart = true;
				}
				if (icon.isStart) {					
					icon.factor = this.tween(icon.factor, 5 / 60, 1.0);
					icon.alpha = this.tween(icon.alpha, 10 / 60, 0.8);
					if (icon.factor >= 0.4 && i < smallRightIcons.length - 1) {
						var iconNext = smallRightIcons[i + 1];
						iconNext.isStart = true;
					}
					if (icon.factor == 1.0 && icon.alpha == 0.8) {
						icon.isStart = false;
					}	
				}
			}	
			
			if (animEvents['bigRightIconSelected'].isStart
				&& !animEvents['bigRightIconSelected'].isEnd) {
				if (i == 0) {
					icon.isStart = true;
				}
				if (icon.isStart) {
					icon.factor = this.tween(icon.factor, -5 / 60, 0.0);
					icon.alpha = this.tween(icon.alpha, -10 / 60, 0);
					if (icon.factor <= 0.6 && i < smallRightIcons.length - 1) {
						var iconNext = smallRightIcons[i + 1];
						iconNext.isStart = true;
					}
				}
			}	

			icon.render(
				context,
				bigRightIconCenterX + Math.cos((45.0 - i * rightAngle) / 180.0 * Math.PI) * SMALL_ICON_DIST * icon.factor,
				BIG_RIGHT_ICON_CENTER_Y - Math.sin((45.0 - i * rightAngle) / 180.0 * Math.PI) * SMALL_ICON_DIST * icon.factor
			);
		}
		
		// render bigDefaultLeftIcon and bigDefaultRightIcon
		bigDefaultLeftIcon.render(context,bigLeftIconCenterX, BIG_LEFT_ICON_CENTER_Y);
		bigDefaultRightIcon.render(context,bigRightIconCenterX, BIG_RIGHT_ICON_CENTER_Y);
		
		// render center
		if (requireCenterRender) {
			this.renderOverlappedCenter(bigLeftIconCenterX, bigRightIconCenterX);
		}
		
		// render selectedAnimation
		if (selectedAnimation && selectedAnimation.isStarted) {
			selectedAnimation.render(context);
		}
	},
	// render overlapped area when two BigDefaultIcons move to center
	this.renderOverlappedCenter = function(leftCenterX, rightCenterX) {
		context.save();
		context.globalAlpha = 1.0;
		context.beginPath();
		
		var distX = (rightCenterX - leftCenterX) / 2;
		var radian = Math.acos(distX / BIG_ICON_RADIUS);
		
		context.arc(leftCenterX, BIG_LEFT_ICON_CENTER_Y, BIG_ICON_RADIUS, 
			-1 * radian, radian, false);
		context.arc(rightCenterX, BIG_RIGHT_ICON_CENTER_Y, BIG_ICON_RADIUS, 
			Math.PI - radian, Math.PI + radian, false);
		context.closePath();
		context.clip();
		
		if (leftCenterX == CENTER_X_FINAL) {
			context.fillStyle = '#fff';
		} 
		else {
			context.fillStyle = '#fff';
		}
		//context.fill();
		context.restore();
	},
	// rotate small icon periodically
	this.rotateSmallIcon = function() {			
		if (tickRotate > 160) {
			if (!selectedLeftIcon) {
				smallLeftIcons[iconIndexRotate].rotateRad = 0;	
				iconIndexRotate = (iconIndexRotate + 1) % smallLeftIcons.length;
			} 
			else if (!selectedRightIcon) {
				smallRightIcons[iconIndexRotate].rotateRad = 0;
				iconIndexRotate = (iconIndexRotate + 1) % smallRightIcons.length;
			}

			tickRotate = 0;
		} 
		else {
			if (!selectedLeftIcon) {
				smallLeftIcons[iconIndexRotate].updateRotateRad(tickRotate);
			}
			else if (!selectedRightIcon) {
				smallRightIcons[iconIndexRotate].updateRotateRad(tickRotate);
			}
		}
	}
		
	function onMouseMove(event) {
		var mousePos = getMousePos(this, event);
		
		var icons = smallLeftIcons.concat(smallRightIcons);
		
		var isHover = false;
		for (var i = 0; i < icons.length; i++) {
			
			var icon = icons[i];
			if ((icon.type == TYPE_ICON_LEFT && !selectedLeftIcon)
				|| (icon.type == TYPE_ICON_RIGHT && selectedLeftIcon && !selectedRightIcon))
			{
				var startX = icon.centerX - icon.width / 2;
				var endX = icon.centerX + icon.width / 2;
				var startY = icon.centerY - icon.height / 2;
				var endY = icon.centerY + icon.height / 2;
				
				if (mousePos.x >= startX 
					&& mousePos.x <= endX
					&& mousePos.y >= startY 
					&& mousePos.y <= endY) {
					icon.setHover(true);
					isHover = true;
				} 
				else {
					icon.setHover(false);
				}
			}
		}
		canvas.style.cursor = isHover ? 'pointer' : 'auto';
	}
	
	function onClick(event) {
		var mousePos = getMousePos(this, event);

		var icons = smallLeftIcons.concat(smallRightIcons);
		for (var i = 0; i < icons.length; i++) {
			var icon = icons[i];
			
			if ((icon.type == TYPE_ICON_LEFT && !selectedLeftIcon)
				|| (icon.type == TYPE_ICON_RIGHT && selectedLeftIcon && !selectedRightIcon))
			{
				var startX = icon.centerX - icon.width / 2;
				var endX = icon.centerX + icon.width / 2;
				var startY = icon.centerY - icon.height / 2;
				var endY = icon.centerY + icon.height / 2;

				if (mousePos.x >= startX && mousePos.x <= endX
					&& mousePos.y >= startY && mousePos.y <= endY) {
					if (icon.type == TYPE_ICON_LEFT) {
						selectedLeftIcon = icon;
						iconIndexRotate = 0;
					} 
					else if (icon.type == TYPE_ICON_RIGHT) {
						selectedRightIcon = icon;			
					}
				}
			}
		}
	}
	
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	}
}