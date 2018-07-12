import * as Color from 'color'; 
export function getForegroundColor(backgroundColor: string): string {
    // Borrowed this algorithm from here: 
    // https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
    /* istanbul ignore next */
    const color = Color(backgroundColor);
    // Counting the perceptive luminance - human eye favors green color... 
    /* istanbul ignore next */
    const perceivedEnergy: number = 1 - (0.299 * color.red() + 0.400 * color.green() + 0.114 * color.blue()) / 255;
    /* istanbul ignore next */
    if (perceivedEnergy < 0.5) {
        return '#000000'; // bright colors - black font
    } else {
        return '#FFFFFF'; // dark colors - white font
    }
}
