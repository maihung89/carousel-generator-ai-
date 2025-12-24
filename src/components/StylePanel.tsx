import React from "react";
import type { StyleConfig } from "../types";
import { DEFAULT_FONTS } from "../types";
import { RotateCcw, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface StylePanelProps {
    style: StyleConfig;
    onStyleChange: (style: StyleConfig) => void;
    onReset: () => void;
}

const StylePanel: React.FC<StylePanelProps> = ({ style, onStyleChange, onReset }) => {
    const updateStyle = (kind: "title" | "body", updates: Partial<any>) => {
        onStyleChange({
            ...style,
            [kind]: { ...style[kind], ...updates },
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
                <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Kiểu chữ & Màu sắc
                </h3>
                <button
                    onClick={onReset}
                    className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                    <RotateCcw size={10} />
                    Reset mặc định
                </button>
            </div>

            <div className="panel-card space-y-4">
                {/* Font Selection */}
                <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={style.title.fontFamily}
                    onChange={(e) => {
                        const font = e.target.value;
                        onStyleChange({
                            ...style,
                            title: { ...style.title, fontFamily: font },
                            body: { ...style.body, fontFamily: font },
                        });
                    }}
                >
                    {DEFAULT_FONTS.map(f => (
                        <option key={f.value} value={f.value}>{f.name}</option>
                    ))}
                </select>

                <div className="flex flex-col gap-5">
                    {/* Title Settings */}
                    <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[13px] font-black text-white italic tracking-tighter">TIÊU ĐỀ</span>
                            <div className="custom-color-picker shadow-lg">
                                <input
                                    type="color"
                                    value={style.title.color}
                                    onChange={(e) => updateStyle("title", { color: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center gap-4 w-full">
                                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">CỠ CHỮ</span>
                                    <span
                                        className="text-[12px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 whitespace-nowrap shadow-sm"
                                        style={{ fontFamily: style.title.fontFamily }}
                                    >
                                        {style.title.fontSize} px
                                    </span>
                                </div>
                                <input
                                    type="range" min="40" max="120"
                                    value={style.title.fontSize}
                                    onChange={(e) => updateStyle("title", { fontSize: parseInt(e.target.value) })}
                                    className="w-full cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center gap-4 w-full">
                                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">GIÃN DÒNG</span>
                                    <span
                                        className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 whitespace-nowrap shadow-sm"
                                        style={{ fontFamily: style.title.fontFamily }}
                                    >
                                        {style.title.lineHeight} x
                                    </span>
                                </div>
                                <input
                                    type="range" min="0.8" max="2" step="0.1"
                                    value={style.title.lineHeight}
                                    onChange={(e) => updateStyle("title", { lineHeight: parseFloat(e.target.value) })}
                                    className="w-full cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Body Settings */}
                    <div className="space-y-5 bg-slate-800/40 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-inner">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[13px] font-black text-white italic tracking-tighter">NỘI DUNG</span>
                            <div className="custom-color-picker shadow-lg ring-1 ring-white/10">
                                <input
                                    type="color"
                                    value={style.body.color}
                                    onChange={(e) => updateStyle("body", { color: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center gap-4 w-full">
                                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">CỠ CHỮ</span>
                                    <span
                                        className="text-[12px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 whitespace-nowrap shadow-sm"
                                        style={{ fontFamily: style.body.fontFamily }}
                                    >
                                        {style.body.fontSize} px
                                    </span>
                                </div>
                                <input
                                    type="range" min="20" max="80"
                                    value={style.body.fontSize}
                                    onChange={(e) => updateStyle("body", { fontSize: parseInt(e.target.value) })}
                                    className="w-full cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center gap-4 w-full">
                                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">GIÃN DÒNG</span>
                                    <span
                                        className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 whitespace-nowrap shadow-sm"
                                        style={{ fontFamily: style.body.fontFamily }}
                                    >
                                        {style.body.lineHeight} x
                                    </span>
                                </div>
                                <input
                                    type="range" min="1" max="2.5" step="0.1"
                                    value={style.body.lineHeight}
                                    onChange={(e) => updateStyle("body", { lineHeight: parseFloat(e.target.value) })}
                                    className="w-full cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interface Settings (GIAO DIỆN) */}
                <div className="space-y-4 pt-4 border-t border-slate-700/50">
                    <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                        GIAO DIỆN
                    </h3>

                    <div className="space-y-3">
                        {/* Background Image Upload Button */}
                        <div className="relative group">
                            <input
                                type="file"
                                id="bg-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        onStyleChange({ ...style, commonBackgroundUrl: url });
                                    }
                                }}
                            />
                            <label
                                htmlFor="bg-upload"
                                className="w-full bg-slate-800/60 hover:bg-slate-700/60 border border-white/5 hover:border-blue-500/30 rounded-xl py-3 px-4 flex items-center justify-center gap-3 text-sm text-slate-300 cursor-pointer transition-all shadow-inner"
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                </div>
                                <span className="font-medium">Chọn ảnh nền khác...</span>
                            </label>
                        </div>

                        {/* Username Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={style.usernameText}
                                onChange={(e) => onStyleChange({ ...style, usernameText: e.target.value })}
                                placeholder="@username của bạn"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-0 focus:ring-offset-0"
                            checked={style.body.numbered}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                onStyleChange({
                                    ...style,
                                    body: { ...style.body, numbered: checked }
                                });
                            }}
                        />
                        <span className="text-[11px] text-slate-400 group-hover:text-slate-300">Đánh số (1. ABC)</span>
                    </label>

                    <div className="flex bg-slate-800 rounded-md p-0.5 border border-slate-700">
                        {(["left", "center", "right"] as const).map((align) => (
                            <button
                                key={align}
                                onClick={() => {
                                    onStyleChange({
                                        ...style,
                                        title: { ...style.title, align },
                                        body: { ...style.body, align },
                                    });
                                }}
                                className={`p-1.5 rounded transition-all ${style.title.align === align
                                    ? "bg-slate-600 text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {align === "left" && <AlignLeft size={14} />}
                                {align === "center" && <AlignCenter size={14} />}
                                {align === "right" && <AlignRight size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylePanel;
