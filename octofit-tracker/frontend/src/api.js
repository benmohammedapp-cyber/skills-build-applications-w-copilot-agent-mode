export function getApiBaseUrl() {
  if (import.meta.env.DEV) {
    return '';
  }

  const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const derivedCodespaceName = hostname.includes('-5173.app.github.dev')
    ? hostname.replace(/-5173\.app\.github\.dev$/, '')
    : '';

  const codespaceName =
    envCodespaceName && envCodespaceName.trim() && envCodespaceName !== 'undefined'
      ? envCodespaceName.trim()
      : derivedCodespaceName;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  const normalizedResource = resource.replace(/^\//, '').replace(/\/$/, '');
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}/api/${normalizedResource}/` : `/api/${normalizedResource}/`;
}

export async function fetchApiCollection(resource) {
  const url = buildApiUrl(resource);
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load ${resource} from ${url}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
