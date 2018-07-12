
export default function mapToArray<T>(map: { [key: string]: T }): T[] {
    return map ? Object.keys(map).map(k => map[k]) : [];
}