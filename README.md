# browser-image-preloader

## install

Add script to your document:

```html
<script type="text/javascript" src="browser-image-preloader/index.js"></script>
```

## usage

Preload images:

```js
browserImagePreloader('path/to/image1.png', 'path/to/image2.png', 'path/to/image3.png').load();
```

Add handlers:

```js
browserImagePreloader('path/to/image1.png', 'path/to/image2.png', 'path/to/image3.png')
.loaded( function (img, percent) {
  console.log(img.src, 'loaded at', percent);
})
.done( function () {
  console.log('finished loading images');
}).load();
```

## notes

We can treat `browser-image-preloader` as a [CommonJS](https://webpack.github.io/docs/commonjs.html) module if using something like [Browserify](http://browserify.org/):

```js
var preloader = require('browser-image-preloader');
```
