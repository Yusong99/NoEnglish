// ===== 拆分成「音拍（モーラ）」 =====
export function splitKanaAdvanced(kana) {
    const chars = [...kana]
    const result = []

    const smallKana = new Set([
        'ゃ', 'ゅ', 'ょ',
        'ャ', 'ュ', 'ョ',
    ])

    for (let i = 0; i < chars.length; i++) {
        const current = chars[i]
        const next = chars[i + 1]

        // 拗音（き + ゃ = きゃ）
        if (next && smallKana.has(next)) {
            result.push(current + next)
            i++
            continue
        }

        // 普通假名 / 促音 / 长音
        result.push(current)
    }

    return result
}

// ===== 是否是「完整音拍输入」 =====
export function isCompleteKana(text) {
    if (!text) return false

    // 单假名
    if (/^[\u3040-\u309F]$/.test(text)) return true
    if (/^[\u30A0-\u30FF]$/.test(text)) return true

    // 拗音（ちゅ / きょ / しゃ）
    if (/^[\u3040-\u309F][ゃゅょ]$/.test(text)) return true
    if (/^[\u30A0-\u30FF][ャュョ]$/.test(text)) return true

    return false
}
