[![npm version](https://badge.fury.io/js/%40fluidnext-polymer%2Fpaper-chip.svg)](https://badge.fury.io/js/%40fluidnext-polymer%2Fpaper-chip)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@fluidnext-polymer/paper-chip)

# Paper Chip
Is a [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview) web component that provides a material design [chip](https://www.google.com/design/spec/components/chips.html) and a section of chips.


See: [Demo](https://www.webcomponents.org/element/@fluidnext-polymer/paper-chips/demo/demo/index.html).


## Usage
### Installation
`npm install --save @fluidnext-polymer/paper-chip`

### In an html file
```html
<paper-chip>Apples</paper-chip>
<paper-chip selectable>Oranges</paper-chip>
<paper-chip selectable>Pears</paper-chip>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-icon';
import '@polymer/paper-styles/default-theme';
import '@fluidnext-polymer/paper-chip/paper-chip';
import '@fluidnext-polymer/paper-chip/paper-chip-icons';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
        <paper-chip>Apples</paper-chip>   
        <paper-chip selectable>Oranges</paper-chip>
        <paper-chip selectable>Pears</paper-chip>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Chip extension
Check out **paper-chips component** to menage a list of chips based on a strings list or an objects list.

## License

    This software is licensed under the Apache 2 license, quoted below.

    Copyright 2011-2015 Collaborne B.V. <http://github.com/Collaborne/>

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy of
    the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations under
    the License.
    
