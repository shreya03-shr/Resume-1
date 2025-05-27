export const titleSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 20px',
  borderBottom: '1px solid #ccc',
  gap: 10,
};

export const formSectionStyle = {
  width: '40%',
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: 20,
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 180px)',
};

export const previewSectionStyle = {
  width: '794px',
  minHeight: '1123px',
  border: '1px solid #000',
  borderRadius: 8,
  padding: 30,
  backgroundColor: 'white',
  color: '#000',
  fontSize: 14,
  fontFamily: 'Georgia, serif',
  lineHeight: 1.5,
  overflowY: 'auto',
};

export const inputStyle = {
  width: '100%',
  padding: 10,
  marginTop: 6,
  marginBottom: 12,
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 16,
  boxSizing: 'border-box',
};

export const textareaStyle = {
  ...inputStyle,
  minHeight: 80,
  resize: 'vertical',
};

export const buttonStyle = {
  padding: '10px 18px',
  fontSize: 15,
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

export const atsResultStyle = {
  marginTop: 25,
  backgroundColor: '#f8f9fa',
  padding: 15,
  borderRadius: 5,
  border: '1px solid #ced4da',
  fontSize: 14,
};
