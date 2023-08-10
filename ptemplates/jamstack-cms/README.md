This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

This template has Netlify's Decap CMS ready to go. This allows you and your
teammates to upload content and commit changes with a rich text editor, without
any coding or git knowledge. More info: <https://decapcms.org/>


# Usage

## Relevant files to edit

- You will mostly work in the `src/` directory

- Edit the Markdown files in `src/articles/` to add article or blog-style
  content (these can also be edited via CMS, see below)

- Edit the files in `src/static/` to work on the CSS, JS, and HTML Templates
  that create Modulo Components (including the "x-Page" layout template)


## Using local dev server

Use the following commands:

- `npm start`
    - Will start a "dev server" at <http://127.0.0.1:8080/>
- `npm run startcms`
    - Runs backend for GUI Decap CMS: <http://127.0.0.1:8080/static/cms/admin/>
    - This is intended for local content editing or debugging (NOT a live site)
    - Note: Run this at the same time as `npm start` (e.g. in another terminal)
- `npm run build`
    - Useful for testing server-side rendering: Generates automated static site
      build locally, and output to `build` with bundles and SSR files.
    - Note: Will install modulocli scripts, and heavy-weight "pupeteer" packages.


# Publishing checklist

Launch your site on any web server that can host static sites (most of them).

* [ ] To publish, make sure your web-host is configured to run `npm run build`
  when code is updated, and serve the `build` directory. Some might work with
  minimal configuration, otherwise you may have to build locally.

* [ ] To enable the CMS on the remote server, you will need to reconfigure
  Decap CMS to work with whatever authentication system you want to use. The
  Decap CMS is originally by the Netlify web-hosting service, which recommends
  use of GitHub (among others) as an authenticator. Read more on configuring
  this: <https://decapcms.org/docs/github-backend/>

* [ ] **Replace this README with one specific to your project!**

