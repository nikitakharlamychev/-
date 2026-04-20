// ===== РОЛИ =====
const ROLES = { USER: 'user', WORKER: 'worker', DEV: 'dev' };

// ===== ПОЛУЧИТЬ ТЕКУЩУЮ РОЛЬ =====
export function getRole() {
  // 1. Проверяем секретный параметр в URL (для тебя)
  const urlParams = new URLSearchParams(window.location.search);
  const urlRole = urlParams.get('role');
  if (Object.values(ROLES).includes(urlRole)) {
    localStorage.setItem('vanilla_role', urlRole);
    return urlRole;
  }
  // 2. Проверяем сохранённую роль
  return localStorage.getItem('vanilla_role') || ROLES.USER;
}

// ===== ПРОВЕРКА ДОСТУПА =====
export function requireRole(role) {
  const current = getRole();
  if (current !== role) {
    // Перенаправляем на главную (пользовательскую версию)
    window.location.href = 'index.html';
    return false;
  }
  document.documentElement.setAttribute('data-role', role);
  return true;
}

// ===== УСТАНОВИТЬ РОЛЬ (для секретного входа) =====
export function setRole(role) {
  if (!Object.values(ROLES).includes(role)) return false;
  localStorage.setItem('vanilla_role', role);
  document.documentElement.setAttribute('data-role', role);
  const pages = { [ROLES.USER]: 'index.html', [ROLES.WORKER]: 'bouquet.html', [ROLES.DEV]: 'interior.html' };
  window.location.href = pages[role] || 'index.html';
  return true;
}

// ===== ВЫХОД =====
export function logout() {
  localStorage.removeItem('vanilla_role');
  // Очищаем параметр из URL
  if (window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  window.location.href = 'index.html';
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
export function initAuth() {
  const role = getRole();
  document.documentElement.setAttribute('data-role', role);
  return role;
}
