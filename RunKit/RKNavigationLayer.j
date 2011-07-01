/*
 * RKNavigationLayer.j
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

@implementation RKNavigationLayer : RKLayer
{
	CPMutableArray navigationItems;
	CPFont font @accessors;
	int itemHeight @accessors;
	float alphaValue @accessors;
	var fadeAnimation @accessors;
	BOOL fadeIn;
}

- (id)init
{
	if (self = [super init])
	{
		navigationItems = [[CPMutableArray alloc] init];
		font = [CPFont systemFontOfSize:13];
		itemHeight = 16;
		alphaValue = 1.0;
		fadeIn = NO;
		fadeAnimation = nil;
	}
	return self;
}

- (void)addNavigationItem:(RKNavigationItem)navItem
{
	[navigationItems addObject:navItem];
	if ([self composition])
		[[self composition] display];
}

- (void)drawRect:(CPRect)aRect
{
	var context = [[self composition] context];
	context.save();
	CGContextSetAlpha(context,alphaValue);
	var textRect = CGRectMake(aRect.origin.x,aRect.origin.y,[self rect].size.width,itemHeight);
	for (var i=0;i<[navigationItems count];i++)
	{
		var navItem = [navigationItems objectAtIndex:i];
		var greyValue = (i==0)?255:125;
		CGContextSetFillColor(context,CGColorCreateGenericRGBA(greyValue,greyValue,greyValue,1.0));
		[[navItem title] drawInRect:textRect withFont:[self font] alignment:CPRightTextAlignment];
		textRect.origin.y += itemHeight;
	}
	context.restore();
}

- (void)fadeIn:(id)sender
{
	if (fadeAnimation != nil)
		[fadeAnimation stopAnimation];
	fadeIn = YES;
	[self startAnimation];
}

- (void)fadeOut:(id)sender
{
	if (fadeAnimation != nil)
		[fadeAnimation stopAnimation];
	fadeIn = NO;
	[self startAnimation];
}

- (void)startAnimation
{
	fadeAnimation = [[FPAnimation alloc] initWithDuration:0.15 animationCurve:fadeIn?FPAnimationEaseOut:FPAnimationEaseIn];
	[fadeAnimation setDelegate:self];
	[fadeAnimation startAnimation];
}

- (void)animationFired:(id)animation
{
	if (fadeIn)
		[self setAlphaValue:[animation currentValue]];
	else
		[self setAlphaValue:1.0-[animation currentValue]];
}

- (void)animationFinished:(id)animation
{
	[self setAlphaValue:(fadeIn)?1.0:0.0];
}

- (void)mouseDown:(CPEvent)mouseEvent
{
	var locationInWindow = [mouseEvent locationInWindow];
	
	var textRect = CGRectMake([self rect].origin.x,[self rect].origin.y,[self rect].size.width,itemHeight);
	for (var i=0;i<[navigationItems count];i++)
	{
		var navItem = [navigationItems objectAtIndex:i];
		if (CGRectContainsPoint(textRect,locationInWindow))
		{
			//alert([CPString stringWithFormat:"clicked %@",[navItem title]]);
			return;
		}
		textRect.origin.y += itemHeight;
	}
	//[[self composition] display];
}

@end

@implementation RKNavigationItem : CPObject
{
	id target @accessors;
	SEL action @accessors;
	CPString title @accessors;
	BOOL hovered @accessors;
}

- (id)init
{
	if (self = [super init])
	{
		hovered = NO;
	}
	return self;
}

+ (id)navigationItemWithTitle:(CPString)aTitle
{
	var navItem = [[self alloc] init];
	navItem.title = aTitle;
	return [navItem autorelease];
}

@end