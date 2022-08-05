
export const API = {
    yahoo: {
        region: "US",
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_YAHOO_API_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "useQueryString": true
        },
        resources: {
            quotes: {
                description: 'Real time quote data for stocks, ETFs, mutuals funds, etc…',
                url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes"
            },
            chart: {
                description: 'Get chart data by ticker',
                url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts",
                interval: "1d",
                range: "6mo",
                allowed: {
                    intervals: ["1d", "1wk", "1mo"],
                    range: ["3mo", "6mo", "1y", "5y", "max"]
                },
            },
        }
    },
    yahooFree: {
        region: "US",
        headers: {
            "x-rapidapi-host": "yahoo-finance-free.p.rapidapi.com",
            "x-rapidapi-key": "f25292979emsh32ec73128e05cbfp177485jsn17508be6010b",
            "useQueryString": true
        },
        resources: {
            quotes: {
                description: 'Real time quote data for stocks, ETFs, mutuals funds, etc…',
                url: "https://yahoo-finance-free.p.rapidapi.com/v6/finance/quote"
            },
            chart: {
                description: 'Get chart data by ticker',
                url: "https://yahoo-finance-free.p.rapidapi.com/v8/finance/chart/",
                interval: "1d",
                range: "6mo",
                allowed: {
                    intervals: ["1d", "1wk", "1mo"],
                    range: ["3mo", "6mo", "1y", "5y", "max"]
                },
            },
        }
    },
    aws: {
        baseUrl: "https://2s7ahmz5i1.execute-api.eu-central-1.amazonaws.com/Prod/",
    }
}