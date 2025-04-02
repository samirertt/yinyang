import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { fill } from '@cloudinary/url-gen/actions/resize';

export const cld = new Cloudinary({
    cloud: {
        cloudName: 'dx8qt8hiz'
    }
});

// Default image transformations
export const defaultImageTransformations = {
    quality: quality('auto'),
    resize: fill().width(400).height(400).gravity('auto')
}; 