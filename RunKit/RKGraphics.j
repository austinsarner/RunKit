/*
 * RKGraphics.j
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

function RKContextClip(ctx)
{
	ctx.clip();
}

function RKContextSetFont(ctx,font)
{
	ctx.font = [font cssString];
}

function RKContextFillString(ctx,string,point)
{
	ctx.fillText(string,point.x,point.y);
}

function RKContextClipPath(ctx)
{
	ctx.clip();
}

// Image

function RKImageWithURL(url)
{
	var image = new Image();
	image.src = url;
	return image;
}

// Core Graphics

function CGContextFillRect(ctx,rect)
{
	ctx.fillRect(rect.origin.x,rect.origin.y,rect.size.width,rect.size.height);
}

function CGContextClearRect(ctx,rect)
{
    ctx.clearRect(rect.origin.x,rect.origin.y,rect.size.width,rect.size.height);
}

function CGContextSetAlpha(ctx,alpha)
{
    ctx.globalAlpha = alpha;
}

// Colors

function CGContextSetFillColor(ctx,color)
{
	ctx.fillStyle = color;
}

function CGColorCreateGenericRGB(r,g,b)
{
	return [CPString stringWithFormat:@"rgb(%d,%d,%d)",r,g,b];
}

function CGColorCreateGenericRGBA(r,g,b,a)
{
	return [CPString stringWithFormat:@"rgba(%d,%d,%d,%f)",r,g,b,a];
}

// Images & Image Data

function CGContextDrawImage(ctx,rect,image)
{
    ctx.drawImage(image,rect.origin.x,rect.origin.y,rect.size.width,rect.size.height);
}

function CGContextGetImageData(context,aRect)
{
	var imageData;
	try
	{
		try
		{
			imageData = context.getImageData(aRect.origin.x, aRect.origin.y, aRect.size.width, aRect.size.width);//.data;
		}
		catch (e)
		{
			if (CPBrowserIsEngine(CPGeckoBrowserEngine))
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				imageData = context.getImageData(aRect.origin.x, aRect.origin.y, aRect.size.width, aRect.size.width);//.data;
			}// else
				//CPLog(@"ERROR: Unable to access image data %@",e);
		}
	}
	catch (e)
	{
		//throw new Error("unable to access image data: " + e);
		//CPLog(@"ERROR: Unable to access image data %@",e);
	}
	return imageData;
}

function CGContextPutImageData(ctx,imageData,point)
{
	ctx.putImageData(imageData,point.x,point.y);
}
