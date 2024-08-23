document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // Exchange rate API URL

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const exchangeRateMsg = document.querySelector('.msg');
    const convertButton = document.querySelector('button');
    const fromFlagImg = document.getElementById('fromFlag');
    const toFlagImg = document.getElementById('toFlag');

    const countryList = {
        AED: "AE",
        AFN: "AF",
        XCD: "AG",
        ALL: "AL",
        AMD: "AM",
        ANG: "AN",
        AOA: "AO",
        AQD: "AQ",
        ARS: "AR",
        AUD: "AU",
        AZN: "AZ",
        BAM: "BA",
        BBD: "BB",
        BDT: "BD",
        XOF: "BE",
        BGN: "BG",
        BHD: "BH",
        BIF: "BI",
        BMD: "BM",
        BND: "BN",
        BOB: "BO",
        BRL: "BR",
        BSD: "BS",
        NOK: "BV",
        BWP: "BW",
        BYR: "BY",
        BZD: "BZ",
        CAD: "CA",
        CDF: "CD",
        XAF: "CF",
        CHF: "CH",
        CLP: "CL",
        CNY: "CN",
        COP: "CO",
        CRC: "CR",
        CUP: "CU",
        CVE: "CV",
        CYP: "CY",
        CZK: "CZ",
        DJF: "DJ",
        DKK: "DK",
        DOP: "DO",
        DZD: "DZ",
        ECS: "EC",
        EEK: "EE",
        EGP: "EG",
        ETB: "ET",
        EUR: "FR",
        FJD: "FJ",
        FKP: "FK",
        GBP: "GB",
        GEL: "GE",
        GGP: "GG",
        GHS: "GH",
        GIP: "GI",
        GMD: "GM",
        GNF: "GN",
        GTQ: "GT",
        GYD: "GY",
        HKD: "HK",
        HNL: "HN",
        HRK: "HR",
        HTG: "HT",
        HUF: "HU",
        IDR: "ID",
        ILS: "IL",
        INR: "IN",
        IQD: "IQ",
        IRR: "IR",
        ISK: "IS",
        JMD: "JM",
        JOD: "JO",
        JPY: "JP",
        KES: "KE",
        KGS: "KG",
        KHR: "KH",
        KMF: "KM",
        KPW: "KP",
        KRW: "KR",
        KWD: "KW",
        KYD: "KY",
        KZT: "KZ",
        LAK: "LA",
        LBP: "LB",
        LKR: "LK",
        LRD: "LR",
        LSL: "LS",
        LTL: "LT",
        LVL: "LV",
        LYD: "LY",
        MAD: "MA",
        MDL: "MD",
        MGA: "MG",
        MKD: "MK",
        MMK: "MM",
        MNT: "MN",
        MOP: "MO",
        MRO: "MR",
        MTL: "MT",
        MUR: "MU",
        MVR: "MV",
        MWK: "MW",
        MXN: "MX",
        MYR: "MY",
        MZN: "MZ",
        NAD: "NA",
        XPF: "NC",
        NGN: "NG",
        NIO: "NI",
        NPR: "NP",
        NZD: "NZ",
        OMR: "OM",
        PAB: "PA",
        PEN: "PE",
        PGK: "PG",
        PHP: "PH",
        PKR: "PK",
        PLN: "PL",
        PYG: "PY",
        QAR: "QA",
        RON: "RO",
        RSD: "RS",
        RUB: "RU",
        RWF: "RW",
        SAR: "SA",
        SBD: "SB",
        SCR: "SC",
        SDG: "SD",
        SEK: "SE",
        SGD: "SG",
        SKK: "SK",
        SLL: "SL",
        SOS: "SO",
        SRD: "SR",
        STD: "ST",
        SVC: "SV",
        SYP: "SY",
        SZL: "SZ",
        THB: "TH",
        TJS: "TJ",
        TMT: "TM",
        TND: "TN",
        TOP: "TO",
        TRY: "TR",
        TTD: "TT",
        TWD: "TW",
        TZS: "TZ",
        UAH: "UA",
        UGX: "UG",
        USD: "US",
        UYU: "UY",
        UZS: "UZ",
        VEF: "VE",
        VND: "VN",
        VUV: "VU",
        YER: "YE",
        ZAR: "ZA",
        ZMK: "ZM",
        ZWD: "ZW"
    };

    let rates = {};

    // Function to fetch exchange rates from the API
    async function fetchExchangeRates() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            rates = data.rates;

            populateCurrencyOptions();
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    }

    // Function to populate currency options in select elements
    function populateCurrencyOptions() {
        const currencies = Object.keys(rates);
        const optionsHtml = currencies.map(currency => 
            `<option value="${currency}">${currency}</option>`
        ).join('');

        fromCurrencySelect.innerHTML = optionsHtml;
        toCurrencySelect.innerHTML = optionsHtml;

        // Set default selection
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'INR';

        // Update flags
        updateFlags();
    }

    // Function to update flags based on selected currencies
    function updateFlags() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const fromCountryCode = countryList[fromCurrency] || 'us'; // Default to 'us' if country code is missing
        const toCountryCode = countryList[toCurrency] || 'us'; // Default to 'us' if country code is missing

        fromFlagImg.src = `https://flagcdn.com/64x48/${fromCountryCode.toLowerCase()}.png`;
        toFlagImg.src = `https://flagcdn.com/64x48/${toCountryCode.toLowerCase()}.png`;
    }

    // Function to update the conversion result
    function updateConversion() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            exchangeRateMsg.textContent = 'Please enter a valid amount.';
            return;
        }

        if (fromCurrency === toCurrency) {
            exchangeRateMsg.textContent = 'Please select different currencies.';
            return;
        }

        const convertedAmount = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
        exchangeRateMsg.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

    // Event listeners for changes
    fromCurrencySelect.addEventListener('change', () => {
        updateFlags();
        updateConversion();
    });

    toCurrencySelect.addEventListener('change', () => {
        updateFlags();
        updateConversion();
    });

    amountInput.addEventListener('input', updateConversion);

    // Event listener for the button click
    convertButton.addEventListener('click', (e) => {
        e.preventDefault();
        updateConversion();
    });

    // Initialize
    fetchExchangeRates();
});







