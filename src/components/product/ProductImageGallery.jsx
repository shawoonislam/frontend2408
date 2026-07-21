import { useState } from "react";

export default function ProductImageGallery({ images = [] }) {
    const mainFirst = [...images].sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));
    const [active, setActive] = useState(mainFirst[0]?.url);

    if (!images.length) return null;

    return (
        <div className="flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(img.url)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${active === img.url ? "border-amber" : "border-transparent hover:border-ink/20"
                            }`}
                    >
                        <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-ink/5">
                <img src={active} alt="Product" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};