export type TextBlockKind = "title" | "body" | "username";

export interface TextBlock {
    id: string;
    kind: TextBlockKind;
    text: string;
    x: number; // 0-100 (%)
    y: number; // 0-100 (%)
    color?: string; // Tùy chọn màu riêng cho block này
}

export interface Slide {
    id: string;
    index: number;
    backgroundUrl: string;
    blocks: TextBlock[];
}

export interface Typography {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    color: string;
    align: "left" | "center" | "right";
    numbered: boolean;
}

export interface StyleConfig {
    title: Typography;
    body: Typography;
    username: Typography;
    usernameText: string;
    commonBackgroundUrl: string;
}

export interface EditorState {
    rawMarkdown: string;
    slides: Slide[];
    currentSlideIndex: number;
    style: StyleConfig;
    selectedBlockId?: { slideId: string, blockId: string } | null;
}

export const DEFAULT_FONTS = [
    { name: "Be Vietnam Pro (Chuẩn Việt)", value: "Be Vietnam Pro" },
    { name: "Roboto (Cơ bản)", value: "Roboto" },
    { name: "Nunito (Thân thiện)", value: "Nunito" },
    { name: "Montserrat (Mạnh mẽ)", value: "Montserrat" },
    { name: "Lora (Báo chí)", value: "Lora" },
    { name: "Playfair Display (Sang trọng)", value: "Playfair Display" },
    { name: "Oswald (Tiêu đề lớn)", value: "Oswald" },
    { name: "Dancing Script (Viết tay)", value: "Dancing Script" },
];

export const INITIAL_STYLE: StyleConfig = {
    title: {
        fontFamily: "Montserrat",
        fontSize: 72,
        lineHeight: 1.4,
        color: "#fbbf24", // Vàng hổ phách
        align: "center",
        numbered: false,
    },
    body: {
        fontFamily: "Montserrat",
        fontSize: 40,
        lineHeight: 1.5,
        color: "#ffffff",
        align: "center",
        numbered: false,
    },
    username: {
        fontFamily: "Montserrat",
        fontSize: 24,
        lineHeight: 1.2,
        color: "rgba(255, 255, 255, 0.6)",
        align: "left",
        numbered: false,
    },
    usernameText: "@username_cua_ban",
    commonBackgroundUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
};
