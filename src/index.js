/**
 * Tailwind CSS - must be imported before block imports
 * so Tailwind utilities are available to all blocks.
 */
import './tailwind.css';

/**
 * Blocks are self-registered via their index.js files.
 * Importing them triggers the registration.
 */
import './blocks/Button';
import './blocks/Countdown';
import './blocks/Heading';
import './blocks/ImageGallery';