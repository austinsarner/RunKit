/*
 * RKCanvas.j
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

@implementation RKCanvas : CPObject
{
	JSObject _canvasElement;
	CGRect rect;
}

- (id)initWithRect:(CGRect)aRect
{
	if (self = [super init])
	{
		_canvasElement = document.createElement("canvas");
		[[RKEnvironment sharedEnvironment] container].appendChild(_canvasElement);
		[self setRect:aRect];
	}
	return self;
}

- (void)setRect:(CGRect)aRect
{
	rect = aRect;
	RKCanvasSetRect(_canvasElement,aRect);
}

- (CGRect)rect
{
	return rect;
}

- (CGContext)context
{
	return _canvasElement.getContext("2d");
}

@end

function RKCanvasSetRect(canvas,rect)
{
	canvas.style.position = "fixed";
	canvas.style.x = rect.origin.x;
	canvas.style.y = rect.origin.y;
	canvas.width = rect.size.width;
	canvas.height = rect.size.height;
}