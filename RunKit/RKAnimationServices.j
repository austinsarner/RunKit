/*
 * RKAnimationServices.j
 * RunKit
 *
 * Created by Austin Sarner and Mark Davis.
 * Copyright 2010 Austin Sarner and Mark Davis.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

@import <Foundation/CPTimer.j>

var sharedAnimationServices = nil;

function RKLayerAcceleration(animatedLayer,currentVector,velocity)
{
	return RKLocationMake(RKLayerAccelerationComponent(animatedLayer,currentVector.x,velocity.x),RKLayerAccelerationComponent(animatedLayer,currentVector.y,velocity.y),RKLayerAccelerationComponent(animatedLayer,currentVector.z,velocity.z));
}

function RKLayerAccelerationComponent(animatedLayer,vector,velocity)
{
	return [animatedLayer tension]*vector - [animatedLayer tension]*velocity;
}

function RKVectorComponentNeedsNegation(vectorCoordinate,currentVectorCoordinate)
{
	return ((vectorCoordinate < 0 && currentVectorCoordinate > 0) || (vectorCoordinate > 0 && currentVectorCoordinate < 0));
}

@implementation CPObject (RKAnimationServicesPropertyAdditions)

- (CPArray)animatingProperties {}

@end

@implementation RKAnimationServices : CPObject
{
	CPTimer		   	animationProcessingTimer;
	CPMutableArray 	animatedLayerQueue;
	CPTimeInterval	previousFrameStartTime;
	int fps;
}

+ (RKAnimationServices)sharedAnimationServices
{
	if (sharedAnimationServices == nil)
		sharedAnimationServices = [[self alloc] init];
		
	return sharedAnimationServices;
}

- (id)init
{
	if (self = [super init]) {
		animationProcessingTimer = nil;
		animatedLayerQueue = [[CPMutableArray alloc] init];
		timerCount = 0;
		fps = 60.0;
		return self;
	}
	
	return nil;
}

- (void)addAnimatingLayer:(RKLayer)aLayer
{	
	if (![animatedLayerQueue containsObject:aLayer])
	{
		[animatedLayerQueue addObject:aLayer];
	}
		
	if (animationProcessingTimer == nil)
		[self beginAnimationProcessingTimer];
}

- (void)beginAnimationProcessingTimer
{
	previousFrameStartTime = [[CPDate date] timeIntervalSince1970];
	animationProcessingTimer = [CPTimer scheduledTimerWithTimeInterval:1.0 / fps target:self selector:@selector(animationProcessingTimerFired:) userInfo:nil repeats:YES];
}

- (void)animationProcessingTimerFired:(id)sender
{
	var dtScaleFactor = 6.0;
	
	var newFrameStartTime = [[CPDate date] timeIntervalSince1970];
    var dt = .3;// .3;// * (newFrameStartTime - previousFrameStartTime);
	previousFrameStartTime = newFrameStartTime;

	if ([animatedLayerQueue count]==0)
	{
		[sender invalidate];
		animationProcessingTimer = nil;
		return;
	}
	
	var layersToRemoveFromQueue = [[CPMutableArray alloc] init];
	
	for (var i = 0; i < [animatedLayerQueue count]; i++) {
		var animatedLayer = [animatedLayerQueue objectAtIndex:i];
		
		var velocity = [animatedLayer velocity];
		var vector = [animatedLayer vector];
		
		var currentVector = RKLocationMake([animatedLayer desiredFrame].location.x - [animatedLayer frame].location.x,[animatedLayer desiredFrame].location.y - [animatedLayer frame].location.y,[animatedLayer desiredFrame].location.z - [animatedLayer frame].location.z);
		
		var force = RKLocationCreateCopy(currentVector);
		if (RKVectorComponentNeedsNegation(vector.x,currentVector.x))
			force.x *= -1;
		if (RKVectorComponentNeedsNegation(vector.y,currentVector.y))
			force.y *= -1;
		if (RKVectorComponentNeedsNegation(vector.z,currentVector.z))
			force.z *= -1;
		
		var acceleration = RKLayerAcceleration(animatedLayer,force,velocity);
		
		var shrinking = [animatedLayer desiredFrame].location.z <= [animatedLayer frame].location.z;
		var goingLeft = [animatedLayer desiredFrame].location.x <= [animatedLayer frame].location.x;
		var goingUp = [animatedLayer desiredFrame].location.y <= [animatedLayer frame].location.y;
		
		velocity.x += acceleration.x * dt;
		velocity.y += acceleration.y * dt;
		velocity.z += acceleration.z * dt;
		
		[animatedLayer setVelocity:velocity];
		
		var actualFrame = [animatedLayer frame];
		
		var xIncrease = (vector.x * velocity.x * dt);
		var yIncrease = (vector.y * velocity.y * dt);
		var zIncrease = (vector.z * velocity.z * dt);
		
		if (!shrinking) zIncrease *= -1.0;
		if (!goingLeft) xIncrease *= -1.0;
		if (!goingUp)	yIncrease *= -1.0;
		
		actualFrame.location = RKLocationMake(actualFrame.location.x - xIncrease,actualFrame.location.y - yIncrease,actualFrame.location.z - zIncrease);
		
		if ([animatedLayer frame].size.width == 0.0)
			[animatedLayer setFrame:[animatedLayer desiredFrame]];
		else
			[animatedLayer setFrame:actualFrame];
		
		if (RKFrameIsEqualToFrame([animatedLayer frame],[animatedLayer desiredFrame]))
			[layersToRemoveFromQueue addObject:animatedLayer];
	}
	
	for (var i = 0; i < [layersToRemoveFromQueue count]; i++)
		[animatedLayerQueue removeObject:[layersToRemoveFromQueue objectAtIndex:i]];
	
	[[[RKEnvironment sharedEnvironment] composition] display];
}


@end