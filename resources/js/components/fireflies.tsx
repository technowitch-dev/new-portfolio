export default function Fireflies() {
    return (
        <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="firefly" />
            ))}
        </div>
    );
}
