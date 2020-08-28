interface colorScheme {
    key: string,                        /// Regenerate color scheme when the image is changed
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

async function getColor(id: string, key: string, imageURL: string) {
    if (!id || !colorsCache.hasOwnProperty(id) || colorsCache[id].key !== key) {
        const palette = await Vibrant.from(imageURL).getPalette();

        colorsCache[id] = {
            key: key,
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

        localStorage.setItem('StackColorsCache', JSON.stringify(colorsCache));
    }

    return colorsCache[id];
}

export {
    getColor
}