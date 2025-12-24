import React from "react";
import { motion } from "framer-motion";
import type { Slide, StyleConfig } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CanvasProps {
    slide: Slide;
    style: StyleConfig;
    onBlockMove: (slideId: string, blockId: string, x: number, y: number) => void;
    currentIndex: number;
    totalSlides: number;
    onPrev: () => void;
    onNext: () => void;
    selectedBlockId: { slideId: string, blockId: string } | null;
    onSelectBlock: (id: { slideId: string, blockId: string } | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({
    slide, style, onBlockMove,
    currentIndex, totalSlides, onPrev, onNext,
    selectedBlockId, onSelectBlock
}) => {
    const canvasRef = React.useRef<HTMLDivElement>(null);

    const handleDragEnd = (blockId: string, _event: any, info: any) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();

        const xPercent = ((info.point.x - rect.left) / rect.width) * 100;
        const yPercent = ((info.point.y - rect.top) / rect.height) * 100;

        onBlockMove(slide.id, blockId, Math.max(0, Math.min(100, xPercent)), Math.max(0, Math.min(100, yPercent)));
        onSelectBlock({ slideId: slide.id, blockId });
    };

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center p-8 bg-black/40 relative overflow-hidden"
            onClick={() => onSelectBlock(null)}
        >
            {/* Top hint */}
            <div className="absolute top-6 right-8 flex items-center gap-2 text-[10px] text-slate-400">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Kéo thả để chỉnh vị trí & Click để sửa
            </div>

            {/* Main Slide Container */}
            <div
                className="relative aspect-square w-full max-w-[600px] shadow-2xl rounded-sm overflow-hidden carousel-canvas-area"
                ref={canvasRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                    containerType: 'size',
                    backgroundColor: '#1e293b'
                } as React.CSSProperties}
            >
                {/* Background Image */}
                <img
                    src={slide.backgroundUrl}
                    alt="Slide background"
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    draggable={false}
                />

                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />

                {/* Username label (Global) */}
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                    style={{
                        fontFamily: style.username.fontFamily,
                        fontSize: `${style.username.fontSize * 0.12}cqw`,
                        color: style.username.color,
                        opacity: 0.8,
                        fontWeight: 500,
                        letterSpacing: "-0.02em"
                    }}
                >
                    {style.usernameText}
                </div>

                {/* Text Blocks */}
                {slide.blocks.map((block) => {
                    const config = style[block.kind as keyof StyleConfig] as any;
                    if (!config) return null;
                    const isSelected = selectedBlockId?.blockId === block.id;

                    return (
                        <motion.div
                            key={`${slide.id}-${block.id}`}
                            drag
                            dragMomentum={false}
                            dragElastic={0}
                            dragConstraints={canvasRef}
                            onDragEnd={(e, info) => handleDragEnd(block.id, e, info)}
                            onMouseDown={() => onSelectBlock({ slideId: slide.id, blockId: block.id })}
                            className={`absolute cursor-move select-none z-10 p-4 active:cursor-grabbing transition-shadow duration-200 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-transparent rounded-lg bg-blue-500/5' : ''}`}
                            style={{
                                left: `${block.x}%`,
                                top: `${block.y}%`,
                                x: "-50%",
                                y: "-50%",
                                width: "95%",
                                textAlign: config.align,
                                fontFamily: config.fontFamily,
                                fontSize: `${config.fontSize * 0.12}cqw`,
                                lineHeight: config.lineHeight,
                                color: block.color || config.color,
                                whiteSpace: "pre-wrap",
                                textShadow: "0 2px 15px rgba(0,0,0,0.8)",
                                fontWeight: block.kind === "title" ? 900 : 500,
                                willChange: "transform"
                            }}
                        >
                            {block.kind === "body" && style.body.numbered && slide.index > 1
                                ? `${slide.index - 1}. ${block.text}`
                                : block.text}
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center gap-6">
                <button
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                    className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-700"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="bg-slate-800 px-6 py-2 rounded-full border border-slate-700 text-sm font-medium text-slate-200 min-w-[80px] text-center">
                    {currentIndex + 1} / {totalSlides}
                </div>

                <button
                    onClick={onNext}
                    disabled={currentIndex === totalSlides - 1}
                    className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-700"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Canvas;
