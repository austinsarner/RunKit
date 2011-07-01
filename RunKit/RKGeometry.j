/*
 * RKGeometry.j
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

function RKLocationMake(x,y,z)
{
	var location = {};
	location.x = x;
	location.y = y;
	location.z = z;
	return location;
}

function RKSizeMake(width,height,depth)
{
	var size = {};
	size.width = width;
	size.height = height;
	size.depth = depth;
	return size;
}

function RKFrameMake(location,size)
{
	var frame = {};
	frame.location = RKLocationCreateCopy(location);
	frame.size = RKSizeCreateCopy(size);
	return frame;
}

function CPStringFromLocation(location)
{
	return [CPString stringWithFormat:@"{%f,%f,%f}",location.x,location.y,location.z];
}

/*function RKLocationGetHypotenuse(point)
{
	var aSqr = point.x * point.x;
	var bSqr = point.y * point.y;
	return Math.sqrt(aSqr + bSqr);
}

function RKLocationUnitVector(point)
{
	var absX = Math.abs(point.x);
	var absY = Math.abs(point.y);
	var absZ = Math.abs(point.z);
	var unitScaleFactor = (absX > absY)?absX:absY;
	if (absZ > unitScaleFactor) unitScaleFactor = absZ;
	
	return CGPointMake(point.x/unitScaleFactor,point.y/unitScaleFactor);
}*/

/*function RKFrameMake(x,y,z,width,height,depth)
{
	return RKFrameMake(RKLocationMake(x,y,z),RKSizeMake(width,height,depth));
}*/

// Copying

function CGRectWithFrame(aFrame)
{
	var rect = CGRectMake(0,0,0,0);
	rect.size.width = aFrame.size.width * aFrame.location.z;
	rect.size.height = aFrame.size.height * aFrame.location.z;
	
	var compRect = [[[RKEnvironment sharedEnvironment] composition] rect];
	var quadWidth = compRect.size.width/2;
	var quadHeight = compRect.size.height/2;
	
	var xLocation = CGRectGetMidX(compRect) + quadWidth * aFrame.location.x;
	var yLocation = CGRectGetMidY(compRect) + quadHeight * aFrame.location.y;
	
	rect.origin.x = xLocation - rect.size.width/2;
	rect.origin.y = yLocation - rect.size.height/2;
	return rect;
}

function RKXUnitsFromPixels(pixels)
{
	var compRect = [[[RKEnvironment sharedEnvironment] composition] rect];
	var quadWidth = (compRect.size.width / 2);
	return (pixels / quadWidth);
}

function RKYUnitsFromPixels(pixels)
{
	var compRect = [[[RKEnvironment sharedEnvironment] composition] rect];
	var quadHeight = (compRect.size.height / 2);
	return (pixels / quadHeight);
}

/*function RKFrameWithRect(aRect,zIndex)
{
	var compRect = [[self composition] rect];
	var quadWidth = compRect.size.width/2;
	var quadHeight = compRect.size.height/2;
	
	var xLocation = 1-(quadWidth/rect.origin.x);
	var yLocation = 1-(quadHeight/rect.origin.y);
	
	var frame = RKFrameMake(RKLocationMake(0,0,0),RKSizeMake(0,0,0));
	frame.size.width = aRect.size.width * zIndex;
	frame.size.height = aRect.size.height * zIndex;
	
	rect.size.width = aFrame.size.width * aFrame.location.z;
	rect.size.height = aFrame.size.height * aFrame.location.z;
	
}*/

function RKLocationCreateCopy(aLocation)
{
	return RKLocationMake(aLocation.x,aLocation.y,aLocation.z);
}

function RKSizeCreateCopy(aSize)
{
	return RKSizeMake(aSize.width,aSize.height,aSize.depth);
}

function RKFrameCreateCopy(frame)
{
	return RKFrameMake(frame.location,frame.size);
}

function RKFrameIsEqualToFrame(frame,otherFrame)
{
	return (frame.location.x == otherFrame.location.x && frame.location.y == otherFrame.location.y && frame.location.z == otherFrame.location.z
				&& frame.size.width == otherFrame.size.width && frame.size.height == otherFrame.size.height && frame.size.depth == otherFrame.size.depth);
}