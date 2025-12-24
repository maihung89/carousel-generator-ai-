import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const exportSlidesToZip = async (
    getSlideElement: (index: number) => HTMLElement | null,
    slideCount: number,
    onProgress?: (current: number, total: number) => void
) => {
    const zip = new JSZip();
    const folder = zip.folder("carousel-slides");

    if (!folder) return;

    for (let i = 0; i < slideCount; i++) {
        if (onProgress) onProgress(i + 1, slideCount);

        const element = getSlideElement(i);
        if (!element) continue;

        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2, // High quality
            backgroundColor: "#000000",
            logging: false,
        });

        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/png");
        });

        if (blob) {
            folder.file(`slide-${i + 1}.png`, blob);
        }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "carousel-export.zip");
};
