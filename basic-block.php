<?php
/**
 * Plugin Name:       Basic Block
 * Plugin URI: 		  https://wpnonce.com/
 * Description:       Blocks collection for WordPress Gutenberg editor.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       basic-block
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}


// WP enqueue scripts and styles
function wp_nonce_block_enqueue_assets()
{

	// Enqueue block editor assets.
	wp_enqueue_style(
		'basic-block-components',
		plugin_dir_url(__FILE__) . 'assets/css/components.css',
		[],
		'1.0.0',
		false // Load in footer
	);
	wp_enqueue_script('flip');
	wp_enqueue_style('flip');
	wp_enqueue_script('main-script');
}
add_action('enqueue_block_editor_assets', 'wp_nonce_block_enqueue_assets');

// Register assets globally
function wp_nonce_block_register_assets()
{
	wp_register_script(
		'isotope',
		plugin_dir_url(__FILE__) . 'assets/js/isotope.min.js',
		['jquery'],
		'3.0.6',
		true
	);

	wp_register_script(
		'magnific-popup',
		plugin_dir_url(__FILE__) . 'assets/js/magnific-popup.min.js',
		['jquery'],
		'1.1.0',
		true
	);

	wp_register_style(
		'magnific-popup',
		plugin_dir_url(__FILE__) . 'assets/css/magnific-popup.css',
		[],
		'1.1.0'
	);

	wp_register_script(
		'gallery-init',
		plugin_dir_url(__FILE__) . 'assets/js/gallery-init.js',
		['jquery', 'isotope', 'imagesloaded', 'magnific-popup'],
		'1.0.0',
		true
	);

	wp_register_style(
		'flip',
		plugin_dir_url(__FILE__) . 'assets/css/flip.min.css',
		[],
		'1.0.0'
	);
	wp_register_script(
		'flip',
		plugin_dir_url(__FILE__) . 'assets/js/flip.min.js',
		['jquery'],
		'1.0.0',
		true
	);

	wp_register_script('main-script', plugin_dir_url(__FILE__) . 'assets/js/main.js', ['jquery'], '1.0.0', true);
}
add_action('init', 'wp_nonce_block_register_assets');

// Enqueue frontend assets for ImageGallery block
function wp_nonce_block_frontend_assets()
{
	// Only load on frontend, not in admin
	if (is_admin()) {
		return;
	}
}
add_action('wp_enqueue_scripts', 'wp_nonce_block_frontend_assets');

// Enqueue gallery dependencies when block is present
function wp_nonce_block_enqueue_gallery_assets()
{
	if (has_block('basic-block/image-gallery')) {
		wp_enqueue_script('isotope');
		wp_enqueue_script('imagesloaded');
		wp_enqueue_style('magnific-popup');
		wp_enqueue_script('magnific-popup');
		wp_enqueue_script('gallery-init');
	}

	if (has_block('basic-block/countdown')) {
		wp_enqueue_script('flip');
		wp_enqueue_style('flip');
	}

	/* Main Scripts ====== */
	wp_enqueue_script('main-script');
}
add_action('wp_enqueue_scripts', 'wp_nonce_block_enqueue_gallery_assets', 20);
// Register 'WP Nonce block' category
function wp_nonce_block_category($categories)
{
	return array_merge(
		$categories,
		[
			[
				'slug' => 'wp-nonce-blocks', // Unique category slug
				'title' => __('WP Nonce Blocks', 'basic-block'), // Display name
				'icon' => 'open-folder', // Dashicon (optional)
			],
		]
	);
}
add_filter('block_categories_all', 'wp_nonce_block_category', 10, 1);

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function basic_block_init()
{
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */

	if (function_exists('wp_register_block_types_from_metadata_collection')) {
		wp_register_block_types_from_metadata_collection(__DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php');
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if (function_exists('wp_register_block_metadata_collection')) {
		wp_register_block_metadata_collection(__DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php');
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';

	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/blocks/{$block_type}");
	}


}
add_action('init', 'basic_block_init');