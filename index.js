import axios from "axios";

export default class Client {
    constructor(id, apiKey) {
        if (!id) {
            throw new TypeError("Expected a Custom Search Engine ID");
        }

        if (!apiKey) {
            throw new TypeError("Expected an API key");
        }

        this.endpoint = "https://www.googleapis.com";
        this.apiKey = apiKey;
        this.id = id;
    }

    async search(query, options) {
        try {
            if (!query) {
                throw new TypeError("Expected a query");
            }

            const url = `${this.endpoint}/customsearch/v1?${this.buildQuery(query, options)}`;
            const result = await axios.get(url);
            return result.data.items;
        } catch (error) {
            return error.response.data.error.message;
        }
    }

    buildQuery(query, options) {
        options = options || {};

        const result = {
            q: query.replace(/\s/g, "+"),
            searchType: "image",
            cx: this.id,
            key: this.apiKey,
        };

        if (options.page) {
            result.start = options.page;
        }

        if (options.size) {
            result.imgSize = options.size;
        }

        if (options.type) {
            result.imgType = options.type;
        }

        if (options.dominantColor) {
            result.imgDominantColor = options.dominantColor;
        }

        if (options.colorType) {
            result.imgColorType = options.colorType;
        }

        if (options.safe) {
            result.safe = options.safe;
        }

        return new URLSearchParams(result).toString();
    }
}
