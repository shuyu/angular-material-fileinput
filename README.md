# angular-material-fileinput
A Html file input enhance base on angular material.

It's only support image file type now.

## Demo

[Live Demo](http://shuyu.github.io/angular-material-fileinput/example/)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install lf-ng-md-file-input --save
```

Add `dist/lf-ng-md-file-input.js` and `dist/lf-ng-md-file-input.css` to your index.html.

```html
<link rel="stylesheet" href="../bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.css">
<script src="../bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js"></script>
```

Add `lfNgMdFileInput` as a module dependency for your module.

```js
var app = angular.module('app', ['ngMaterial','ngMdIcons','lfNgMdFileInput']);
```

```html

<lf-ng-md-file-input lf-files="files" lf-placeholder="Pick Image" multiple drag preview></lf-ng-md-file-input>

```

## Release History
 
* v0.1.0 - Initial release.
