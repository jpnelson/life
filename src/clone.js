define(function () {
    function copy(o) {
        var out, v, key;
        out = Array.isArray(o) ? [] : {};
        for (key in o) {
            v = o[key];
            out[key] = (typeof v === "object") ? copy(v) : v;
        }
        return out;
    }
    return copy;
})