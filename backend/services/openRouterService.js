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
                model: 'openai/gpt-4o-mini', // ✅ FIXED
                max_tokens: 600,
                temperature: 0.2,
                messages: [
                    {
                        role: 'system',
                        //                         content: `
                        //                        Extract ONLY programming and technical skills from the resume text.

                        // Ignore:
                        // - Soft skills (communication, leadership, teamwork, etc.)
                        // - Generic attributes (hardworking, motivated, etc.)
                        // - Non-technical tools (MS Office, basic computer skills, etc.)

                        // Only include:
                        // - Programming languages
                        // - Frameworks and libraries
                        // - Databases
                        // - DevOps tools
                        // - Cloud platforms
                        // - AI/ML technologies
                        // - Software engineering tools
                        // - Relevant technical concepts

                        // Then:

                        // 1. Compute ONE overall_rating from 1 to 10 based on:
                        //    - depth of technical experience
                        //    - complexity of technical projects
                        //    - relevance and diversity of technical skills

                        // 2. Predict the candidate's PRIMARY technical role based on experience and skills.

                        // Allowed roles (must choose ONE):
                        // - "Frontend Developer"
                        // - "Backend Developer"
                        // - "Full Stack Developer"
                        // - "Mobile Developer"
                        // - "AI/ML Engineer"
                        // - "DevOps Engineer"
                        // - "Data Engineer"
                        // - "Software Engineer"

                        // Return ONLY valid JSON in this exact structure:

                        // {
                        //   "overall_rating": number,
                        //   "predicted_role": "string",
                        //   "skills": string[]
                        // }

                        // Rules:
                        // - overall_rating must be an integer from 1 to 10
                        // - predicted_role must match exactly one of the allowed roles
                        // - Do NOT include explanations
                        // - Do NOT include markdown
                        // - Do NOT add extra fields
                        // - Output must be valid JSON only
                        // `
                        content: `
Extract ONLY programming and technical skills from the resume text.

Strictly ignore:
- Soft skills (communication, leadership, teamwork, etc.)
- Personal traits (hardworking, motivated, etc.)
- Non-technical or generic tools (MS Office, basic computer knowledge, etc.)
- Certifications without technical relevance

Include ONLY:
- Programming languages
- Frameworks and libraries
- Databases
- DevOps tools
- Cloud platforms
- AI/ML technologies
- Software engineering tools
- Version control systems
- APIs and backend technologies
- Relevant technical concepts

Then:

1) Compute ONE overall_rating from 1 to 10 based on:
   - Depth of technical experience
   - Complexity of technical projects
   - Relevance and diversity of technical skills

2) Predict up to THREE most relevant technical roles based strictly on skills and project experience.

Allowed roles (choose only from this list, no variations):
- "Frontend Developer"
- "Backend Developer"
- "Full Stack Developer"
- "Mobile Developer"
- "AI/ML Engineer"
- "DevOps Engineer"
- "Data Engineer"
- "Software Engineer"

Rules for role prediction:
- Return minimum 1 and maximum 3 roles
- Order roles by relevance (index 0 = most relevant / primary role)
- Do NOT invent new roles
- Do NOT modify role names

Return ONLY valid JSON in this exact structure:

{
  "overall_rating": number,
  "predicted_roles": ["string"],
  "skills": ["string"]
}

Strict Rules:
- overall_rating must be an integer from 1 to 10
- predicted_roles must be an array with 1 to 3 values
- Every role must exactly match one of the allowed roles
- skills must contain only technical/programming skills
- Do NOT include explanations
- Do NOT include markdown
- Do NOT add extra fields
- Output must be valid JSON only
`,
                    },
                    {
                        role: 'user',
                        content: resumeText,
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
