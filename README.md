# EncryptedList

### List of End-to-End Encrypted Services

> This branch ([v1](https://github.com/oneminch/EncryptedList/tree/v1)) contains the first version of the project.

![v1 Screenshot](/assets/img/screenshots/EncryptedList-v1-desktop.png)

**Technology used**: HTML, CSS(SCSS), Vanilla JavaScript (Bundled with Webpack/Babel)

### File Structure

- [./src/](https://github.com/oneminch/encryptedlist/tree/master/src) - inlcudes JavaScript files
  - [data.js](https://github.com/oneminch/encryptedlist/tree/master/src/data.js) - contains the list of products, tags and categories available in JSON format.
    - Products are stored as objects:
    ```
    {
        name: "Product Name",
        description: "Product Description",
        url: "Product Homepage",
        img_url: "./assets/img/{product-name-in-lowercase}.svg",
        category: ["All","Category Types (e.g. Email)","..."],
        tags: ["all","Tag Types (e.g. open-source)","..."]
    }
    ```
  - [main.js](https://github.com/oneminch/encryptedlist/tree/master/src/main.js) - renders these values to the UI and is responsible for filtering functionality
- [./dist](https://github.com/oneminch/encryptedlist/tree/master/dist) - includes the bundled js file
- [./assets/img/](https://github.com/oneminch/encryptedlist/tree/master/assets/img) - inlcudes icons used for the list of products.
- [./assets/css/](https://github.com/oneminch/encryptedlist/tree/master/assets/css) - inlcudes the css files and fonts used for this project.
- [./creator](https://github.com/oneminch/encryptedlist/tree/master/creator) - includes a page with product submission [form](https://oneminch.github.io/encryptedlist/creator) to generate a valid object.

### Contribute

This is the first project I had to use npm ever so sorry about the mess.

- Fork this repo and clone it to your device.
- Install modules with `npm install`
- The file structure is as described above.
- The main CSS file for this project (`style.css`) is compiled from the `style.scss` file located in the same directory.
  - To code some CSS, please modify the .scss file,
  - To compile .scss file to .css, open Git Bash in your root directory and run `npx sass assets/css/style.scss assets/css/style.css --watch`.
- After making modifications, all you need to do is push and the GitHub actions file I set up will automatically build it.
- Then submit a pull request.

### Submit a product

First, please make sure that the product you want to submit is not in the [excluded products list](https://github.com/oneminch/encryptedlist/wiki/Excluded-Products).
I haven't set up a proper way to submit product information yet. So use this,

1. Add necessary data to [form](https://oneminch.github.io/encryptedlist/creator) (name, description, url, ...) and hit 'Generate'.
2. An object is generated at the bottom of the page; Continue submiting other products (if any) and all the objects generated will be listed at the bottom of the page.
3. Copy + Paste the generated object(s) to `product_list` array in [data.js](https://github.com/oneminch/encryptedlist/tree/master/src/data.js)
4. Stage your changes, commit and push. GitHub Actions will automatically build the files.
5. Submit pull request
