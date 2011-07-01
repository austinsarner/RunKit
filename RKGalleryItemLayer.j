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

@implementation RKGalleryItemLayer : RKLayer
{
	CPImage image @accessors;
	CPMutableDictionary cache;
}

- (id)initWithImage:(CPImage)anImage
{
	if (self = [super init])
	{
		image = anImage;
		cache = [[CPMutableDictionary alloc] init];

		[self setTension:1.5];
		[self setThreshold:0.1];
	}
	return self;
}

- (void)generateCachedThumbnail
{
	if ([image loadStatus]==CPImageLoadStatusCompleted)
	{
		var composition = [[RKEnvironment sharedEnvironment] composition];
		var offscreenCanvas = [composition offscreenCanvas];
		var context = [offscreenCanvas context];
		var canvasRect = CGRectMake(10000,0,[self rect].size.width,[self rect].size.height);
		[offscreenCanvas setRect:canvasRect];
		
		var imageRect = CGRectMake(0,0,canvasRect.size.width,canvasRect.size.height);
		CGContextDrawImage(context,imageRect,[image valueForKey:@"_image"]);
		
		[cache setObject:CGContextGetImageData(context,imageRect) forKey:[self frame].location.z]
	}
}

- (void)imageDidLoad:(CPImage)image
{
	[[self composition] display];
}

- (void)drawRect:(CGRect)fillRect
{
	var context = [[self composition] context];
	var zIndex = [self frame].location.z;
	var cachedThumbnailData = [cache objectForKey:zIndex];
	
	if (cachedThumbnailData == nil && (zIndex == 0.15 || zIndex == 0.5 || zIndex == 0.3))
		[self generateCachedThumbnail];
	
	context.save();
	//CGContextClearRect(context,fillRect);
	
	if ([image loadStatus]==CPImageLoadStatusCompleted)
	{
		//CGContextSetFillColor(context,CGColorCreateGenericRGBA(0,0,0,0.9));
		//CGContextFillRect(context,fillRect);
		
		var imageRect = CGRectCreateCopy(fillRect);
		imageRect.size.width--;
		imageRect.origin.x++;
		imageRect.size.height--;
		
		if (cachedThumbnailData != nil)
			CGContextPutImageData(context,cachedThumbnailData,imageRect.origin);			
		else
			CGContextDrawImage(context,imageRect,[image valueForKey:@"_image"]);
		
	}
	else
		[image setDelegate:self];
	context.restore();
}

@end