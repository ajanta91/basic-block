/**
 * Countdown Block - Frontend JavaScript
 */
( function () {
	'use strict';

	/**
	 * Initialize all countdown blocks on the page
	 */
	function initCountdowns() {
		const countdowns = document.querySelectorAll( '.bb-countdown-wrapper' );

		countdowns.forEach( function ( countdown ) {
			initSingleCountdown( countdown );
		} );
	}

	/**
	 * Initialize a single countdown block
	 *
	 * @param {HTMLElement} wrapper - The countdown wrapper element
	 */
	function initSingleCountdown( wrapper ) {
		const targetDate = wrapper.dataset.targetDate;
		const targetTime = wrapper.dataset.targetTime || '00:00';
		const expiryAction = wrapper.dataset.expiryAction || 'message';
		const expiryMessage = wrapper.dataset.expiryMessage || 'Countdown expired!';
		const expiryRedirect = wrapper.dataset.expiryRedirect || '';

		if ( ! targetDate ) {
			return;
		}

		const targetDateTime = new Date( `${ targetDate }T${ targetTime }` );
		const inner = wrapper.querySelector( '.bb-countdown-inner' );
		const expiredEl = wrapper.querySelector( '.bb-countdown-expired' );

		const daysEl = wrapper.querySelector( '[data-unit="days"]' );
		const hoursEl = wrapper.querySelector( '[data-unit="hours"]' );
		const minutesEl = wrapper.querySelector( '[data-unit="minutes"]' );
		const secondsEl = wrapper.querySelector( '[data-unit="seconds"]' );

		/**
		 * Update the countdown display
		 */
		function updateCountdown() {
			const now = new Date();
			const diff = targetDateTime - now;

			// Countdown has expired
			if ( diff <= 0 ) {
				handleExpiry();
				return false;
			}

			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );

			if ( daysEl ) {
				daysEl.textContent = String( days ).padStart( 2, '0' );
			}
			if ( hoursEl ) {
				hoursEl.textContent = String( hours ).padStart( 2, '0' );
			}
			if ( minutesEl ) {
				minutesEl.textContent = String( minutes ).padStart( 2, '0' );
			}
			if ( secondsEl ) {
				secondsEl.textContent = String( seconds ).padStart( 2, '0' );
			}

			return true;
		}

		/**
		 * Handle countdown expiry based on the configured action
		 */
		function handleExpiry() {
			switch ( expiryAction ) {
				case 'hide':
					wrapper.style.display = 'none';
					break;

				case 'redirect':
					if ( expiryRedirect ) {
						window.location.href = expiryRedirect;
					}
					break;

				case 'message':
				default:
					if ( inner ) {
						inner.style.display = 'none';
					}
					if ( expiredEl ) {
						expiredEl.style.display = 'block';
					}
					break;
			}
		}

		// Initial update
		const isRunning = updateCountdown();

		// Start interval only if countdown is still running
		if ( isRunning ) {
			const interval = setInterval( function () {
				const stillRunning = updateCountdown();
				if ( ! stillRunning ) {
					clearInterval( interval );
				}
			}, 1000 );
		}
	}

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCountdowns );
	} else {
		initCountdowns();
	}
} )();
