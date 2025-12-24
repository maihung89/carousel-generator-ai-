import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import type { Slide, StyleConfig } from "./types";
import { INITIAL_STYLE } from "./types";
import { parseMarkdown } from "./utils/markdownParser";

const DEFAULT_MARKDOWN = `# 4 Bước Trực Quan Hóa Dữ Liệu Cực Nhanh Với AI
Thành thạo AI fluency là phối hợp các mô hình (Gemini, ChatGPT, Claude) trong 4 bước để kể chuyện bằng dữ liệu hiệu quả hơn.

# Tăng Tốc Độ Phân Tích Gấp 3 Lần
Sử dụng các công cụ tự động hóa giúp bạn tiết kiệm thời gian và tập trung vào việc đưa ra quyết định chiến lược.

# Bước 4: Phán Đoán Con Người Luôn Là Bước Cuối Cùng
- Apply human judgment (Áp dụng phán đoán con người). Đây là bước kiểm tra tính hợp lý của kết quả AI.
- Chuyên gia cần đối chiếu dữ liệu với bối cảnh thực tế (ví dụ: sự kiện thị trường, chuỗi cung ứng) để bổ sung giải thích.
- Lưu lại ngay 4 bước này và chia sẻ nếu bạn thấy hữu ích!`;

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [style, setStyle] = useState<StyleConfig>(INITIAL_STYLE);
  const [selectedBlockId, setSelectedBlockId] = useState<{ slideId: string, blockId: string } | null>(null);

  // Parse markdown whenever it changes
  useEffect(() => {
    const newSlides = parseMarkdown(markdown, style.commonBackgroundUrl);
    setSlides(newSlides);
    if (currentIndex >= newSlides.length) {
      setCurrentIndex(Math.max(0, newSlides.length - 1));
    }
  }, [markdown]);

  const handleBlockMove = useCallback((slideId: string, blockId: string, x: number, y: number) => {
    setSlides(prev => prev.map(slide => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        blocks: slide.blocks.map(block => {
          if (block.id !== blockId) return block;
          return { ...block, x, y };
        })
      };
    }));
  }, []);

  const handleUpdateBlock = useCallback((slideId: string, blockId: string, updates: Partial<any>) => {
    setSlides(prev => prev.map(slide => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        blocks: slide.blocks.map(block => {
          if (block.id !== blockId) return block;
          return { ...block, ...updates };
        })
      };
    }));
  }, []);

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (slides.length === 0) return;
    setIsExporting(true);

    try {
      // const { exportSlidesToZip } = await import("./utils/exportUtils");

      // We need a hidden way to render all slides. 
      // A simple trick: iterate through slides and wait for render.
      // But a better way is to pass a function that can target slide elements.
      // For simplicity in this demo, we'll use the visible canvas elements.

      // const getSlideElement = (index: number) => {
      //   // We temporarily switch the slide to render it for html2canvas
      //   // This is tricky in a single canvas setup. 
      //   // Let's use a dedicated capture method.
      //   return document.querySelector('.carousel-capture-area') as HTMLElement;
      // };

      // To capture all slides, we'll programmatically switch pages
      const originalIndex = currentIndex;

      // const images: { name: string, blob: Blob }[] = [];
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");
      const html2canvas = (await import("html2canvas")).default;

      const zip = new JSZip();

      for (let i = 0; i < slides.length; i++) {
        setCurrentIndex(i);
        // Wait for React to render and fonts/images to be stable
        await new Promise(r => setTimeout(r, 1200));

        const element = document.querySelector('.carousel-canvas-area') as HTMLElement;
        if (element) {
          try {
            const canvas = await html2canvas(element, {
              useCORS: true,
              scale: 2,
              backgroundColor: "#000000",
              logging: false,
              onclone: (clonedDoc) => {
                const el = clonedDoc.querySelector('.carousel-canvas-area') as HTMLElement;
                if (el) el.style.backgroundColor = '#1e293b';
              }
            });
            const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/png'));
            if (blob) zip.file(`slide-${i + 1}.png`, blob);
          } catch (e) {
            console.error("Capture error for slide", i + 1, e);
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "carousel-export.zip");
      setCurrentIndex(originalIndex);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Xuất file thất bại. Vui lòng thử lại.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetStyle = () => {
    setStyle(INITIAL_STYLE);
  };

  return (
    <div className="flex w-full h-screen bg-[#020617] text-slate-200 overflow-hidden selection:bg-blue-500/30">
      <Sidebar
        style={style}
        onStyleChange={setStyle}
        onResetStyle={handleResetStyle}
        markdown={markdown}
        onMarkdownChange={setMarkdown}
        onExport={handleExport}
        isReady={slides.length > 0}
        isExporting={isExporting}
        selectedBlockId={selectedBlockId}
        currentSlide={slides[currentIndex]}
        onUpdateBlock={handleUpdateBlock}
      />

      {slides.length > 0 ? (
        <Canvas
          slide={slides[currentIndex]}
          style={style}
          onBlockMove={handleBlockMove}
          currentIndex={currentIndex}
          totalSlides={slides.length}
          onPrev={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setSelectedBlockId(null); }}
          onNext={() => { setCurrentIndex(prev => Math.min(slides.length - 1, prev + 1)); setSelectedBlockId(null); }}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 italic">
          Bắt đầu nhập nội dung Markdown để xem bản xem trước...
        </div>
      )}
    </div>
  );
}

export default App;
