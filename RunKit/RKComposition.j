/*
 * RKComposition.j
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

@import "RKLayer.j"

@implementation RKComposition : CPObject
{
	CGRect					rect @accessors;
	CPMutableArray			layers @accessors;
	RKCanvas				canvas;
	
	CPMutableDictionary		eventForwardingDictionary;
	RKLayer					pressedLayer;
}

- (id)initWithNode:(JSObject)domNode
{
	if (self = [super init])
	{
		pressedLayer = nil;
		layers = [[CPMutableArray alloc] init];
		eventForwardingDictionary = [[CPMutableDictionary alloc] init];
	}
	return self;
}

- (void)resetRect
{
	var compositionRect = CGRectMake(0,0,[[RKEnvironment sharedEnvironment] size].width,[[RKEnvironment sharedEnvironment] size].height);
	[self setRect:compositionRect];
}

- (void)_envDidLoad:(RKEnvironment)environment
{
	window.onresize = function() { [self resetRect] };
	[self resetRect];
	canvas = [[RKCanvas alloc] initWithRect:[self rect]];
	[self environmentDidFinishLoading:environment];
}

- (void)awakeFromEnvironment
{
	[self display];
}

- (void)setRect:(CPRect)aRect
{
	rect = aRect;
	if (canvas != nil)
	{
		[canvas setRect:aRect];
		[self display];
	}
}

- (CGPoint)convertPoint:(CGPoint)aPoint fromLayer:(RKLayer)aLayer
{
	var newPoint = CGRectMake(0,0);
	if (aLayer == nil)
	{
		newPoint.x = aPoint.x - [self rect].origin.x;
		newPoint.y = aPoint.y - [self rect].origin.y;
	}
	return newPoint;
}

- (CGGraphicsContext)context
{
	return [canvas context];
}

- (CGRect)bounds
{
	return CGRectMake(0,0,rect.size.width,rect.size.height);
}

- (void)display
{
	if (rect != nil) {
		CGContextClearRect([self context],[self bounds]);
		[self drawRect:[self bounds]];
	}
}

- (void)drawRect:(CPRect)aRect
{
	// var sortDescriptor = [CPSortDescriptor sortDescriptorWithKey:@"zIndex" ascending:YES];
	// var zSortedLayers = [layers sortedArrayUsingDescriptors:[sortDescriptor]];
	
	for (var i=0;i<[layers count];i++)
	{
		var layer = [layers objectAtIndex:i];
		if (CGRectIntersectsRect([layer rect],aRect))
			[layer display]
	}
}

// Layers

- (RKLayer)addLayer:(RKLayer)layer
{
	[layer setComposition:self];
	[layers addObject:layer];
	return layer;
}

- (RKLayer)layerAtPoint:(CGPoint)point
{
	for (var i=0;i<[layers count];i++)
	{
		var layer = [layers objectAtIndex:i];
		if (CGRectContainsPoint([layer rect],point))
			return layer;
	}
	return nil;
}

// Event Forwarding

- (void)registerLayer:(RKLayer)aLayer forEvent:(var)anEventType
{
	var interestedLayers = [eventForwardingDictionary objectForKey:anEventType];
	
	if (interestedLayers == nil)
		[eventForwardingDictionary setObject:[CPArray arrayWithObject:aLayer] forKey:anEventType];
	else if (![interestedLayers containsObject:aLayer])
		[interestedLayers addObject:aLayer];
}

- (void)mouseDown:(CPEvent)anEvent
{	
	var mousePosition = [anEvent locationInWindow];
	var clickedLayer = nil;
	var interestedLayers = [eventForwardingDictionary objectForKey:@"RKMouseDownEvent"];
	
	if (interestedLayers == nil)
		return;
		
	for (var i=0;i<[interestedLayers count];i++)
	{
		var layer = [interestedLayers objectAtIndex:i];
		if (CGRectContainsPoint([layer rect],mousePosition))
		{
			pressedLayer = layer;
			clickedLayer = layer;
			break;
		}
	}
	
	if (clickedLayer != nil)
		[clickedLayer mouseDown:anEvent];
}

- (void)mouseUp:(CPEvent)anEvent
{
	var mousePosition = [anEvent locationInWindow];
	var clickedLayer = nil;
	var interestedLayers = [eventForwardingDictionary objectForKey:@"RKMouseUpEvent"];
	
	if (interestedLayers == nil)
		return;
		
	for (var i=0;i<[interestedLayers count];i++)
	{
		var layer = [interestedLayers objectAtIndex:i];
		if (CGRectContainsPoint([layer rect],mousePosition))
		{
			clickedLayer = layer;
			break;
		}
	}
	
	if (clickedLayer != nil)
		[clickedLayer mouseUp:anEvent];
	else if (pressedLayer != nil) {
		[pressedLayer mouseUp:anEvent];
		pressedLayer = nil;
	}
}

- (void)mouseDragged:(CPEvent)anEvent
{
	if (pressedLayer != nil) {
		[pressedLayer mouseDragged:anEvent];
		return;
	}
	
	var mousePosition = [anEvent locationInWindow];
	var clickedLayer = nil;
	var interestedLayers = [eventForwardingDictionary objectForKey:@"RKMouseDraggedEvent"];
	
	if (interestedLayers == nil)
		return;
		
	for (var i=0;i<[interestedLayers count];i++)
	{
		var layer = [interestedLayers objectAtIndex:i];
		if (CGRectContainsPoint([layer rect],mousePosition))
		{
			clickedLayer = layer;
			break;
		}
	}
	
	if (clickedLayer != nil)
		[clickedLayer mouseDragged:anEvent];
}

- (void)mouseMoved:(CPEvent)anEvent
{
	var mousePosition = [anEvent locationInWindow];
	var hoveredLayer = nil;
	var interestedLayers = [eventForwardingDictionary objectForKey:@"RKMouseMovedEvent"];
	
	if (interestedLayers == nil)
		return;
		
	for (var i=0;i<[interestedLayers count];i++)
	{
		var layer = [interestedLayers objectAtIndex:i];
		if (CGRectContainsPoint([layer rect],mousePosition))
		{
			hoveredLayer = layer;
			break;
		}
	}
	
	if (hoveredLayer != nil)
		[hoveredLayer mouseMoved:anEvent];
}

@end