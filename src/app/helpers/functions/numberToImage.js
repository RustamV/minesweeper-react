import zero from "../../../img/zero.png";
import one from "../../../img/1.png";
import two from "../../../img/2.png";
import three from "../../../img/3.png";
import four from "../../../img/4.png";
import five from "../../../img/5.png";
import six from "../../../img/6.png";
import seven from "../../../img/7.png";
import eight from "../../../img/8.png";
import nine from "../../../img/9.png";
import hyphen from "../../../img/hyphen.png";

const numberToImage = (number) => {
    switch (number) {
        case 0: {
            return zero;
        }
        case 1: {
            return one;
        }
        case 2: {
            return two;
        }
        case 3: {
            return three;
        }
        case 4: {
            return four;
        }
        case 5: {
            return five;
        }
        case 6: {
            return six;
        }
        case 7: {
            return seven;
        }
        case 8: {
            return eight;
        }
        case 9: {
            return nine;
        }
        default:
            return hyphen;
    }
};

export default numberToImage;
