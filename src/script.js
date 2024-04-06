function initData() {
    return {
        textarea: '',
        get xml() {
            if (!this.textarea) {
                return;
            }
            return parseTextToXml(this.textarea);
        },
        get keyboard() {
            if (!this.xml) {
                return {
                    attributes: {},
                    rows: [],
                };
            }
            return {
                attributes: parseXmlToKeyboardAttributes(this.xml),
                rows: parseXmlToKeyboard(this.xml),
            };
        },
        readFile: function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.textarea = e.target.result;
            };
            reader.readAsText(file);
        },
    };
}

globalThis.initData = initData;

function parseTextToXml(text) {
    if (!text) {
        return null;
    }
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    return xml;
}

function parseXmlToKeyboard(xml) {
    if (!xml) {
        return [];
    }
    return getRows(xml);
}

function parseXmlToKeyboardAttributes(xml) {
    if (!xml) {
        return {};
    }
    return getAttributes(xml.getElementsByTagName('keyboard')[0]);
}

function getRows(xml) {
    const rows = xml.getElementsByTagName('row');
    return Array.from(rows).map((row) => {
        return {
            attributes: getAttributes(row),
            keys: getKeys(row),
        };
    });
}

function getKeys(row) {
    const keys = row.getElementsByTagName('key');
    return Array.from(keys).map((key) => {
        return {
            attributes: getAttributes(key),
        };
    });
}

function getAttributes(element) {
    if (!element) {
        return {};
    }
    return Array.from(element.attributes).reduce((acc, attribute) => {
        acc[attribute.name] = attribute.value;
        return acc;
    }, {});
}

const keyToUnicodeMap = new Map([
    ['shift', '⇧'],
    ['capslock', '⇪'],
    ['backspace', '⌫'],
    ['delete', '⌦'],
    ['switch_numeric', '123'],
    ['switch_emoji', '😊'],
    ['config', '⚙'],
    ['space', ' '],
    ['switch_forward', '⌨'],
    ['switch_backward', '⌨'],
    ['cursor_left', '←'],
    ['cursor_right', '→'],
    ['enter', '↵'],
    ['action', '⏎'],
]);

function getKey(key) {
    if (!key) {
        return;
    }
    if (key.startsWith('loc ')) {
        return getKey(key.slice(4));
    }
    return keyToUnicodeMap.get(key) || key;
}

globalThis.getKey = getKey;
