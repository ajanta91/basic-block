import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const icon = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="3" width="7" height="7" stroke="currentColor" />
		<rect x="14" y="3" width="7" height="7" stroke="currentColor" />
		<rect x="3" y="14" width="7" height="7" stroke="currentColor" />
		<rect x="14" y="14" width="7" height="7" stroke="currentColor" />
	</svg>
);

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save,
} );
