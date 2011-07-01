/*
 * RKScrubberLayer.j
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

@implementation RKScrubberLayer : RKLayer
{
	BOOL			scrubbing @accessors;
	
	var 			maxValue @accessors;
	var				minValue @accessors;
	var				currentValue @accessors;
	
	float 			knobProportion @accessors;
	float 			knobPosition @accessors;
	float			knobDraggingOffset;
	
	id				delegate @accessors;
}

- (id)init
{
	if (self = [super init])
	{
		knobDraggingOffset = 0.0;
		
		[self setMinValue:0.0];
		[self setMaxValue:1.0];
		
		[self setKnobProportion:0.025];
		[self setKnobPosition:0.0];
		
		[self setCurrentValue:0];
	}
	return self;
}

- (void)drawRect:(CGRect)fillRect
{	
	var context = [[self composition] context];
	
	CGContextSetFillColor(context,CGColorCreateGenericRGB(60,60,60));
	CGContextFillRect(context,fillRect);
	
	var knobWidth = [self knobWidth];
	
	var knobRect = CGRectMake(fillRect.origin.x + [self knobPosition],fillRect.origin.y,knobWidth,fillRect.size.height);

	CGContextSetFillColor(context,CGColorCreateGenericRGB(200,200,200));
	CGContextFillRect(context,knobRect);
}

- (float)knobWidth
{
	return Math.floor([self rect].size.width * [self knobProportion]);
}

- (void)mouseDown:(CPEvent)anEvent
{
	var mouseLocation = [anEvent locationInWindow];
	var knobWidth = [self knobWidth];
	scrubbing = YES;
	
	var knobRect = CGRectMake([self rect].origin.x + [self knobPosition],[self rect].origin.y,knobWidth,[self rect].size.height);
	if (CGRectContainsPoint(knobRect,mouseLocation))
		knobDraggingOffset = mouseLocation.x - knobRect.origin.x;
	else {
	
		knobPosition = mouseLocation.x - [self rect].origin.x - knobWidth / 2.0;
		if (knobPosition < 0.0)
			knobPosition = 0.0;
		else if (knobPosition > [self rect].size.width - knobWidth)
			knobPosition = [self rect].size.width - knobWidth;
		
		knobDraggingOffset = knobWidth / 2.0;
	}
	
	if (delegate != nil)
		[delegate scrubberBeganScrubbing:self];
		
	[self display];
	[self updateValueIfNeeded];
}

- (void)mouseUp:(CPEvent)anEvent
{
	scrubbing = NO;
	
	if (delegate != nil)
		[delegate scrubberEndedScrubbing:self]
}

- (void)mouseDragged:(CPEvent)anEvent
{
	knobPosition = [anEvent locationInWindow].x - [self rect].origin.x - knobDraggingOffset;
	if (knobPosition < 0.0)
		knobPosition = 0.0;
	else if (knobPosition > [self rect].size.width - [self knobWidth])
		knobPosition = [self rect].size.width - [self knobWidth];
	
	[self display];
	
	[self updateValueIfNeeded];
}

- (var)updateValueIfNeeded
{
	var segmentWidth = [self rect].size.width / maxValue;
	var proposedValue = Math.floor(knobPosition / segmentWidth);
	
	if (proposedValue != currentValue) {
		currentValue = proposedValue;
		
		if (delegate != nil)
			[delegate scrubber:self scrubbedToValue:currentValue];
	}
}

- (var)setCurrentValue:(var)aValue
{
	var segmentWidth = [self rect].size.width / maxValue;
	knobPosition = aValue * segmentWidth + (aValue/maxValue * segmentWidth - [self knobWidth] / 2.0);
	if (knobPosition < 0.0)
		knobPosition = 0.0;
	else if (knobPosition > [self rect].size.width - [self knobWidth])
		knobPosition = [self rect].size.width - [self knobWidth];

	currentValue = aValue;
}

@end