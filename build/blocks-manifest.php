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
	)
);
