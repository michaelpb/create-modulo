This is a Modulo.js app created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

# Usage

## Relevant files to edit

- You will mostly work in the `src/` directory

- Component development (uses HTML, CSS, and Modulo Templating  / CParts):
  Edit the files in `src/static/components` to work on the CSS and HTML
  Templates that create Modulo Components (including the core "x-App")

- JavaScript CPart Development (uses JS and integrating with backend):
  Use the `src/static/cparts/` directory to write Component Parts in JavaScript
  that integrate your app with backend services and/or third-party JavaScript

## Using local server and CMS

Use the following commands:

- `npm start`
    - Starts a simple HTTP server for testing: <http://127.0.0.1:3334/>
- `npm run build`
    - Generates static site build locally in `build/` directory
    - Useful for testing server-side rendering
    - Note: This requires dependencies. It runs `npm install modulocli` first.


# Publishing checklist

Launch your site on any web server that can host static sites, ideally one that
can run a "build step" before serving for "server-side rendering".

* [ ] To publish, make sure your web-host is configured to run `npm run build`
  when code is updated, and serve the `build` directory. Some might work with
  minimal configuration, otherwise you may have to manually build locally.

* [ ] **Replace this README with one specific to your project!**

