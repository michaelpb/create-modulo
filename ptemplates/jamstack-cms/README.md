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
    - Will start a "dev server" at <https://127.0.0.1:3334/>
- `npm run startcms`
    - Runs backend for GUI Decap CMS: <https://127.0.0.1:3334/cms/static/admin/>
    - This is intended for local content editing or debugging (NOT a live site)
    - Note: Run this at the same time as `npm start` (e.g. in another terminal)
- `npm run build`
    - Will do a static site build, and output to `build` bundling your
      JavaScript and CSS
    - Note: Until a Modulo DOM implementation is complete, in order to run the
      SSG build you may have to install the `puppeteer` dependency:
        - `npm install puppeteer`


# Publishing checklist

Launch your site on any web server that can host static sites (most of them).

* [ ] To publish, make sure your web-server is serving the `build` directory.
  Note that if you are publishing with GitHub Pages, then it must be `docs`, so
  change `modulo.json` to `"output": "docs"` instead.

* [ ] To enable the CMS on the remote server, you will need to reconfigure
  Decap CMS to work with whatever authentication system you want to use. The
  Decap CMS is originally by the Netlify web-hosting service, which recommends
  use of GitHub (among others) as an authenticator. Read more on configuring
  this: <https://decapcms.org/docs/github-backend/>

* [ ] **Replace this README with one specific to your project!**

