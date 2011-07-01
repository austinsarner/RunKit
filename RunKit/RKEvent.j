/*
 * RKEvent.j
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

@implementation RKEvent : CPObject
{
	CGPoint	locationInWindow @accessors;
	int	keyCode @accessors;
}

- (id)init
{
	if (self = [super init])
	{
		
	}
	return self;
}

+ (RKEvent)mouseEventWithLocationInWindow:(CGPoint)location
{
	var mouseEvent = [[self alloc] init];
	mouseEvent.locationInWindow = location;
	return mouseEvent;
}

+ (RKEvent)keyEventWithCode:(int)code
{
	var keyEvent = [[self alloc] init];
	keyEvent.keyCode = code;
	return keyEvent;
}

@end

function _RKEventLocationInWindow(e)
{
	var posX = 0;
	var posY = 0;
	
	if (!e) var e = window.event;
	if (e.pageX || e.pageY)
	{
		posX = e.pageX;
		posY = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	return CGPointMake(posX,posY);
}