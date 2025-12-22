/**
 * Lighthouse Audit Script
 * 
 * Runs Lighthouse audits on major pages and verifies performance scores
 * Requirements: 4.3 - Performance score > 90
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Pages to audit
const pagesToAudit = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'Audio Therapy', url: 'http://localhost:3000/therapies/audio' },
  { name: 'Reading Therapy', url: 'http://localhost:3000/therapies/reading' },
  { name: 'Yoga Therapy', url: 'http://localhost:3000/therapies/yoga' },
  { name: 'Contact', url: 'http://localhost:3000/contact' },
];

// Minimum scores required
const MIN_PERFORMANCE_SCORE = 90;
const MIN_ACCESSIBILITY_SCORE = 90;
const MIN_BEST_PRACTICES_SCORE = 90;
const MIN_SEO_SCORE = 90;

console.log('🚀 Starting Lighthouse Audits...\n');
console.log('Note: This script requires the Next.js server to be running on port 3000');
console.log('Run "npm run build && npm start" in a separate terminal first.\n');

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, 'lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

let allPassed = true;
const results = [];

// Check if Lighthouse is installed
try {
  execSync('npx lighthouse --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Lighthouse is not installed. Installing...');
  execSync('npm install -g lighthouse', { stdio: 'inherit' });
}

// Run audits for each page
for (const page of pagesToAudit) {
  console.log(`\n📊 Auditing: ${page.name}`);
  console.log(`   URL: ${page.url}`);
  
  const reportPath = path.join(reportsDir, `${page.name.toLowerCase().replace(/\s+/g, '-')}.json`);
  
  try {
    // Run Lighthouse
    execSync(
      `npx lighthouse ${page.url} --output=json --output-path="${reportPath}" --chrome-flags="--headless" --quiet`,
      { stdio: 'inherit' }
    );
    
    // Read the report
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    // Extract scores
    const scores = {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories['best-practices'].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    };
    
    // Check if scores meet requirements
    const passed = {
      performance: scores.performance >= MIN_PERFORMANCE_SCORE,
      accessibility: scores.accessibility >= MIN_ACCESSIBILITY_SCORE,
      bestPractices: scores.bestPractices >= MIN_BEST_PRACTICES_SCORE,
      seo: scores.seo >= MIN_SEO_SCORE,
    };
    
    const allScoresPassed = Object.values(passed).every(p => p);
    
    // Display results
    console.log(`\n   Results for ${page.name}:`);
    console.log(`   ${passed.performance ? '✅' : '❌'} Performance: ${scores.performance}/100 (min: ${MIN_PERFORMANCE_SCORE})`);
    console.log(`   ${passed.accessibility ? '✅' : '❌'} Accessibility: ${scores.accessibility}/100 (min: ${MIN_ACCESSIBILITY_SCORE})`);
    console.log(`   ${passed.bestPractices ? '✅' : '❌'} Best Practices: ${scores.bestPractices}/100 (min: ${MIN_BEST_PRACTICES_SCORE})`);
    console.log(`   ${passed.seo ? '✅' : '❌'} SEO: ${scores.seo}/100 (min: ${MIN_SEO_SCORE})`);
    
    results.push({
      page: page.name,
      url: page.url,
      scores,
      passed: allScoresPassed,
    });
    
    if (!allScoresPassed) {
      allPassed = false;
    }
    
  } catch (error) {
    console.error(`   ❌ Error auditing ${page.name}:`, error.message);
    allPassed = false;
    results.push({
      page: page.name,
      url: page.url,
      error: error.message,
      passed: false,
    });
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📈 LIGHTHOUSE AUDIT SUMMARY');
console.log('='.repeat(60));

results.forEach(result => {
  if (result.error) {
    console.log(`\n❌ ${result.page}: ERROR`);
    console.log(`   ${result.error}`);
  } else {
    console.log(`\n${result.passed ? '✅' : '❌'} ${result.page}:`);
    console.log(`   Performance: ${result.scores.performance}/100`);
    console.log(`   Accessibility: ${result.scores.accessibility}/100`);
    console.log(`   Best Practices: ${result.scores.bestPractices}/100`);
    console.log(`   SEO: ${result.scores.seo}/100`);
  }
});

console.log('\n' + '='.repeat(60));

if (allPassed) {
  console.log('✅ All pages passed Lighthouse audits!');
  console.log(`📁 Reports saved to: ${reportsDir}`);
  process.exit(0);
} else {
  console.log('❌ Some pages failed Lighthouse audits.');
  console.log('   Review the reports for details and fix the issues.');
  console.log(`📁 Reports saved to: ${reportsDir}`);
  process.exit(1);
}
