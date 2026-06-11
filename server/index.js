import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database Paths
const DB_DIR = path.join(__dirname, '../database');
const FILES = {
  employees: path.join(DB_DIR, 'employees.json'),
  structure: path.join(DB_DIR, 'structure.json'),
  coursesConfig: path.join(DB_DIR, 'coursesConfig.json'),
};

// Ensure database directory and files exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR);
}

// Helper to read JSON
const readData = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultData;
  }
};

// Helper to write JSON
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

// --- API Endpoints ---

// 1. Get all data at once (for initial load)
app.get('/api/data', (req, res) => {
  const employees = readData(FILES.employees, []);
  const structure = readData(FILES.structure, []);
  const coursesConfig = readData(FILES.coursesConfig, { pathsConfig: [], courseMetadata: {} });
  
  res.json({
    employees,
    structure,
    coursesConfig
  });
});

// 2. Save employees
app.post('/api/employees', (req, res) => {
  const success = writeData(FILES.employees, req.body);
  if (success) res.json({ success: true });
  else res.status(500).json({ success: false, error: 'Failed to write employees' });
});

// 3. Save structure
app.post('/api/structure', (req, res) => {
  const success = writeData(FILES.structure, req.body);
  if (success) res.json({ success: true });
  else res.status(500).json({ success: false, error: 'Failed to write structure' });
});

// 4. Save courses config
app.post('/api/courses', (req, res) => {
  const success = writeData(FILES.coursesConfig, req.body);
  if (success) res.json({ success: true });
  else res.status(500).json({ success: false, error: 'Failed to write courses config' });
});

// --- Serve Frontend ---
// Serve the built dist folder
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));


app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`✅ CareerPath Backend Server is running!`);
  console.log(`🌐 Application URL: http://localhost:${PORT}`);
  console.log(`📂 Database stored in: ${DB_DIR}`);
  console.log(`========================================`);
});
