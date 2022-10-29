interface colorScheme {
    hash: string,                        /// Regenerate color scheme when the image hash is changed
    DarkMuted: {
        hex: string,
        rgb: Number[],
        bodyTextColor: string
    },
    Vibrant: {
        hex: string,
        rgb: Number[],
        bodyTextColor: string
    }
}

let colorsCache: { [key: string]: colorScheme } = {};

if (localStorage.hasOwnProperty('StackColorsCache')) {
    try {
        colorsCache = JSON.parse(localStorage.getItem('StackColorsCache'));
    }
    catch (e) {
        colorsCache = {};
    }
}

async function getColor(key: string, hash: string, imageURL: string) {
    if (!key) {
        /**
         * If no key is provided, do not cache the result
         */
        return await Vibrant.from(imageURL).getPalette();
    }

    if (!colorsCache.hasOwnProperty(key) || colorsCache[key].hash !== hash) {
        /**
         * If key is provided, but not found in cache, or the hash mismatches => Regenerate color scheme
         */
        const palette = await Vibrant.from(imageURL).getPalette();

        colorsCache[key] = {
            hash: hash,
            Vibrant: {
                hex: palette.Vibrant.hex,
                rgb: palette.Vibrant.rgb,
                bodyTextColor: palette.Vibrant.bodyTextColor
            },
            DarkMuted: {
                hex: palette.DarkMuted.hex,
                rgb: palette.DarkMuted.rgb,
                bodyTextColor: palette.DarkMuted.bodyTextColor
            }
        }

        /* Save the result in localStorage */
        localStorage.setItem('StackColorsCache', JSON.stringify(colorsCache));
    }

    return colorsCache[key];
}

export {
    getColor
}