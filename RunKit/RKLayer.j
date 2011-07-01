/*
 * RKLayer.j
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

@import <Foundation/CPObject.j>

function RKLayerNormalizeVectorCoordinate(vectorCoordinate)
{
	var newVectorCoordinate = vectorCoordinate;
	if (newVectorCoordinate > 0.0)
		newVectorCoordinate = 1.0;
	else if (newVectorCoordinate < 0.0)
		newVectorCoordinate = -1.0;
	return newVectorCoordinate;
}

/* @abstract */

@implementation RKLayer : CPObject
{
	// Layer geometry
	RKFrame				frame @accessors;
	RKEffect			effect @accessors;
	
	// Animation services
	RKFrame				desiredFrame @accessors;
	
	RKLocation	 		velocity @accessors;
	RKLocation 			vector @accessors;
	RKLocation			unitVector @accessors;
	double				magnitude @accessors;
	//double				scaleMagnitude @accessors;
	
	double				tension @accessors;
	double				friction @accessors;
	double				threshold @accessors;
	
	BOOL				snapping @accessors;
	BOOL				hidden @accessors;
	//double				mass @accessors;
	//double				elasticity @accessors;
	
	// Hierarchy
	RKComposition		composition @accessors;
}

- (id)init
{
	if (self = [super init]) {
		hidden = NO;
		[self setSnapping:NO];
		[self setFrame:RKFrameMake(RKLocationMake(0,0,0),RKSizeMake(0,0,0))];
		tension = 1.4;
		friction = 0.0;
		treshold = 0.03;
	}
	return self;
}

+ (id)layer
{
	return [[[self alloc] init] autorelease];
}

- (int)zIndex
{
	return [self frame].location.z;
}

- (int)yIndex
{
	return [self frame].location.y;
}

- (CGRect)rect
{
	return CGRectWithFrame([self frame]);
}

// Animation Services

- (void)setDesiredFrame:(RKFrame)aFrame
{
	velocity = RKLocationMake(0.0,0.0,0.0);
	
	var newVector = RKLocationMake(aFrame.location.x - [self frame].location.x,aFrame.location.y - [self frame].location.y,aFrame.location.z - [self frame].location.z);
	
	newVector.x = RKLayerNormalizeVectorCoordinate(newVector.x);
	newVector.y = RKLayerNormalizeVectorCoordinate(newVector.y);
	newVector.z = RKLayerNormalizeVectorCoordinate(newVector.z);
	
	[self setVector:newVector];
	
	desiredFrame = aFrame;
	[[RKAnimationServices sharedAnimationServices] addAnimatingLayer:self];
}

- (CPArray)animatingProperties
{
	return [CPArray arrayWithObject:@"frame"];
}

// Displaying

- (void)display
{
	if (!hidden)
		[self drawRect:[self rect]];
}

- (void)drawRect:(CGRect)rect
{
	/* @abstract for subclass implementation */
}

@end
