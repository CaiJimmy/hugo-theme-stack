interface colorScheme {
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

if (localStorage.hasOwnProperty('colorsCache')) {
    try {
        colorsCache = JSON.parse(localStorage.getItem('colorsCache'));
    }
    catch (e) {
        colorsCache = {};
    }
}

async function getColor(imageURL: string) {
    if (!colorsCache.hasOwnProperty(imageURL)) {
        const palette = await Vibrant.from(imageURL).getPalette();

        colorsCache[imageURL] = {
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

        localStorage.setItem('colorsCache', JSON.stringify(colorsCache));
    }
    return colorsCache[imageURL];
}

export {
    getColor
}