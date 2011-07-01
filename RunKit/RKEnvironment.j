/*
 * RKEnvironment.j
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

function RKDOMElementWithId(id)
{
	return document.getElementById(id);
}

function RKContainer()
{
	return document.body;
}

function RKDOMStripChildNodes(domElement)
{
	while (domElement.childNodes.length >= 1)
        domElement.removeChild(domElement.firstChild);
}

var RKEnv = nil;

@implementation RKEnvironment : CPObject
{
	BOOL			canvasMode;
	DOMElement		container @accessors;
	BOOL			mouseDown;
	RKComposition	composition @accessors;
}

- (id)init
{
	if (self = [super init])
	{
		[CPRunLoop currentRunLoop];
		container = RKContainer();
		canvasMode = RKCompatibilitySupportsCanvas();
		elements = [[CPMutableArray alloc] init];
	}
	return self;
}

+ (RKEnvironment)sharedEnvironment
{
	if (RKEnv == nil)
		RKEnv = [[self alloc] init];
	return RKEnv;
}

- (void)loadWithComposition:(RKComposition)aComposition
{
	composition = aComposition;
	[self setupEnvironment];
	[composition _envDidLoad:self];
}

- (void)setupEnvironment
{
	[self _setupEvents];
}
- (void)_setupEvents
{
	container.onmousedown = function (e) { [self _performMouseDownEvent:e]; };
	container.onmouseup = function (e) { [self _performMouseUpEvent:e]; };
	container.onmousemove = function (e) { [self _performMouseMoveEvent:e]; };
	container.onkeydown = function (e) { [self _performKeyDownEvent:e]; };
}

- (void)_performKeyDownEvent:(JSObject)event
{
	var keyEvent = [RKEvent keyEventWithCode:event.keyCode];
	[composition keyDown:keyEvent];
}

- (void)_performMouseMoveEvent:(JSObject)event
{
	if (mouseDown)
	{
		var locationInWindow = _RKEventLocationInWindow(event);
		var mouseEvent = [RKEvent mouseEventWithLocationInWindow:locationInWindow];
		[composition mouseDragged:mouseEvent];
	} else
	{
		var locationInWindow = _RKEventLocationInWindow(event);
		var mouseEvent = [RKEvent mouseEventWithLocationInWindow:locationInWindow];
		[composition mouseMoved:mouseEvent];
	}
}

- (void)_performMouseDownEvent:(JSObject)event
{
	mouseDown = YES;
	
	var locationInWindow = _RKEventLocationInWindow(event);
	var mouseEvent = [RKEvent mouseEventWithLocationInWindow:locationInWindow];
	[composition mouseDown:mouseEvent];
}

- (void)_performMouseUpEvent:(JSObject)event
{
	mouseDown = NO;
	
	var locationInWindow = _RKEventLocationInWindow(event);
	var mouseEvent = [RKEvent mouseEventWithLocationInWindow:locationInWindow];
	[composition mouseUp:mouseEvent];
}

- (CGSize)size
{
	return CGSizeMake(window.innerWidth,window.innerHeight);
}

@end