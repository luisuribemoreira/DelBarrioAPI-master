module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2,
            {SwitchCase: 1}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "space-before-function-paren": [
            "error",
            "always"
        ],
        "no-multiple-empty-lines": [
            "error",
            { "max": 1, "maxEOF": 0, "maxBOF" : 0}
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "prefer-arrow-callback": [
            "error"
        ]
    }
};