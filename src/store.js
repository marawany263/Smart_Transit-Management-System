import { seedData } from './data.js';

const DATA_KEY = 'khotwa-demo-data-v1';
const USER_KEY = 'khotwa-demo-user-v1';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function loadData() {
  try {
    const saved = localStorage.getItem(DATA_KEY);
    if (!saved) return clone(seedData);
    const data = JSON.parse(saved);
    if (!data || data.meta?.version !== seedData.meta.version) return clone(seedData);
    return { ...clone(seedData), ...data };
  } catch (error) {
    console.error('Unable to load demo data from localStorage.', error);
    return clone(seedData);
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Unable to save demo data to localStorage.', error);
    window.dispatchEvent(new CustomEvent('storage-error', { detail: 'تعذر حفظ التغييرات. تحقق من مساحة التخزين في المتصفح.' }));
  }
}

export function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch (error) {
    console.error('Unable to load demo session.', error);
    return null;
  }
}

export function saveUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export function resetData() {
  localStorage.removeItem(DATA_KEY);
  return clone(seedData);
}

// Build cache bust for GitHub Pages CDN propagation.
