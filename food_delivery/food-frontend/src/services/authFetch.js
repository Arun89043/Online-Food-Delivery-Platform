const API_URL = "http://127.0.0.1:8000";

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    window.location.href = "/login";
    return null;
  }

  const response = await fetch(`${API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("access", data.access);
    return data.access;
  } else {
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
}

export async function authFetch(url, options = {}) {
  let access = localStorage.getItem("access");

  options.headers = {
    ...options.headers,
    "Authorization": `Bearer ${access}`
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    access = await refreshAccessToken();

    if (!access) return response;

    options.headers["Authorization"] = `Bearer ${access}`;
    response = await fetch(url, options);
  }

  return response;
}
