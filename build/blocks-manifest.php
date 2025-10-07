<?php
// This file is generated. Do not modify it manually.
return array(
	'Button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'basic-block/button',
		'version' => '1.0.0',
		'title' => 'Button [BB]',
		'category' => 'wp-nonce-blocks',
		'description' => 'Display a Button block.',
		'example' => array(
			
		),
		'attributes' => array(
			'buttonLabel' => array(
				'type' => 'string',
				'default' => 'Click Me'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => '#'
			),
			'openInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'buttonClass' => array(
				'type' => 'string',
				'default' => 'btn-primary'
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '',
					'right' => '',
					'bottom' => '',
					'left' => ''
				)
			),
			'margin' => array(
				'type' => 'object',
				'default' => array(
					'top' => '',
					'right' => '',
					'bottom' => '',
					'left' => ''
				)
			)
		),
		'supports' => array(
			'color' => array(
				'background' => true,
				'text' => true
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'fontFamily' => true,
				'fontWeight' => true,
				'textTransform' => true,
				'textDecoration' => true
			)
		),
		'textdomain' => 'basic-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'Heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'basic-block/heading',
		'version' => '0.1.0',
		'title' => 'Heading [BB]',
		'category' => 'wp-nonce-blocks',
		'description' => 'Display a Button block.',
		'example' => array(
			
		),
		'attributes' => array(
			'fallbackCurrentYear' => array(
				'type' => 'string'
			),
			'showStartingYear' => array(
				'type' => 'boolean'
			),
			'startingYear' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'color' => array(
				'background' => false,
				'text' => true
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true
			)
		),
		'textdomain' => 'basic-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'ImageGallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'basic-block/image-gallery',
		'version' => '1.0.0',
		'title' => 'Image Gallery [BB]',
		'category' => 'wp-nonce-blocks',
		'description' => 'Display an image gallery with optional lightbox (Magnific Popup).',
		'keywords' => array(
			'gallery',
			'images',
			'lightbox'
		),
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object'
				)
			),
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'gutter' => array(
				'type' => 'number',
				'default' => 15
			),
			'enableLightbox' => array(
				'type' => 'boolean',
				'default' => true
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'hoverEffect' => array(
				'type' => 'string',
				'default' => 'zoom'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'basic-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
