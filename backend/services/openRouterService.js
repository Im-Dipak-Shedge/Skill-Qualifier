// export const extractSkills = async (resumeText) => {
//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             model: 'openai/gpt-4.1-mini',
//             max_tokens: 600,          // 🔴 REQUIRED FIX
//             temperature: 0.2,
//             messages: [
//                 {
//                     role: 'system',
//                     content: `
// Extract technical skills from the text.

// Then compute ONE overall rating from 1 to 10 based on:
// - depth of experience
// - complexity of projects
// - number and relevance of skills

// Return ONLY valid JSON in this exact structure:
// {
//   "overall_rating": number,
//   "skills": string[]
// }

// Rules:
// - Do NOT rate individual skills
// - Do NOT include explanations, markdown, or extra text
// - overall_rating must be an integer from 1 to 10
// `
//                 }
//                 ,
//                 {
//                     role: 'user',
//                     content: resumeText,
//                 },
//             ],
//         }),
//     });

//     if (!response.ok) {
//         const err = await response.text();
//         console.error('OpenRouter error:', err);
//         throw new Error('OpenRouter request failed');
//     }

//     const data = await response.json();
//     const rawText = data.choices?.[0]?.message?.content;
//     console.log(rawText, data);

//     if (!rawText) {
//         throw new Error('AI returned no usable output');
//     }

//     return JSON.parse(rawText);

// }

export const extractSkills = async (resumeText) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s

    const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            method: 'POST',
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai/gpt-4.1-mini',
                max_tokens: 600,
                temperature: 0.2,
                messages: [
                    {
                        role: 'system',
                        content: 'Extract technical skills from the text and compute ONE overall rating from 1 to 10 based on experience, projects, and skills. ' +
                            'Return ONLY valid JSON in this exact format: {"overall_rating": number, "skills": string[]}. ' +
                            'Do not include explanations, markdown, or extra text.'
                    },
                    {
                        role: 'user',
                        content: resumeText, // 🔴 soft cap input
                    },
                ],
            }),
        }
    );

    clearTimeout(timeout);

    if (!response.ok) {
        const err = await response.text();
        console.error('OpenRouter error:', err);
        throw new Error('OpenRouter request failed');
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;

    if (!rawText) {
        throw new Error('AI returned no usable output');
    }

    // 🔴 SAFETY: extract JSON only
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        console.error('Invalid AI output:', rawText);
        throw new Error('Invalid JSON returned by AI');
    }

    return JSON.parse(jsonMatch[0]);
};
