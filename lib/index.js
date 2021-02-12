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
    * Constructor
    *
    * @author Vinícius Rodrigues
    *
    * @param {string}   [media] string to media
    * @param {string}   [type] string to type
    * @param {string}   [filename] string to filename
    * 
    * @return {(string|undefined)} string returned
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
}

exports.Upload = Upload;
