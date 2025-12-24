import StylePanel from "./StylePanel";
import EditorPanel from "./EditorPanel";
import type { Slide, StyleConfig } from "../types";
import { Download, Edit3, X } from "lucide-react";

interface SidebarProps {
    style: StyleConfig;
    onStyleChange: (style: StyleConfig) => void;
    onResetStyle: () => void;
    markdown: string;
    onMarkdownChange: (md: string) => void;
    onExport: () => void;
    isReady: boolean;
    isExporting: boolean;
    selectedBlockId: { slideId: string, blockId: string } | null;
    currentSlide: Slide | null;
    onUpdateBlock: (slideId: string, blockId: string, updates: Partial<any>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    style, onStyleChange, onResetStyle,
    markdown, onMarkdownChange, onExport,
    isReady, isExporting,
    selectedBlockId, currentSlide, onUpdateBlock
}) => {
    return (
        <div className="w-[450px] min-w-[450px] flex-shrink-0 h-screen glass border-r border-white/5 flex flex-col p-8 gap-10 overflow-y-auto">
            {/* Brand Header */}
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-3 border border-white/10">
                    <div className="flex flex-col gap-1.5 items-center">
                        <div className="w-8 h-2.5 bg-white rounded-full shadow-sm" />
                        <div className="w-6 h-2 bg-white/40 rounded-full" />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tighter">
                        CAROUSEL
                    </h1>
                    <p className="text-[11px] font-black text-blue-500 tracking-[0.3em] -mt-1 uppercase drop-shadow-md">Generator AI</p>
                </div>
            </div>

            {/* Contextual Block Editor */}
            {selectedBlockId && currentSlide && (
                <div className="bg-slate-800/80 border border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-blue-400">
                            <Edit3 size={16} />
                            <span className="text-[11px] font-bold uppercase tracking-widest">Sửa {selectedBlockId.blockId.includes('title') ? 'Tiêu đề' : 'Nội dung'}</span>
                        </div>
                        <button
                            onClick={() => onUpdateBlock(selectedBlockId.slideId, selectedBlockId.blockId, { x: 50, y: selectedBlockId.blockId.includes('title') ? 25 : 60 })}
                            className="text-[10px] text-slate-400 hover:text-white underline"
                        >
                            Reset vị trí
                        </button>
                    </div>

                    <textarea
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none min-h-[100px] resize-none"
                        value={currentSlide.blocks.find(b => b.id === selectedBlockId.blockId)?.text || ""}
                        onChange={(e) => onUpdateBlock(selectedBlockId.slideId, selectedBlockId.blockId, { text: e.target.value })}
                    />

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Màu chữ:</span>
                            <div className="custom-color-picker">
                                <input
                                    type="color"
                                    value={currentSlide.blocks.find(b => b.id === selectedBlockId.blockId)?.color || (selectedBlockId.blockId.includes('title') ? style.title.color : style.body.color)}
                                    onChange={(e) => onUpdateBlock(selectedBlockId.slideId, selectedBlockId.blockId, { color: e.target.value })}
                                />
                            </div>
                        </div>
                        <X
                            size={18}
                            className="text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                            onClick={() => { (document.activeElement as HTMLElement)?.blur(); window.getSelection()?.removeAllRanges(); }}
                        />
                    </div>
                </div>
            )}

            <StylePanel
                style={style}
                onStyleChange={onStyleChange}
                onReset={onResetStyle}
            />

            <EditorPanel
                markdown={markdown}
                onMarkdownChange={onMarkdownChange}
                isReady={isReady}
            />

            {/* Export Button */}
            <button
                onClick={onExport}
                disabled={isExporting}
                className={`w-full ${isExporting ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 disabled:cursor-not-allowed`}
            >
                {isExporting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Download size={20} strokeWidth={2.5} />
                )}
                {isExporting ? "Đang xử lý..." : "Tải xuống (.ZIP)"}
            </button>
        </div>
    );
};

export default Sidebar;
