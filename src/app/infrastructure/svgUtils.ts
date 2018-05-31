export function loadSvg(path: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
    return require(path).default;
}