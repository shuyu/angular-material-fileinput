# Angular Material File Input

A Html file input enhance base on angular material.

This directive try to make input file or file upload intuitive.

![screensho 0](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_0.png)

## Demo

[Live Demo](http://shuyu.github.io/angular-material-fileinput/example/)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install lf-ng-md-file-input --save
```

Add `dist/lf-ng-md-file-input.js` and `dist/lf-ng-md-file-input.css` to your index.html.

```html

<!-- Angular Material Dependencies -->
<link rel="stylesheet" href="./bower_components/angular-material/angular-material.min.css">
<script src="./bower_components/angular/angular.min.js"></script>
<script src="./bower_components/angular-animate/angular-animate.min.js"></script>
<script src="./bower_components/angular-aria/angular-aria.min.js"></script>
<script src="./bower_components/angular-material/angular-material.min.js"></script>

<!-- Angular Material Fileinput Dependencies -->
<link rel="stylesheet" href="./bower_components/angular-material-icons/angular-material-icons.css">
<script src="./bower_components/angular-material-icons/angular-material-icons.min.js"></script>

<!-- Angular Material Fileinput -->
<link rel="stylesheet" href="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.css">
<script src="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js"></script>

```

Add `lfNgMdFileInput` as a module dependency for your module.

```js
var app = angular.module('app', ['ngMaterial','ngMdIcons','lfNgMdFileInput']);
```

##Usage

This directive will return a array via lf-files attribute binding, the object in array contain some object include lfFile and lfDataUrl, that you can grab file and preview dataurl easily.

###Basic

```html

<lf-ng-md-file-input lf-files="files"></lf-ng-md-file-input>

```

###Accept

Accept attribute can set file extension (e.g: .png) or MIME type (e.g: image/*)

```html

<lf-ng-md-file-input lf-files="files" accept=".png"></lf-ng-md-file-input>

```

###Multiple

```html

<lf-ng-md-file-input lf-files="files" multiple></lf-ng-md-file-input>

```

###Placeholder

```html

<lf-ng-md-file-input lf-files="files" lf-placeholder="my placeholder"></lf-ng-md-file-input>

```

###Preview

```html

<lf-ng-md-file-input lf-files="files" preview></lf-ng-md-file-input>

```

###Drag

```html

<lf-ng-md-file-input lf-files="files" drag></lf-ng-md-file-input>

```

###Change labels

```html

<lf-ng-md-file-input lf-files="files" lf-drag-and-drop-label="Drag and Drop this" drag></lf-ng-md-file-input>

```

```html

<lf-ng-md-file-input lf-files="files" lf-browse-label="Browse..."></lf-ng-md-file-input>

```

```html

<lf-ng-md-file-input lf-files="files" lf-remove-label="Trash"></lf-ng-md-file-input>

```

###API

```html

<lf-ng-md-file-input lf-files="files" lf-api="api"></lf-ng-md-file-input>
<md-button class="md-raised md-warn" ng-click="api.removeAll()">remove all</md-button>

```

| Name           | Parameter   | Description |
| :------------- | :---------- | :---------------- |
| removeAll      |             | Remove all file  |

## Release History
 
* v0.1.0 - Initial release.
* v1.0.0 - Standard features.
* v1.1.0 - New attributes: lf-drag-and-drop-label, lf-browse-label and lf-remove-label.
* v1.2.0 - New lf-api attribute bind to interaction with directive.
