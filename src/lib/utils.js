import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge( {
	prefix: 'tw-',
} );

/**
 * Merges class names intelligently with Tailwind CSS tw- prefix support.
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts.
 */
export function cn( ...inputs ) {
	return twMerge( clsx( inputs ) );
}
