const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function startResumeParsingJob(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BACKEND_URL}/api/parse_resume`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
}

export async function pollParsingJobStatus(statusUrl) {
  const response = await fetch(`${BACKEND_URL}/api/job_status?status_url=${encodeURIComponent(statusUrl)}`);
  if (!response.ok) {
    throw new Error(`Status check failed with status ${response.status}`);
  }
  return await response.json();
}
