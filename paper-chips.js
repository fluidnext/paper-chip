import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-icon';
import './paper-chip';
import './icons/paper-chip-icons';


/**
 A list of chips that can be dynamically added/removed. This element can be used
 to let users enter a list of topics or names.

 ### Example

 ```html
 <paper-chips items=[[array]]></paper-chips>
 ```

 ### Items

 The items given via the `items` property can have these properties:

 Property | Description
 ---------|-------------
 `id`     | Unique identification of the item (required)
 `name`   | Display name of the item
 `fixed`  | Boolean to indicate whether this item can be removed (`fixed` is `false`) or not (`fixed` is `true`)

 @demo demo/index.html
 */
class PaperChips extends GestureEventListeners(PolymerElement) {
	static get template() {
		return html`
		<style>
			.chip {
				@apply --paper-chips-chip;
				margin-right: 5px;
				padding-right: 6px;
			    margin-left: 5px;
				padding-left: 6px;
				vertical-align: middle;
			}
			.chip:not([has-no-image]) {
				--paper-chip: {
					padding: 0 12px 0 0;
					overflow: hidden;
				}
			}

			img {
				width: 24px;
				height: 24px;
				border-radius: 50%;
				vertical-align: middle;
				margin-right: 4px;
			}
			.image-spacer {
				margin-left: 12px;
			}

			.delete {
				--iron-icon-height: 20px;
				--iron-icon-width: 20px;
				color: var(--disabled-text-color, #FCE1E5);
			}

			.chip[selectable]:hover .delete {
				color: black;
			}

			[hidden] {
				display: none;
			}
		</style>

		<template is="dom-repeat" items="[[items]]">
			<paper-chip
				class="chip"
				selectable
				index="[[index]]">
				<img src="[[_getImage(item)]]" hidden$="[[!_hasImage(item)]]" />
				[[_getName(item)]]
				<iron-icon
					icon="paper-chip:[[_getIcon(item)]]"
					class="delete"
					on-tap="_delete">	
                </iron-icon>
			</paper-chip>
		</template>`;
	}

	static get properties() {
		return {

			/**
             * Array of chips based on object
             *
             * ```js
             * [
             *  { id: 'apples', name: 'Apples', image:'apple.jpg' },
             *  { id: 'pears', name: 'Pears', image:'pear.jpg'},
             *  { id: 'bananas', name: 'Bananas', fixed: true}
             * ]
             * ```
             */

			/**
             * Array of chips based on strings
             *
             * ```js
             * [
             *  'Apples',
             *  'Pears',
             *  'Bananas'
             * ]
             * ```
			 * @type {Array}
             */
			items: {
				notify: true,
				type: Array,
                value: () => { return []; }
			},

			/**
			 * @type {String}
			 */
			textProperty: {
				type: String,
				value: 'name'
			},

			/**
			 * @type {String}
			 */
			imageProperty: {
				type: String,
				value: null
			},

			computeDataFn: {
				type: Function,
				value: null
			}
		};
	}

	/**
     * @param item
     * @private
     */
	_hasImage(item) {
		return this._getImage(item) !== '';
	}

	/**
     * @param item
     * @private
     */
	_getImage(item) {
		return item !== null && typeof item === 'object' && item[this.imageProperty] ? item[this.imageProperty] : '';
	}

	/**
     * @param item
     * @private
     */
	_getIcon(item) {
		return item !== null && typeof item === 'object' && item.fixed ? 'lock' : 'cancel';
	}

	/**
     * @param item
     * @return {*}
     * @private
     */
	_getName(item) {
		let data;
		switch (true) {
			case this.computeDataFn != null:
				data = this.computeDataFn(item);
				break;
			case  item !== null && typeof item === 'object' && item[this.textProperty] !== undefined :
				data = item[this.textProperty];
				break;
			default:
				data = item;
		}
		return data;
	}

	/**
     * Adds a chip
     * @param {object} item To be added chip
     * @returns {void}
	 * @public
     */
	add(item) {
		// Needs to use Polymer push to trigger data binding
		if (this.items.length === 0) {
			this.dispatchEvent(new CustomEvent('fill-items', {
				bubbles: true,
				composed: true
			}));
		}
		this.push('items', item);
	}

	/**
     * Removes a chip
     *
     * Note that this will also remove chips marked as 'fixed'.
     * @param {number} itemIndex Index of the to be removed chip
     * @returns {void}
	 * @public
     */
	remove(itemIndex) {
		if (this.items.length === 1) {
			this.dispatchEvent(new CustomEvent('empty-items', {
				bubbles: true,
				composed: true
			}));
		}
		// Needs to use Polymer splice to trigger data binding
		const item = this.splice('items', itemIndex, 1);

		this.dispatchEvent(new CustomEvent('delete-item', {
			bubbles: true,
			composed: true,
			detail: {
				item
			},
		}));
	}

	/**
     * Removes the last chip
     *
     * Note that this will also remove chips marked as 'fixed'.
     * @returns {void}
	 * @public
     */
	removeLast() {
		// Ignore if there are no chips left
		if (this.items.length === 0) {
			return;
		}

		this.remove(this.items.length - 1);
	}

	/**
     * Removes the first chip
     *
     * Note that this will also remove chips marked as 'fixed'.
     * @returns {void}
	 * @public
     */
	removeFirst() {
		// Ignore if there are no chips left
		if (this.items.length === 0) {
			return;
		}

		this.remove(0);
	}

	/**
     * Handles clicks on the delete icon
     * @param {any} e Event for deletion
     * @returns {void}
	 * @private
     */
    _delete(e) {
        this.remove(e.target.parentElement.index);
    }


    /**
     * Fired on add
     *
     * @event fill-items
     *
     *
    */

    /**
     * Fired on remove
     *
     * @event empty-items
     *
     *
    */
}

window.customElements.define('paper-chips', PaperChips);
