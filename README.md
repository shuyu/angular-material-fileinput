# Angular Material File Input

A Html file input enhance base on angular material.

This directive try to make input file or file upload intuitive.

![screensho 0](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_0.png)

![screensho 1](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_1.png)

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

<!-- Angular Material Fileinput -->
<link rel="stylesheet" href="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.css">
<script src="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js"></script>

```

Add `lfNgMdFileInput` as a module dependency for your module.

```js
var app = angular.module('app', ['ngMaterial','lfNgMdFileInput']);
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

###OPTION

```html

<style>
	.myBrowse{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjQzdCMTNDIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS43LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBDMTA3LDM3LjgsMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Ik02MS4zLDkzLjNjLTUuOSwwLTExLjQtMi4zLTE1LjYtNi40cy02LjQtOS43LTYuNC0xNS42YzAtNS45LDIuMy0xMS40LDYuNC0xNS42YzQuMi00LjIsOS43LTYuNCwxNS42LTYuNCAgICBjNS45LDAsMTEuNCwyLjMsMTUuNiw2LjRjOC42LDguNiw4LjYsMjIuNSwwLDMxLjFDNzIuNyw5MSw2Ny4yLDkzLjMsNjEuMyw5My4zeiBNNjEuMyw1Ny4zYy0zLjcsMC03LjMsMS41LTkuOSw0LjEgICAgYy0yLjYsMi42LTQuMSw2LjItNC4xLDkuOWMwLDMuNywxLjUsNy4zLDQuMSw5LjljMi42LDIuNiw2LjIsNC4xLDkuOSw0LjFjMy43LDAsNy4zLTEuNSw5LjktNC4xYzUuNS01LjUsNS41LTE0LjMsMC0xOS44ICAgIEM2OC42LDU4LjgsNjUuMSw1Ny4zLDYxLjMsNTcuM3oiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjcwNzEgMC43MDcxIC0wLjcwNzEgMC43MDcxIDg2LjQzNDggLTI5Ljk0NDYpIiB3aWR0aD0iMjMiIHg9IjY3LjkiIHk9Ijg1LjQiLz48L2c+PC9nPjwvc3ZnPg==);
    }
    .myRemove{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTM2MjQ5IiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS42LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBTMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Ik04MSw5Nkg0N1Y3MGgzNFY5NnogTTUzLDkwaDIyVjc2SDUzVjkweiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjYiIHdpZHRoPSIzNCIgeD0iNDciIHk9IjU4Ii8+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iMTIiIHdpZHRoPSI2IiB4PSI2MSIgeT0iNTIiLz48L2c+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iMjQiIHdpZHRoPSI2IiB4PSI2MSIgeT0iNzEiLz48L2c+PC9nPjwvc3ZnPg==);
    }
    .myCaption{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTk3ODNDIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS42LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBTMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iOCIgd2lkdGg9IjI4IiB4PSI1OCIgeT0iNTYiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB3aWR0aD0iMjgiIHg9IjU4IiB5PSI3MCIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjgiIHdpZHRoPSIyOCIgeD0iNTgiIHk9Ijg0Ii8+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iOCIgd2lkdGg9IjgiIHg9IjQyIiB5PSI1NiIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjgiIHdpZHRoPSI4IiB4PSI0MiIgeT0iNzAiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB3aWR0aD0iOCIgeD0iNDIiIHk9Ijg0Ii8+PC9nPjwvZz48L3N2Zz4=);
    }
    .myUnknow{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTlCNTNBIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS43LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBDMTA3LDM3LjgsMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxjaXJjbGUgY3g9IjY0IiBjeT0iODkiIGZpbGw9IiNGRkZGRkYiIHI9IjUiLz48L2c+PGc+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSIyOCIgd2lkdGg9IjgiIHg9IjYwIiB5PSI1MCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
    }
</style>

<script type="text/javascript">
	...
    $scope.optoin = {
        "browseIconCls":"myBrowse",
        "removeIconCls":"myRemove",
        "captionIconCls":"myCaption",
        "unknowIconCls":"myUnknow"
    }
    ...
</script>

<lf-ng-md-file-input lf-files="files" lf-option="option"></lf-ng-md-file-input>
<md-button class="md-raised md-warn" ng-click="api.removeAll()">remove all</md-button>

```

| Name           | Description |
| :------------- | :---------------- |
| browseIconCls  | Set class to browse icon  |
| removeIconCls  | Set class to remove icon  |
| captionIconCls | Set class to caption icon  |
| unknowIconCls  | Set class to unknow icon  |

## Release History
 
* v0.1.0
	* Initial release.
* v1.0.0
	* Standard features.
* v1.1.0 
	* New attributes: lf-drag-and-drop-label, lf-browse-label and lf-remove-label.
* v1.2.0
	* New lf-api attribute bind to interaction with directive.
* v1.3.0    
	* Make template much compatible with angular material.
	* Remove angular-material-icons dependencies and Add new lf-option attribute to make icon changeable.

