import { registerBlockType } from '@wordpress/blocks';

// Import Blocks
import * as Heading from './blocks/Heading';
import * as Button from './blocks/Button';
import * as ImageGallery from './blocks/ImageGallery';

// Register Blocks
const registerBlock = (block) => {
	if (!block) return;
	registerBlockType(`basic-block/${block.name}`, block.settings);
	console.log('block name:', block.name);
};

[Button, Heading, ImageGallery].forEach(registerBlock);