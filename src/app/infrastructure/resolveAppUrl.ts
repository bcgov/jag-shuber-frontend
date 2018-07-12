
/**
 * Resolves a url within the app based the on the `process.env.PUBLIC_URL` 
 * property that is set based on the **homepage** property within the
 * `package.json`.
 *
 * @export
 * @param {string} path
 * @returns 
 */
export default function resolveAppUrl(path: string) {
    return `${process.env.PUBLIC_URL}${path}`;
}