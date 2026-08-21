const fs = require('fs');

const text = `Title,Subtitle,Type,Duration,BackgroundImg,OverlayImg,BubbleText
Countdown:,,countdown,30000,,,
Don't forget about Mum!,Mother's Day is just around the corner....,normal,30000,,,
Sunday 10th May,Book your table today for lunch or dinner,normal,30000,,,
Mother's Day Menu,T.B.A.,normal,0,,,
Win a Hamper!,All Mum's dining here on Mother's Day will be put into the draw!,normal,30000,,,
Hamper will be drawn Monday 10 May @ 10am,Winner will be notified by phone,normal,0,,,`;

function splitCSVLine(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            parts.push(current.trim());
            current = '';
        } else current += char;
    }
    parts.push(current.trim());
    return parts;
}

function parseSlidesCSV(text) {
    const rows = text.split(/\r?\n/).filter(line => line.trim());
    if (rows.length < 2) return [];

    return rows.slice(1).map(line => {
        const parts = splitCSVLine(line);
        const clean = parts.map(p => p.replace(/^"|"$/g, '').trim());
        return {
            title: clean[0],
            subtitle: clean[1] || '',
            type: (clean[2] || 'normal').toLowerCase(),
            duration: parseInt(clean[3]) || 8000,
            backgroundImage: clean[4] || '',
            overlayImage: clean[5] || '',
            bubbleText: clean[6] || ''
        };
    }).filter(s => s.title || s.subtitle);
}

console.log(parseSlidesCSV(text));
