const fs = require('fs');
const file = 'frontend/src/pages/TrainerDashboard.jsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// Track opening tags with line numbers
const stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match opening tags: <motion.div, <div, <main, <header, <section, <Fragment, <>
  const openMatches = line.matchAll(/<((?:motion\.)?div|main|header|section|Fragment|>)([\s/>])/g);
  for (const m of openMatches) {
    if (m[2] !== '/') { // not self-closing
      stack.push({ tag: m[1], line: i + 1 });
    }
  }
  
  // Match closing tags: </motion.div>, </div>, </main>, etc.
  const closeMatches = line.matchAll(/<\/((?:motion\.)?div|main|header|section|Fragment|>)>/g);
  for (const m of closeMatches) {
    const expected = stack.length > 0 ? stack[stack.length - 1] : null;
    if (!expected) {
      console.log(`EXTRA CLOSING at line ${i + 1}: </${m[1]}> but stack is empty`);
    } else if (expected.tag !== m[1]) {
      console.log(`MISMATCH at line ${i + 1}: expected </${expected.tag}> (opened at line ${expected.line}) but found </${m[1]}>`);
      // Try to find matching tag in stack
      const idx = stack.findIndex(s => s.tag === m[1]);
      if (idx >= 0) {
        console.log(`  -> Found </${m[1]}> match in stack at position ${idx} (opened at line ${stack[idx].line})`);
        // Pop everything above it
        const removed = stack.splice(idx);
        console.log(`  -> Removed ${removed.length} unmatched openings: ${removed.map(r => r.tag + '@' + r.line).join(', ')}`);
        stack.pop(); // pop the matched one
      } else {
        console.log(`  -> No matching opening for </${m[1]}> in stack`);
      }
    } else {
      stack.pop();
    }
  }
}

console.log('\n=== Final stack (' + stack.length + ' remaining) ===');
stack.forEach(s => console.log(`  ${s.tag} opened at line ${s.line}`));
