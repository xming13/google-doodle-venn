var XMing = XMing || {};

XMing.VennsGoogle = new function() {
	// declare the variables
	var	requestID					= null,
		canvas 						= null,
		context 					= null,
		spriteManager				= null,
		animationManager			= null,
		smallLeftIcons				= [],
		smallRightIcons 			= [],
		bigLeftIcons 				= [],
		bigRightIcons	 			= [],
		bigDefaultLeftIcon  		= null,
		bigDefaultRightIcon 		= null,
		resetIcon					= null,
		ribbonLeftIcon				= null,
		ribbonRightIcon				= null,
		leftAngle 					= 0.0,
		rightAngle					= 0.0,
		selectedLeftIcon 			= null,
		selectedRightIcon 			= null,
		requireCenterRender			= true,
		selectedAnimation   		= null,
		endAnimation				= null,
		bigLeftIconCenterX 			= 0,
		bigRightIconCenterX 		= 0,
		factorDistLeftIcon			= 1.0,
		factorDistRightIcon			= 1.0,
		tickRotate					= 0,
		tickLeftIcon				= 0,
		tickRightIcon				= 0,
		iconIndexRotate				= 0,
		smallestLeftIconFactor 		= 0.0,
		biggestLeftIconFactor		= 0.0,
		smallestRightIconFactor		= 1.0,
		biggestRightIconFactor		= 0.0,
		animEvents					= { 
										'startScreen'			: { isEnd : false },
										'startingAnimation'		: { isEnd : false },
										'leftIconExpand'		: { isStart : false, isEnd : false },
										'bigLeftIconSelected'   : { isStart : false, isEnd : false },
										'bigRightIconSelected'  : { isStart : false, isEnd : false },
										'rightIconExpand'		: { isStart : false, isEnd : false }
									  };
		
	// declare constants
	var BIG_LEFT_ICON_CENTER_X_INITIAL 	= 175,
		BIG_RIGHT_ICON_CENTER_X_INITIAL	= 445,
		BIG_LEFT_ICON_CENTER_X_FINAL	= 275,
		BIG_RIGHT_ICON_CENTER_X_FINAL	= 348,
		BIG_LEFT_ICON_CENTER_Y 			= 110,
		BIG_RIGHT_ICON_CENTER_Y 		= 110,
		CENTER_X						= 310,
		CENTER_Y						= 110,
		BIG_ICON_RADIUS 				= 89,
		SMALL_ICON_DIST					= 122,
		LEFT_ICONS_MAPPING 	= ['Mammals', 'Musical', 'Transport', 'Vegetation', 'Sea Life'],
		RIGHT_ICONS_MAPPING	= [
								[
									{ index: 0, text: 'Tiny', animIndex: 3},
									{ index: 1, text: 'Has Wings', animIndex: 0},
									{ index: 4, text: 'Thrives in Cold', animIndex: 4},
									{ index: 7, text: 'Has a Shell', animIndex: 2},
									{ index: 9, text: 'Mythical', animIndex: 1}
								],
								[
									{ index: 0, text: 'Tiny', animIndex: 8},
									{ index: 1, text: 'Has Wings', animIndex: 9},
									{ index: 4, text: 'Thrives in Cold', animIndex: 6}, 
									{ index: 5, text: 'Spiral-Shaped', animIndex: 7},
									{ index: 8, text: 'In Space', animIndex: 5}
								],
								[
									{ index: 0, text: 'Tiny', animIndex: 18},
									{ index: 1, text: 'Has Wings', animIndex: 15},
									{ index: 4, text: 'Thrives in Cold', animIndex: 17},
									{ index: 6, text: 'Leaves a Trail', animIndex: 16},
									{ index: 8, text: 'In Space', animIndex: 19}
								],
								[
									{ index: 0, text: 'Tiny', animIndex: 22},
									{ index: 2, text: 'Can Fly', animIndex: 23},
									{ index: 3, text: 'Cone-Shaped', animIndex: 21},
									{ index: 7, text: 'Has a Shell', animIndex: 20},
									{ index: 9, text: 'Mythical', animIndex: 24}
								],
								[
									{ index: 0, text: 'Tiny', animIndex: 14},
									{ index: 1, text: 'Has Wings', animIndex: 10},
									{ index: 4, text: 'Thrives in Cold', animIndex: 12},
									{ index: 7, text: 'Has a Shell', animIndex: 13},
									{ index: 9, text: 'Mythical', animIndex: 11}
								],
							  ];
	
	// init method
	this.initialize = function() {
		canvas = document.getElementById('canvas-google');
		context = canvas.getContext('2d');
		
		spriteManager = new XMing.GoogleSpriteManager();
		spriteManager.init();
		animationManager = new XMing.GoogleAnimationManager();
		animationManager.init();
		
		smallLeftIcons		= spriteManager.smallLeftIcons;
		smallRightIcons 	= spriteManager.smallRightIcons;
		bigLeftIcons 		= spriteManager.bigLeftIcons;
		bigRightIcons	 	= spriteManager.bigRightIcons;
		bigDefaultLeftIcon  = spriteManager.bigDefaultLeftIcon;
		bigDefaultRightIcon = spriteManager.bigDefaultRightIcon;
		resetIcon			= spriteManager.resetIcon;
		ribbonLeftIcon		= spriteManager.ribbonLeftIcon;
		ribbonRightIcon		= spriteManager.ribbonRightIcon;
		bigLeftIconCenterX 	= BIG_LEFT_ICON_CENTER_X_FINAL;
		bigRightIconCenterX = BIG_RIGHT_ICON_CENTER_X_FINAL;
		leftAngle 			= 90.0 / (smallLeftIcons.length - 1);
		rightAngle			= 90.0 / (smallRightIcons.length - 1);
		
		canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		canvas.addEventListener('click', this.onClick.bind(this), false);	
		
		this.update();
	},
	// reset 
	this.reset = function() {
		cancelAnimationFrame(requestID);
		
		canvas 						= null;
		context 					= null;
		spriteManager 				= null;
		animationManager			= null;
		smallLeftIcons				= [];
		smallRightIcons 			= [];
		bigLeftIcons 				= [];
		bigRightIcons	 			= [];
		bigDefaultLeftIcon  		= null;
		bigDefaultRightIcon 		= null;
		resetIcon					= null;
		ribbonLeftIcon				= null;
		ribbonRightIcon				= null;
		leftAngle 					= 0.0;
		rightAngle					= 0.0;
		selectedLeftIcon 			= null;
		selectedRightIcon 			= null;
		requireCenterRender			= true;
		selectedAnimation   		= null;
		endAnimation				= null;
		bigLeftIconCenterX 			= 0;
		bigRightIconCenterX 		= 0;
		factorDistLeftIcon			= 1.0;
		factorDistRightIcon			= 1.0;
		tickRotate					= 0;
		tickLeftIcon				= 0;
		tickRightIcon				= 0;
		iconIndexRotate				= 0;
		smallestLeftIconFactor 		= 0.0;
		biggestLeftIconFactor		= 0.0;
		smallestRightIconFactor		= 1.0;
		biggestRightIconFactor		= 0.0;
		animEvents					= { 
										'startScreen'			: { isEnd : false },
										'startingAnimation'		: { isEnd : false },
										'leftIconExpand'		: { isStart : false, isEnd : false },
										'bigLeftIconSelected'   : { isStart : false, isEnd : false },
										'bigRightIconSelected'  : { isStart : false, isEnd : false },
										'rightIconExpand'		: { isStart : false, isEnd : false }
									  };
		
		this.initialize();
		
		// start animation
		animEvents['startScreen'].isEnd = true;
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
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		// after center start is clicked
		if (animEvents['startScreen'].isEnd &&
			!animEvents['startingAnimation'].isEnd) {
			// animate big icons to left and right respectively
			bigLeftIconCenterX = this.tween(bigLeftIconCenterX, -4, BIG_LEFT_ICON_CENTER_X_INITIAL);
			bigRightIconCenterX = this.tween(bigRightIconCenterX, 4, BIG_RIGHT_ICON_CENTER_X_INITIAL);
		
			tickRotate++;
			bigDefaultLeftIcon.rotateRebounce(tickRotate);
			bigDefaultRightIcon.rotateRebounce(tickRotate);
					
			if (bigLeftIconCenterX == BIG_LEFT_ICON_CENTER_X_INITIAL 
				&& bigRightIconCenterX == BIG_RIGHT_ICON_CENTER_X_INITIAL
				&& tickRotate > 45) {
				tickRotate = 0;
				animEvents['startingAnimation'].isEnd = true;
			}
		}
		else if (animEvents['startingAnimation'].isEnd) {
			if (!animEvents['leftIconExpand'].isEnd) {
				//set event
				animEvents['leftIconExpand'].isStart = true;
				
				bigDefaultLeftIcon.alpha = 1.0;
				bigDefaultRightIcon.alpha = this.tween(bigDefaultRightIcon.alpha, -0.01, 0.5);
						
				// set event leftIconExpand end
				if (smallestLeftIconFactor >= 1 && bigDefaultRightIcon.alpha <= 0.5) {
					animEvents['leftIconExpand'].isEnd = true;
				}
			}
			else {
				// rotate small icon periodically
				tickRotate++;
				this.rotateSmallIcon();
			}
			if (selectedLeftIcon) {
				// set Text based on selectedLeftIcon
				context.save();
				context.font = '14px Open Sans';
				context.textAlign = 'center';
				context.fillStyle = '#1B1B1B';
				context.fillText(
					LEFT_ICONS_MAPPING[selectedLeftIcon.index], 
					bigLeftIconCenterX - 8, 
					BIG_LEFT_ICON_CENTER_Y - BIG_ICON_RADIUS - 4
				);
				context.restore();
				
				if (!selectedRightIcon) {
					// set bigDefaultLeftIcon image based on selected left choice 
					if (!animEvents['bigLeftIconSelected'].isStart) {
						bigDefaultLeftIcon.alpha = 0.1;
						bigDefaultLeftIcon.copyImage(bigLeftIcons[selectedLeftIcon.index]);
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
						bigDefaultLeftIcon.alpha = this.tween(bigDefaultLeftIcon.alpha, -0.01, 0.75);
						
						// change the opacity of bigDefaultRightIcon
						bigDefaultRightIcon.isOverlay = false;
						bigDefaultRightIcon.alpha = 1.0;
						
						// set event rightIconExpand end
						if (smallestRightIconFactor >= 1 && bigDefaultLeftIcon.alpha == 0.75) {
							animEvents['rightIconExpand'].isEnd = true;
						}
					}
				}
			}
			if (selectedRightIcon) {		
				// set Text based on selectedRightIcon
				context.save();
				context.font = '14px Open Sans';
				context.textAlign = 'center';
				context.fillStyle = '#1B1B1B';
				context.fillText(
					RIGHT_ICONS_MAPPING[selectedLeftIcon.index][selectedRightIcon.index].text, 
					bigRightIconCenterX + 8, 
					BIG_RIGHT_ICON_CENTER_Y - BIG_ICON_RADIUS - 4
				);
				context.restore();
				
				// set selected Animation based on the combination of the selected left and right choices
				if (!selectedAnimation) {
					var animIndex = RIGHT_ICONS_MAPPING[selectedLeftIcon.index][selectedRightIcon.index].animIndex;
					selectedAnimation = animationManager.getAnimation(animIndex);
				}
						
				// set bigDefaultRightIcon image based on selected right choice
				if (!animEvents['bigRightIconSelected'].isStart) {
					bigDefaultRightIcon.alpha = 0.1;
					var index = RIGHT_ICONS_MAPPING[selectedLeftIcon.index][selectedRightIcon.index].index;
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
					
					// animate bigLeftIcon to center of the canvas with bouncing			
					if (bigLeftIconCenterX > BIG_LEFT_ICON_CENTER_X_FINAL + speed) {
						bigLeftIconCenterX = BIG_LEFT_ICON_CENTER_X_FINAL + speed;
					} 
					else if (bigLeftIconCenterX == BIG_LEFT_ICON_CENTER_X_FINAL + speed) {
						bigLeftIconCenterX = BIG_LEFT_ICON_CENTER_X_FINAL;
					}
					else if (bigLeftIconCenterX != BIG_LEFT_ICON_CENTER_X_FINAL) {
						bigLeftIconCenterX += speed;
					}
				
					// animate bigRightIcon to center of the canvas	with bouncing				
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
						bigDefaultRightIcon.alpha = this.tween(bigDefaultRightIcon.alpha, -0.01, 0.75);
						
						// start center animation
						if (selectedAnimation.alpha + 0.01 < 1.0) {
							selectedAnimation.alpha += 0.01;
							selectedAnimation.start();
						}
						else {
							selectedAnimation.alpha = 1.0;
							requireCenterRender = false;
						}
						
						if (selectedAnimation.isFinished) {
							endAnimation = animationManager.getEndAnimation();
							endAnimation.start(118, 85, 4);
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
				
				if (animEvents['leftIconExpand'].isStart
					&& !animEvents['leftIconExpand'].isEnd) {
					if (i == 0) {
						icon.isStart = true;
					}
					if (icon.isStart) {					
						icon.factor = this.tween(icon.factor, 5 / 60, 1.0);
						icon.alpha = this.tween(icon.alpha, 10 / 60, 0.8);
						if (icon.factor >= 0.4 && i < smallLeftIcons.length - 1) {
							var iconNext = smallLeftIcons[i + 1];
							iconNext.isStart = true;
						}
						if (icon.factor == 1.0 && icon.alpha == 0.8) {
							icon.isStart = false;
						}	
					}
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
		}
		
		// render bigDefaultLeftIcon and bigDefaultRightIcon
		bigDefaultLeftIcon.render(context, bigLeftIconCenterX, BIG_LEFT_ICON_CENTER_Y);
		bigDefaultRightIcon.render(context, bigRightIconCenterX, BIG_RIGHT_ICON_CENTER_Y);
		
		// render center
		if (requireCenterRender) {
			this.renderOverlappedCenter(bigLeftIconCenterX, bigRightIconCenterX);
		}
		
		// render selectedAnimation
		if (selectedAnimation && selectedAnimation.isStarted) {
			selectedAnimation.render(context);
		}
		
		// render endAnimation and resetIcon
		if (endAnimation && endAnimation.isStarted) {
			endAnimation.renderEnd(context);
			resetIcon.isStart = true;
			resetIcon.render(context, 558, CENTER_Y);
			animationManager.renderRibbon(context);
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
		context.fillStyle = '#939393';
		context.fill();
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
	},
	// handle mouse move event
	this.onMouseMove = function(event) {
		var mousePos = this.getMousePos(event);
		
		var isHover = false;
		if (!animEvents['startScreen'].isEnd 
			&& mousePos.x >= BIG_LEFT_ICON_CENTER_X_FINAL 
			&& mousePos.x <= BIG_RIGHT_ICON_CENTER_X_FINAL
			&& mousePos.y >= CENTER_Y - BIG_ICON_RADIUS
			&& mousePos.y <= CENTER_Y + BIG_ICON_RADIUS) {
			isHover = true;
		}
		
		var icons = smallLeftIcons.concat(smallRightIcons).concat(resetIcon);	
		for (var i = 0; i < icons.length; i++) {
			
			var icon = icons[i];
			if ((icon.isTypeLeft() && !selectedLeftIcon)
				|| (icon.isTypeRight() && selectedLeftIcon && !selectedRightIcon && animEvents['rightIconExpand'].isEnd)
				|| icon.isTypeReset())
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
	},
	// handle click event
	this.onClick = function(event) {
		var mousePos = this.getMousePos(event);

		if (!animEvents['startScreen'].isEnd 
			&& mousePos.x >= BIG_LEFT_ICON_CENTER_X_FINAL 
			&& mousePos.y <= BIG_RIGHT_ICON_CENTER_X_FINAL) {
			animEvents['startScreen'].isEnd = true;
		}
		var icons = smallLeftIcons.concat(smallRightIcons).concat(resetIcon);
		for (var i = 0; i < icons.length; i++) {
			var icon = icons[i];
			
			if ((icon.isTypeLeft() && !selectedLeftIcon)
				|| (icon.isTypeRight() && selectedLeftIcon && !selectedRightIcon)
				|| icon.isTypeReset())
			{
				var startX = icon.centerX - icon.width / 2;
				var endX = icon.centerX + icon.width / 2;
				var startY = icon.centerY - icon.height / 2;
				var endY = icon.centerY + icon.height / 2;

				if (mousePos.x >= startX && mousePos.x <= endX
					&& mousePos.y >= startY && mousePos.y <= endY) {
					if (icon.isTypeLeft()) {
						selectedLeftIcon = icon;
						iconIndexRotate = 0;
					} 
					else if (icon.isTypeRight()) {
						selectedRightIcon = icon;			
					}
					else if (icon.isTypeReset()) {
						this.reset();
					}
				}
			}
		}
	},
	// get Mouse Position
	this.getMousePos = function(evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	}
}