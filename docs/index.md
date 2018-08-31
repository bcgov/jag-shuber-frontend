# Project Architecture

## Conventions

### `Index.ts` Files
- To reduce the complexity of project structure, this projet **DOES NOT** use `index.ts` files.

### Static Assets

In this project we leverage webpack to handle our static assets, this means that we place static assets within our `src` directory and then import the asset within our source code to use it.  This technique can be used for all assets (given that there is a webpack loader setup for it (see [`webpack.common.js`](../config/webpack.common.js) for rules that are used within the [`dev`](../config/webpack.config.dev.js) and [`prod`](../config/webpack.config.prod.js) configs)).  These loaders are responsible for resolving `imports` of assets (based on extension).  This is what allows for us to load assets directly into source code and use them.  For example to use an image within one of your components:

```ts
import avatarImg from '../../assets/images/avatar.png';

export default class extends React.Component {
    render(){
        return (
            <div>
                <Image src={avatarImg} />
            </div>
        )
    }
}
```

There are also other examples throughout the codebase of loading `css` files in components which tells webpack to include that css file in the head of the document.

#### SVG's
One caveat to this system is the `SVG` type.  We use the [react-svg-loader](https://www.npmjs.com/package/react-svg-loader) which basically converts the SVG file into a react component allowing us to programmatically change colors, sizes etc on the SVG (Which you normally can't do without modifying the `.svg` file).  That being said, there are still times when you need to load the svg file just as you would a normal image file.  For instance if using an svg as a background image within a css file, a react component will do you no good and instead you need the url to the file.  For this purpose you can use the `url` query parameter to instruct webpack to use the file loader instead of the default.  An example of this in use can be seen in the following snippet from a css file:

```css
.sheriff-duty-bar.drop-target.is-over.can-drop.is-overlap.dark .drop-target-overlay {
    background-image: url("./dutyRoster-warning-black.svg?url");
}

.sheriff-duty-bar.drop-target.is-over.can-drop.is-overlap.light .drop-target-overlay {
    background-image: url("./dutyRoster-warning-white.svg?url");
}
```

### Imports

When importing more than one item from an external library, place each import on its own line; this makes imports easier to comment out when debugging / testing an idea.

```ts
import {
    Glyphicon,
    Button,
    Image
} from 'react-bootstrap'
```
vs
```ts
import {Glyphicon, Button, Image} from 'react-bootstrap'
```

### Components

* Components are visual representations of business objects and data, and should not contain state (_i.e._ should be "dumb components")
* Components live in the Components direcotry, and should only be placed in a folder (by the same name as the compoent) if the component requires its own style sheet or contributing components. 
* Components should be named using the following convention: _domain_component description, where _domain_ is a major business domain for the application (_e.g._ Assignment, Sheriff, Courthouse, Region, etc.); this helps to group related components alphabetically within the filesystem and vscode.

### Containers
* Containers are higher level components that wire state from Redux into regular Components. 
* Containers live in the Container directory.
* Containers should be named using the same convention as Components (see above).

## Useful Documentation
* [Redux](https://redux.js.org/)
* [React-Bootstrap Components](https://react-bootstrap.github.io/components/alerts/)
* [Bootstrap CSS](https://bootstrapcreative.com/resources/bootstrap-3-css-classes-index/)
* [Redux Forms](https://redux-form.com/7.2.0/docs/gettingstarted.md/)
