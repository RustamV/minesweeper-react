const numberToImage = (number, imageTheme) => {
    switch (number) {
        case 0: {
            return imageTheme?.zero;
        }
        case 1: {
            return imageTheme?.one;
        }
        case 2: {
            return imageTheme?.two;
        }
        case 3: {
            return imageTheme?.three;
        }
        case 4: {
            return imageTheme?.four;
        }
        case 5: {
            return imageTheme?.five;
        }
        case 6: {
            return imageTheme?.six;
        }
        case 7: {
            return imageTheme?.seven;
        }
        case 8: {
            return imageTheme?.eight;
        }
        case 9: {
            return imageTheme?.nine;
        }
        default:
            return imageTheme?.hyphen;
    }
};

export default numberToImage;
