import type { Slide, TextBlock } from "../types";

export const parseMarkdown = (raw: string, backgroundUrl: string): Slide[] => {
    if (!raw.trim()) return [];

    const MAX_CHARS_PER_SLIDE = 300;
    const slides: Slide[] = [];
    const sections = raw.split(/^#\s+/m).filter(s => s.trim());

    let slideCounter = 0;

    sections.forEach((section) => {
        const lines = section.split("\n");
        const title = lines[0].trim();
        const bodyContent = lines.slice(1).join("\n").trim();

        if (bodyContent.length > MAX_CHARS_PER_SLIDE) {
            // Smart Splitting: Split by paragraphs or sentence breaks
            const paragraphs = bodyContent.split(/\n\s*\n/);
            let currentChunk = "";

            paragraphs.forEach((para) => {
                // If a single paragraph is still too long, split by sentences
                if (para.length > MAX_CHARS_PER_SLIDE) {
                    if (currentChunk) {
                        addSlide(title, currentChunk);
                        currentChunk = "";
                    }

                    const sentences = para.split(/(?<=[.!?])\s+/);
                    let sentenceChunk = "";

                    sentences.forEach((sentence) => {
                        if ((sentenceChunk + sentence).length > MAX_CHARS_PER_SLIDE && sentenceChunk) {
                            addSlide(title, sentenceChunk);
                            sentenceChunk = sentence;
                        } else {
                            sentenceChunk = sentenceChunk ? sentenceChunk + " " + sentence : sentence;
                        }
                    });

                    if (sentenceChunk) {
                        currentChunk = sentenceChunk;
                    }
                } else if ((currentChunk + para).length > MAX_CHARS_PER_SLIDE && currentChunk) {
                    addSlide(title, currentChunk);
                    currentChunk = para;
                } else {
                    currentChunk = currentChunk ? currentChunk + "\n\n" + para : para;
                }
            });

            if (currentChunk) {
                addSlide(title, currentChunk);
            }
        } else {
            addSlide(title, bodyContent);
        }
    });

    function addSlide(title: string, body: string) {
        slides.push({
            id: `slide-${slideCounter}`,
            index: slideCounter + 1,
            backgroundUrl,
            blocks: [
                {
                    id: `title-${slideCounter}`,
                    kind: "title",
                    text: title,
                    x: 50,
                    y: 25,
                },
                {
                    id: `body-${slideCounter}`,
                    kind: "body",
                    text: body,
                    x: 50,
                    y: 60,
                }
            ],
        });
        slideCounter++;
    }

    return slides;
};
