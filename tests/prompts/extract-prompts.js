// Utility to extract natural language prompts from analytics_prompts_raw.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the data by creating a temporary module
const analyticsPath = path.join(__dirname, 'search_and_filtering_prompts.ts');
const analyticsData = fs.readFileSync(analyticsPath, 'utf8');

// Extract the object data more safely
const objectStart = analyticsData.indexOf('{');
const objectEnd = analyticsData.lastIndexOf('}');
let objectData = analyticsData.slice(objectStart, objectEnd + 1);

// Remove TypeScript comments that would break JSON parsing
objectData = objectData
    .split('\n')
    .map(line => {
        // Remove lines that are entirely comments
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) {
            return '';
        }
        // Remove inline comments but preserve the rest of the line
        const commentIndex = line.indexOf('//');
        if (commentIndex !== -1) {
            // Check if the // is inside a string literal
            const beforeComment = line.substring(0, commentIndex);
            const quoteCount = (beforeComment.match(/"/g) || []).length;
            // If odd number of quotes, the // is inside a string
            if (quoteCount % 2 === 0) {
                return line.substring(0, commentIndex).trimEnd();
            }
        }
        return line;
    })
    .filter(line => line.trim() !== '')
    .join('\n');

// Remove trailing commas that would break JSON parsing
objectData = objectData.replace(/,(\s*[}\]])/g, '$1');

// Parse as JSON
const round1 = JSON.parse(objectData);

// Extract just the natural language prompts
const extractedPrompts = round1.test_cases.map(testCase => ({
    id: testCase.id,
    user_persona: testCase.user_persona,
    natural_language_prompt: testCase.natural_language_prompt,
    prompt_variations: testCase.prompt_variations
}));

const outputData = {
    metadata: round1.test_library_metadata,
    prompts: extractedPrompts
};

// Write to JSON file
const outputPath = path.join(__dirname, 'search_and_filtering_prompts.json');
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

console.log(`Extracted ${extractedPrompts.length} prompts to: ${outputPath}`);
console.log('Sample prompt:', extractedPrompts[0]);

// Export for programmatic use
export default outputData;
