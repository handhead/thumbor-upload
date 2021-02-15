const fetch = require("isomorphic-fetch");

class Upload {

    /**
    * Constructor
    *
    * @author Vinícius Rodrigues
    *
    * @param {string}   [url] string to server url
    */
    constructor(url) {
        this.url = url;
    }

    /**
    * Create
    *
    * @author Vinícius Rodrigues
    *
    * @param {buffer}   [media] buffer to media
    * @param {string}   [type] string to type
    * @param {string}   [filename] string to filename
    * 
    * @return {Promise} Promise returned
    */
    async create(media, type, filename) {
        const response = await fetch(`${this.url}/image`, {
            method: "POST",
            headers: {
                "Content-Type": type,
                "Slug": filename
            },
            body: media
        });
        return response;
    }

    /**
    * Update
    *
    * @author Vinícius Rodrigues
    *
    * @param {buffer}   [media] buffer to media
    * @param {string}   [type] string to type
    * @param {string}   [filename] string to filename
    * @param {string}   [path] string to path
    * 
    * @return {Promise} Promise returned
    */
    async update(media, type, filename, path) {
        const response = await fetch(`${this.url}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": type,
                "Slug": filename
            },
            body: media
        });
        return response;
    }

    /**
    * Delete
    *
    * @author Vinícius Rodrigues
    *
    * @param {string}   [path] string to path
    * 
    * @return {Promise} Promise returned
    */
    async delete(path) {
        const response = await fetch(`${this.url}${path}`, {
            method: "DELETE"
        });
        return response;
    }
}

exports.Upload = Upload;
