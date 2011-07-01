/*
 * RKImage.j
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

@import <Foundation/CPObject.j>

RKImageLoadStatusInitialized    = 0;
RKImageLoadStatusLoading        = 1;
RKImageLoadStatusCompleted      = 2;
RKImageLoadStatusCancelled      = 3;
RKImageLoadStatusInvalidData    = 4;
RKImageLoadStatusUnexpectedEOF  = 5;
RKImageLoadStatusReadError      = 6;

var imagesForNames = { };

@implementation RKImage : CPObject
{
    CGSize      _size;
    CPString    _filename;
    CPString    _name;

    id          _delegate;
    unsigned    _loadStatus;

    Image       _image;
}

- (id)init
{
    return [self initByReferencingFile:@"" size:CGSizeMake(-1, -1)];
}

/*!
    Initializes the image, by associating it with a filename. The image
    denoted in \c aFilename is not actually loaded. It will
    be loaded once needed.
    @param aFilename the file containing the image
    @param aSize the image's size
    @return the initialized image
*/
- (id)initByReferencingFile:(CPString)aFilename size:(CGSize)aSize
{
    self = [super init];

    if (self)
    {
        _size = CPSizeCreateCopy(aSize);
        _filename = aFilename;
        _loadStatus = RKImageLoadStatusInitialized;
    }

    return self;
}

/*!
    Initializes the image. Loads the specified image into memory.
    @param aFilename the image to load
    @param aSize the size of the image
    @return the initialized image.
*/
- (id)initWithContentsOfFile:(CPString)aFilename size:(CGSize)aSize
{
    self = [self initByReferencingFile:aFilename size:aSize];

    if (self)
        [self load];

    return self;
}

/*!
    Initializes the receiver with the contents of the specified
    image file. The method loads the data into memory.
    @param aFilename the file name of the image
    @return the initialized image
*/
- (id)initWithContentsOfFile:(CPString)aFilename
{
    self = [self initByReferencingFile:aFilename size:CGSizeMake(-1, -1)];

    if (self)
        [self load];

    return self;
}

/*!
    Returns the path of the file associated with this image.
*/
- (CPString)filename
{
    return _filename;
}

/*!
    Sets the size of the image.
    @param the size of the image
*/
- (void)setSize:(CGSize)aSize
{
    _size = CGSizeMakeCopy(aSize);
}

/*!
    Returns the size of the image
*/
- (CGSize)size
{
    return _size;
}

/*!
    Sets the receiver's delegate.
    @param the delegate
*/
- (void)setDelegate:(id)aDelegate
{
    _delegate = aDelegate;
}

/*!
    Returns the receiver's delegate
*/
- (id)delegate
{
    return _delegate;
}

/*!
    Returns the load status, which will be RKImageLoadStatusCompleted if the image data has already been loaded.
*/
- (unsigned)loadStatus
{
    return _loadStatus;
}

/*!
    Loads the image data from the file into memory. You
    should not call this method directly. Instead use
    one of the initializers.
*/

- (void)load
{
    if (_loadStatus == RKImageLoadStatusLoading || _loadStatus == RKImageLoadStatusCompleted)
        return;

    _loadStatus = RKImageLoadStatusLoading;

#if PLATFORM(DOM)
    _image = new Image();

    var isSynchronous = YES;

    // FIXME: We need a better/performance way of doing this.
    _image.onload = function ()
        {
            if (isSynchronous)
                window.setTimeout(function() { [self _imageDidLoad]; }, 0);
            else
            {
                [self _imageDidLoad];
                [[CPRunLoop currentRunLoop] limitDateForMode:CPDefaultRunLoopMode];
            }
            [self _derefFromImage];
        }

    _image.onerror = function ()
        {
            if (isSynchronous)
                window.setTimeout(function() { [self _imageDidError]; }, 0);
            else
            {
                [self _imageDidError];
                [[CPRunLoop currentRunLoop] limitDateForMode:CPDefaultRunLoopMode];
            }
            [self _derefFromImage];
        }

    _image.onabort = function ()
        {
            if (isSynchronous)
                window.setTimeout(function() { [self _imageDidAbort]; }, 0);
            else
            {
                [self _imageDidAbort];
                [[CPRunLoop currentRunLoop] limitDateForMode:CPDefaultRunLoopMode];
            }
            [self _derefFromImage];
        }

    _image.src = _filename;

    // onload and friends may fire after this point but BEFORE the end of the run loop,
    // crazy, I know. So don't set isSynchronous here, rather wait a bit longer.
    window.setTimeout(function() { isSynchronous = NO; }, 0);
#endif
}

/* @ignore */
- (void)_derefFromImage
{
    _image.onload = null;
    _image.onerror = null;
    _image.onabort = null;
}

/* @ignore */
- (void)_imageDidLoad
{
    _loadStatus = RKImageLoadStatusCompleted;

    // FIXME: IE is wrong on image sizes????
    if (!_size || (_size.width == -1 && _size.height == -1))
        _size = CGSizeMake(_image.width, _image.height);

    [[CPNotificationCenter defaultCenter]
        postNotificationName:RKImageDidLoadNotification
        object:self];

    if ([_delegate respondsToSelector:@selector(imageDidLoad:)])
        [_delegate imageDidLoad:self];
}

/* @ignore */
- (void)_imageDidError
{
    _loadStatus = RKImageLoadStatusReadError;

    if ([_delegate respondsToSelector:@selector(imageDidError:)])
        [_delegate imageDidError:self];
}

/* @ignore */
- (void)_imageDidAbort
{
    _loadStatus = RKImageLoadStatusCancelled;

    if ([_delegate respondsToSelector:@selector(imageDidAbort:)])
        [_delegate imageDidAbort:self];
}

@end