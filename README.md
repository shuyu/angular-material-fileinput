# angular-material-fileinput

A Html file input enhance base on angular material.

It's support multiple file type .

![screensho 0](http://shuyu.github.io/angular-material-fileinput/resources/screenshot_0.png)

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

## Release History
 
* v0.1.0 - Initial release.
* v1.0.0 - Standard features.
