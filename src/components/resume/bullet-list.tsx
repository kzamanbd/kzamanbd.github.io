/** The resume's bulleted body copy, one `<p>` per point as the print CSS expects. */
export default function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="bullet-list">
            {items.map((item) => (
                <li key={item.slice(0, 48)}>
                    <p>{item}</p>
                </li>
            ))}
        </ul>
    );
}
