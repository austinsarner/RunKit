/* 
 * Copyright (C) 2010 by Austin Sarner and Mark Davis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

@import <Foundation/CPObject.j>
@import "RKGalleryItemLayer.j"

var RKGalleryThumbnailDepth = 0.5;

@implementation MyComposition : RKComposition
{

	BOOL 			displayingGrid;
	BOOL			clicked;
	int				seconds;


	CPDictionary	nodeDictionary;
	CGSize			imageSize;
	RKCanvas		offscreenCanvas @accessors;
	// RKLayer
	CPMutableArray	imageLayers;
	RKLayer			focusedLayer @accessors;
	RKLayer			navigationLayer;
	RKLayer			scrubberLayer;
	RKLayer			gridToggleButtonLayer;
	
	var 			numberOfColumns;
	var				columnOffset;
}

- (id)initWithNode:(JSObject)aNode
{
	if (self = [super initWithNode:aNode])
	{
		displayingGrid = NO;
		columnOffset = 0;
		
		offscreenCanvas = [[RKCanvas alloc] initWithRect:CGRectMake(10000,0,410,550)];
		imageLayers = [[CPMutableArray alloc] init];
		nodeDictionary = [[CPMutableDictionary alloc] init];
		
		var imageArray = [[CPMutableArray alloc] init];
		$("#photos div.photo").each(function(index)
		{
			var imageSrc = $(this).attr("src");
			var image = [[CPImage alloc] initWithContentsOfFile:imageSrc];
			[imageArray addObject:image];
		});
		[nodeDictionary setValue:imageArray forKey:@"photos"];
		
		var navigationArray = [[CPMutableArray alloc] init];
		$("#navigation a").each(function(index)
		{
			[navigationArray addObject:$(this).attr("title")];
		});
		[nodeDictionary setValue:navigationArray forKey:@"navigation"];
		
		RKDOMStripChildNodes(document.body);
		imageSize = CGSizeMake(820,547);
	}
	return self;
}

- (void)environmentDidFinishLoading:(RKEnvironment)environment
{
	//CPLogRegister(CPLogPopup);
	
	var imageArray = [nodeDictionary valueForKey:@"photos"];
	for (var i=0;i<[imageArray count];i++)
	{
		var image = [imageArray objectAtIndex:i];
		var newLayer = [[RKGalleryItemLayer alloc] initWithImage:image];
		[self addLayer:newLayer];
		[imageLayers addObject:newLayer];
	}
	
	numberOfColumns = Math.floor([imageLayers count] / 3);
	
	if (numberOfColumns > 0)
		 numberOfColumns--;
	
	focusedLayer = [[self layers] objectAtIndex:0];
	
	scrubberLayer = [[RKScrubberLayer alloc] init];
	[scrubberLayer setDelegate:self];
	[scrubberLayer setFrame:RKFrameMake(RKLocationMake(0.0,RKYUnitsFromPixels(300.0),1.0),RKSizeMake(820.0,6.0,1.0))];
	[self addLayer:scrubberLayer];
	[self registerLayer:scrubberLayer forEvent:@"RKMouseDownEvent"];
	[self registerLayer:scrubberLayer forEvent:@"RKMouseUpEvent"];
	[self registerLayer:scrubberLayer forEvent:@"RKMouseDraggedEvent"];
	[scrubberLayer setMaxValue:[imageLayers count]];
	[scrubberLayer setMinValue:0.0];
	
	gridToggleButtonLayer = [[RKGridToggleButtonLayer alloc] init];
	[gridToggleButtonLayer setDelegate:self];
	[gridToggleButtonLayer setFrame:RKFrameMake(RKLocationMake(RKXUnitsFromPixels(438.0),RKYUnitsFromPixels(300.0),1.0),RKSizeMake(45.0,15.0,1.0))];
	[self addLayer:gridToggleButtonLayer];
	[self registerLayer:gridToggleButtonLayer forEvent:@"RKMouseDownEvent"];
	[self registerLayer:gridToggleButtonLayer forEvent:@"RKMouseUpEvent"];
	[self registerLayer:gridToggleButtonLayer forEvent:@"RKMouseDraggedEvent"];
	
	navigationLayer = [[RKNavigationLayer alloc] init];
	[navigationLayer setFont:[CPFont systemFontOfSize:14.0]];
	[navigationLayer setItemHeight:20.0];
	[navigationLayer setFrame:RKFrameMake(RKLocationMake(-RKXUnitsFromPixels(380.0),-RKYUnitsFromPixels(175.0),1.0),RKSizeMake(100.0,200.0,1.0))];
	[self addLayer:navigationLayer];
	
	var navigationItems = [nodeDictionary valueForKey:@"navigation"];
	for (var i=0;i<[navigationItems count];i++)
	{
		var title = [navigationItems objectAtIndex:i];
		[navigationLayer addNavigationItem:[RKNavigationItem navigationItemWithTitle:title]];
	}
	
	[self registerLayer:navigationLayer forEvent:@"RKMouseDownEvent"];
	[self display];
}

- (void)resetRect
{
	[super resetRect];
	
	[navigationLayer setFrame:RKFrameMake(RKLocationMake(-RKXUnitsFromPixels(380.0),-RKYUnitsFromPixels(185.0),1.0),RKSizeMake(200.0,200.0,1.0))];
	[scrubberLayer setFrame:RKFrameMake(RKLocationMake(0.0,RKYUnitsFromPixels(300.0),1.0),RKSizeMake(820.0,6.0,1.0))];
	
	[self resetImageLayerFrames:NO];
}

- (void)keyDown:(CPEvent)keyEvent
{
	if ([keyEvent keyCode]==37 || [keyEvent keyCode]==39)
	{
		var indexOfFocusedLayer = [imageLayers indexOfObject:focusedLayer];
		if ([keyEvent keyCode]==37)
			indexOfFocusedLayer--;
		else if ([keyEvent keyCode]==39)
			indexOfFocusedLayer++;
		
		if (indexOfFocusedLayer>-1 && indexOfFocusedLayer<[imageLayers count])
			[self setFocusedLayer:[imageLayers objectAtIndex:indexOfFocusedLayer]];
	}
	
}

- (void)mouseDown:(CPEvent)anEvent
{
	[super mouseDown:anEvent];
	
	if (![scrubberLayer scrubbing]) {
		
		var mousePosition = [anEvent locationInWindow];
		
		var clickedLayer = nil;
		for (var i=0;i<[imageLayers count];i++)
		{
			var layer = [imageLayers objectAtIndex:i];
			if (CGRectContainsPoint([layer rect],mousePosition))
			{
				clickedLayer = layer;
				break;
			}
		}
	
		if (clickedLayer != nil)
			[self setFocusedLayer:clickedLayer];
	}
}

- (void)setFocusedLayer:(RKLayer)clickedLayer
{
	if (clickedLayer != focusedLayer && [clickedLayer frame].location.z == 1.0)
		return;
	
	[gridToggleButtonLayer setToggle:NO];
	displayingGrid = NO;
	[self updateScrubber];
	
	focusedLayer = clickedLayer;
	[self resetImageLayerFrames];
	
	if (![scrubberLayer scrubbing])
		[scrubberLayer setCurrentValue:[imageLayers indexOfObject:focusedLayer]];
}

- (void)mouseUp:(CPEvent)anEvent
{
	[super mouseUp:anEvent];
}

- (void)mouseDragged:(CPEvent)anEvent
{
	[super mouseDragged:anEvent];
}

- (void)resetImageLayerFrames
{
	[self resetImageLayerFrames:YES];
}

- (void)resetImageLayerFrames:(BOOL)animated
{
	if (!displayingGrid) {
		var thumbnailSpacing = 0.0;
	
		// First set up the focused layer because everything else is relative to it
		var focusedLayerLocation = RKLocationMake(0.0,0.0,[scrubberLayer scrubbing] ? 0.5 : 1.0);
	
		if (animated)
			[focusedLayer setDesiredFrame:RKFrameMake(focusedLayerLocation,RKSizeMake(imageSize.width,imageSize.height,1.0))];
		else
			[focusedLayer setFrame:RKFrameMake(focusedLayerLocation,RKSizeMake(imageSize.width,imageSize.height,1.0))];
		
		var focusedLayerIndex = [imageLayers indexOfObject:focusedLayer];
	
		var smallSpacing = RKXUnitsFromPixels(430.0);
		var largeSpacing = RKXUnitsFromPixels(640.0);
	
		thumbnailSpacing = [scrubberLayer scrubbing] ? -(smallSpacing) : -(largeSpacing);
	
		if (focusedLayerIndex > 0) {
			for (var i = focusedLayerIndex - 1; i >= 0; i--) {
				var imageLayer = [imageLayers objectAtIndex:i];
				var location = RKLocationMake(thumbnailSpacing,0.0,RKGalleryThumbnailDepth);
			
				if (animated)
					[imageLayer setDesiredFrame:RKFrameMake(location,RKSizeMake(imageSize.width,imageSize.height,1.0))];
				else
					[imageLayer setFrame:RKFrameMake(location,RKSizeMake(imageSize.width,imageSize.height,1.0))];
				
				thumbnailSpacing -= smallSpacing;
			}
		}
	
		thumbnailSpacing = [scrubberLayer scrubbing] ? smallSpacing : largeSpacing;
	
		for (var i = focusedLayerIndex + 1; i < [imageLayers count]; i++) {
			var imageLayer = [imageLayers objectAtIndex:i];
			var location = RKLocationMake(thumbnailSpacing,0.0,RKGalleryThumbnailDepth);
		
			if (animated)
				[imageLayer setDesiredFrame:RKFrameMake(location,RKSizeMake(imageSize.width,imageSize.height,1.0))];
			else
				[imageLayer setFrame:RKFrameMake(location,RKSizeMake(imageSize.width,imageSize.height,1.0))];
		
			thumbnailSpacing += smallSpacing;
		}
	} else {
		
		var pixelSpacing = 286.0;
		var halfPixelSpacing = 135.0;
		var edgeSpacing = RKXUnitsFromPixels(195.0);
		
		var spacing = RKXUnitsFromPixels(pixelSpacing);
		var halfSpacing = RKXUnitsFromPixels(halfPixelSpacing);
		
		var ySpacing = RKYUnitsFromPixels(190.0);
		var miniYSpacing = RKYUnitsFromPixels(100.0);
		
		var thumbnailSpacing = -(RKXUnitsFromPixels(pixelSpacing) + RKXUnitsFromPixels(halfPixelSpacing * columnOffset));
		
		if (columnOffset > 0)
			thumbnailSpacing -= RKXUnitsFromPixels(62.0);
			
		var row = 0;
		var column = 0;
		
		for (var i = 0; i < [imageLayers count]; i++) {
			
			var imageLayer = [imageLayers objectAtIndex:i];
			var miniColumn = (column < columnOffset || column > columnOffset + 2);
		
			var location = RKLocationMake(thumbnailSpacing,0.0,miniColumn ? 0.15 : 0.3);
			
			if (row == 0)
			 	location.y = miniColumn ? -miniYSpacing : -ySpacing;
			else if (row == 1)
			  	location.y = 0;
			else if (row == 2)
				location.y = miniColumn ? miniYSpacing : ySpacing;
			
			[imageLayer setDesiredFrame:RKFrameMake(location,RKSizeMake(imageSize.width,imageSize.height,1.0))];	
			
			if (row < 2)
				row++;
			else {
				row = 0;
				column++;
				if (column == columnOffset + 3)
					thumbnailSpacing += edgeSpacing;
				else if (column == columnOffset)
					thumbnailSpacing += edgeSpacing;
				else if (miniColumn)
					thumbnailSpacing += halfSpacing;
				else
					thumbnailSpacing += spacing;
			}
		}
	}
}

- (RKLayer)addLayer:(RKLayer)aLayer
{
	var layer = [super addLayer:aLayer];
	[self resetImageLayerFrames];
	return layer;
}

- (void)scrubberBeganScrubbing:(var)aScrubber
{
	if (!displayingGrid)
		[navigationLayer fadeOut:nil];
		
	[self resetImageLayerFrames];
}

- (void)scrubberEndedScrubbing:(var)aScrubber
{
	if (!displayingGrid)
		[navigationLayer fadeIn:nil];
	[self resetImageLayerFrames];
}

- (void)scrubber:(var)aScrubber scrubbedToValue:(var)index
{
	if (!displayingGrid)
		[self setFocusedLayer:[imageLayers objectAtIndex:index]];
	else {
		columnOffset = index;
		[self resetImageLayerFrames];
	}
}

- (BOOL)isScrubbing
{
	return [scrubberLayer scrubbing];
}

- (void)gridToggleButton:(var)aGridToggleButton wasToggledToState:(var)state
{
	displayingGrid = state;
	[self updateScrubber];
	
	[self resetImageLayerFrames];
}

- (void)updateScrubber
{
	if (displayingGrid) {
		[scrubberLayer setMaxValue:numberOfColumns];
		[scrubberLayer setCurrentValue:columnOffset];
		
	} else {
		[scrubberLayer setMaxValue:[imageLayers count]];
		[scrubberLayer setCurrentValue:[imageLayers indexOfObject:focusedLayer]];
	}
}

@end

@implementation RKGridToggleButtonLayer : RKLayer
{
	id delegate @accessors;
	var toggle @accessors;
	var highlighted @accessors;
}

- (id)init
{
	if (self = [super init]) {
		
		toggle = NO;
	}
	
	return self;
}

- (void)mouseDown:(CPEvent)event
{
	highlighted = YES;
	[self display];
}

- (void)mouseUp:(CPEvent)event
{
	if (!highlighted)
		return;
		
	highlighted = NO;
	
	toggle = !toggle;
	
	if (delegate)
		[delegate gridToggleButton:self wasToggledToState:toggle];
}

- (void)mouseDragged:(CPEvent)event
{
	var mouseLocation = [event locationInWindow];
	
	if (CPRectContainsPoint([self rect],mouseLocation))
		highlighted = YES;
	else
		highlighted = NO;
	
	[self display];
}

- (void)drawRect:(CGRect)fillRect
{
	var context = [[self composition] context];

	if (highlighted)
		CGContextSetFillColor(context,CGColorCreateGenericRGB(100,100,100));
	else
		CGContextSetFillColor(context,CGColorCreateGenericRGB(80,80,80));
	
	CGContextFillRect(context,fillRect);
	
	CGContextSetFillColor(context,CGColorCreateGenericRGB(20,20,20));
	[toggle ? @"FLOW" : @"GRID" drawInRect:fillRect withFont:[CPFont boldSystemFontOfSize:13] alignment:CPCenterTextAlignment];
}

@end