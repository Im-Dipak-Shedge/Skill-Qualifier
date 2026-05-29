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
                        // You are a technical resume analyzer.
                        // Task:
                        // Extract only the information required to generate technical assessments.

                        // Analyze the resume and return ONLY valid JSON.

                        // Requirements:

                        // 1. Extract ONLY REAL technical skills explicitly present in the resume.

                        // Include only:
                        // - Programming languages
                        // - Frameworks
                        // - Libraries
                        // - Databases
                        // - Backend technologies
                        // - APIs
                        // - Cloud platforms
                        // - DevOps tools
                        // - Version control systems
                        // - AI/ML technologies
                        // - Testing tools
                        // - Software engineering technologies

                        // Exclude:
                        // - Soft skills
                        // - Personal traits
                        // - Certifications
                        // - Education
                        // - Job titles
                        // - Operating systems
                        // - Generic tools
                        // - IDEs/editors
                        // - Office tools
                        // - Duplicate skills
                        // - Broad categories if specific technologies exist

                        // Examples:
                        // GOOD:
                        // ["React","Node.js","MongoDB","Docker"]

                        // BAD:
                        // ["Teamwork","Communication","Computer Knowledge","Web Development"]

                        // 2. Compute overall_rating (1–10)

                        // Scoring factors:
                        // - Technical project complexity
                        // - Practical experience
                        // - Skill diversity
                        // - Technical depth

                        // Rules:
                        // - Integer only
                        // - No decimals

                        // 3. Predict up to 3 technical roles.

                        // Allowed values only:
                        // [
                        // "Frontend Developer",
                        // "Backend Developer",
                        // "Full Stack Developer",
                        // "Mobile Developer",
                        // "AI/ML Engineer",
                        // "DevOps Engineer",
                        // "Data Engineer",
                        // "Software Engineer"
                        // ]

                        // Role rules:
                        // - Minimum 1 role
                        // - Maximum 3 roles
                        // - Ordered by relevance
                        // - Based mostly on projects + experience
                        // - Not based only on skill keywords

                        // 4. Return only skills useful for assessment generation.

                        // Output EXACTLY:

                        // {
                        //  "overall_rating": 0,
                        //  "predicted_roles": [],
                        //  "skills": []
                        // }

                        // Validation:
                        // - Valid JSON only
                        // - No markdown
                        // - No explanations
                        // - No extra fields
                        // - No null values
                        // - Remove duplicate skills
                        // - Normalize names

                        // Examples:
                        // "Node" → "Node.js"
                        // "Mongo" → "MongoDB"
                        // "JS" → "JavaScript"
                        // `,

                        content: `

You are a technical resume analyzer.

Task:
Extract ONLY the candidate’s PRIMARY technical stack for generating assessments.

The goal is to identify the technologies the candidate has MOST LIKELY worked with extensively based on:

* repeated usage
* project implementation
* work experience
* strong technical depth
* core stack relevance to their role

You must output ONLY valid JSON.

---

RULES FOR SKILL EXTRACTION:

1. Extract ONLY REAL technical skills explicitly mentioned in the resume.

Allowed categories:

* Programming languages
* Frameworks
* Libraries
* Backend technologies
* Databases
* APIs
* Cloud platforms
* DevOps tools
* Version control systems
* AI/ML technologies
* Testing tools

STRICT EXCLUSIONS:

* Soft skills
* Education
* Certifications
* Job titles
* Operating systems
* Generic terms (web development, software development)
* IDEs/editors (VS Code, IntelliJ, Eclipse)
* Basic tools unless clearly core to development workflow
* Duplicate skills

---

2. PRIMARY SKILLSET RULE (IMPORTANT):

Return ONLY the candidate’s MAJOR technical stack.

DO NOT extract every mentioned technology.

Select technologies that:

* appear multiple times
* are used in major projects
* align strongly with predicted roles
* seem central to the candidate’s actual development work
* demonstrate implementation depth

Ignore:

* briefly mentioned tools
* secondary exposure
* beginner-level mentions
* unrelated technologies

---

3. SKILL LIMIT RULE:

* Minimum 5 skills
* Maximum 10 skills
* Prioritize quality over quantity

Priority order:

1. Core programming languages
2. Main frameworks/libraries
3. Backend technologies
4. Databases
5. Cloud/DevOps
6. APIs/integrations
7. AI/ML stack

---

4. NORMALIZATION RULES:

* "Node" → "Node.js"
* "Mongo" → "MongoDB"
* "JS" → "JavaScript"
* Remove duplicates strictly

---

5. overall_rating (1–10):

Based on:

* Technical depth
* Complexity of projects
* Real implementation evidence
* Strength of primary stack
* Engineering maturity

DO NOT rate based on keyword count.

Integer only.

---

6. predicted_roles:

Allowed values only:
[
"Frontend Developer",
"Backend Developer",
"Full Stack Developer",
"Mobile Developer",
"AI/ML Engineer",
"DevOps Engineer",
"Data Engineer",
"Software Engineer"
]

Rules:

* Minimum 1 role
* Maximum 3 roles
* Sorted by relevance
* Roles must align with the PRIMARY stack

Example:

* React + Node.js + MongoDB → Full Stack Developer
* Python + TensorFlow + NLP → AI/ML Engineer

---

OUTPUT FORMAT (STRICT):

{
"overall_rating": number,
"predicted_roles": string[],
"skills": string[]
}

---

VALIDATION RULES:

* Valid JSON only
* No markdown
* No explanations
* No extra keys
* No null values
* skills length must be 5–10
  `
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
