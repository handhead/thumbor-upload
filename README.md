# Thumbor Upload
Thumbor Upload

[Read the Docs](https://thumbor.readthedocs.io/en/latest/upload.html)

## Setup

Use NPM:

`npm install thumbor-upload`

or Yarn:

`yarn thumbor-upload`

## Usage

```javascript
// IMPORT
const { Upload } = require("thumbor-upload");

// CONFIGURE
const THUMBOR_URL = process.env.THUMBOR_URL || 'http://yourserver.com';
const upload = new Upload(THUMBOR_URL);
```

## Load buffer image

### From local image

```javascript
// ...

// STRATEGY 1: LOAD LOCAL BUFFER
const fs = require('fs');
const buffer = fs.readFileSync(path.resolve(__dirname, 'logo-thumbor.png'));

// ...
```

### From remote image

```javascript
// ...

// STRATEGY 2: LOAD REMOTE BUFFER
const fetch = require('node-fetch');
const response = await fetch('https://thumbor.readthedocs.io/en/latest/_images/logo-thumbor.png');
const buffer = await response.buffer();

// ...
```

## Create image

[Read the docs](https://thumbor.readthedocs.io/en/latest/posting_putting_deleting.html#posting)

```javascript
// ...

// POST A IMAGE
const { status, headers } = await upload.create(buffer, 'image/png', 'logo-thumbor.png');
const path = headers.get('location');
```

## Upload image

[Read the docs](https://thumbor.readthedocs.io/en/latest/posting_putting_deleting.html#putting)

```javascript
// ...

// PUT A IMAGE
const { status, headers } = await upload.upload(buffer, 'image/png', 'logo-thumbor.png', '/image/05b2eda857314e559630c6f3334d818d/logo-thumbor.png');
const path = headers.get('location');
```

## Delete image

[Read the docs](https://thumbor.readthedocs.io/en/latest/posting_putting_deleting.html#deleting)

```javascript
// ...

// DELETE A IMAGE
const { status, headers } = await upload.delete('/image/05b2eda857314e559630c6f3334d818d/logo-thumbor.png');
```