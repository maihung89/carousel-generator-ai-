import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, X, Key, Zap, ExternalLink } from "lucide-react";

interface EditorPanelProps {
    markdown: string;
    onMarkdownChange: (md: string) => void;
    isReady: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ markdown, onMarkdownChange, isReady }) => {
    const [showAIModal, setShowAIModal] = useState(false);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        localStorage.setItem("gemini_api_key", apiKey);
    }, [apiKey]);

    const handleGenerate = async () => {
        if (!apiKey || !prompt) {
            alert("Vui lòng nhập đầy đủ API Key và ý tưởng nội dung.");
            return;
        }
        setIsGenerating(true);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Bạn là một chuyên gia sáng tạo nội dung cho mạng xã hội. 
Hệ thống sẽ cung cấp ý tưởng hoặc nội dung thô cho bạn. 
Nhiệm vụ của bạn là chuyển đổi chúng thành một bộ slide Carousel chuyên nghiệp theo định dạng Markdown Lite.

QUY TẮC QUAN TRỌNG:
1. CHỈ trả về nội dung Markdown nguyên bản. KHÔNG có lời giải thích, KHÔNG có dấu ngoặc \` \` \` hay bất kỳ văn bản nào khác.
2. Cấu trúc mỗi slide bắt đầu bằng dấu # (ví dụ: # Tiêu đề). KHÔNG thêm tiền tố "Slide 1", "Trang 1" hay số thứ tự vào tiêu đề.
3. Mỗi slide gồm tiêu đề và tối đa 3-4 câu nội dung chi tiết.
4. Ưu tiên ngôn ngữ súc tích, hấp dẫn, đúng phong cách viral (sử dụng icon nếu cần).

Ý tưởng người dùng cung cấp: 
"${prompt}"`
                        }]
                    }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || "Lỗi API");
            }

            let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                // Hậu xử lý: loại bỏ các ký tự bọc markdown nếu có
                text = text.replace(/```markdown/g, "").replace(/```/g, "").trim();
                onMarkdownChange(text);
                setShowAIModal(false);
                setPrompt("");
            } else {
                alert("AI không trả về kết quả. Hãy thử lại với ý tưởng khác.");
            }
        } catch (error: any) {
            console.error("AI Generation failed:", error);
            alert(`Lỗi: ${error.message || "Không thể kết nối với Gemini"}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 flex-1 min-h-0 relative">
            {/* Modal Overlay */}
            {showAIModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-6 pb-4 flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-900/40 shrink-0">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white leading-tight">AI Magic Writer</h2>
                                <p className="text-sm text-slate-400 mt-1">
                                    Nhập ý tưởng hoặc nội dung thô, AI sẽ tự động chia thành các slide chuyên nghiệp.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4 space-y-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[12px] font-bold text-slate-300 uppercase tracking-wider">
                                    Gemini API Key <span className="text-[10px] text-slate-500 font-normal lowercase italic">(Lưu trên máy bạn)</span>
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="password"
                                        placeholder="Paste key vào đây..."
                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-600"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                    />
                                </div>
                                <a
                                    href="https://aistudio.google.com/app/api-keys"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-[11px] font-bold transition-colors w-fit"
                                >
                                    <ExternalLink size={12} />
                                    Lấy key miễn phí từ Google
                                </a>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">
                                    Nội dung thô / Ý tưởng
                                </label>
                                <textarea
                                    placeholder="Ví dụ: Tóm tắt bài viết này thành 5 slide về chủ đề Digital Marketing..."
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all h-32 resize-none placeholder:text-slate-600 leading-relaxed"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 pt-2 flex gap-3">
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleGenerate();
                                }}
                                disabled={isGenerating || !apiKey || !prompt}
                                className="flex-[2] px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                {isGenerating ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Zap size={18} fill="currentColor" />
                                )}
                                {isGenerating ? "Đang tạo..." : "Tạo Slide"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center px-1">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] opacity-80">
                    Nội dung (Markdown Lite)
                </h3>
                <button
                    onClick={() => setShowAIModal(true)}
                    className="group relative overflow-hidden text-[10px] bg-slate-800/50 hover:bg-purple-600 text-white px-4 py-1.5 rounded-full border border-white/5 hover:border-purple-500 transition-all duration-300 flex items-center gap-2 font-black shadow-lg"
                >
                    <Sparkles className="text-purple-400 group-hover:text-white transition-colors" size={11} />
                    <span className="uppercase tracking-widest">AI Viết hộ</span>
                </button>
            </div>

            <div className="flex-1 min-h-0 panel-card !p-0 flex flex-col relative group overflow-hidden border-white/5 shadow-2xl">
                <textarea
                    className="w-full h-full bg-slate-900/10 border-none focus:ring-0 p-6 text-[14px] text-slate-300 font-medium font-mono resize-none leading-relaxed transition-all placeholder:text-slate-700"
                    placeholder="# Slide 1: Tiêu đề&#10;Nội dung dòng 1...&#10;Nội dung dòng 2...&#10;&#10;# Slide 2: Tiêu đề tiếp theo&#10;Nội dung slide 2..."
                    value={markdown}
                    onChange={(e) => onMarkdownChange(e.target.value)}
                />

                {isReady && markdown.trim() && (
                    <div className="absolute bottom-5 right-5 flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-slate-950/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 animate-in fade-in slide-in-from-bottom-2">
                        <CheckCircle2 size={12} strokeWidth={4} />
                        READY
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorPanel;
