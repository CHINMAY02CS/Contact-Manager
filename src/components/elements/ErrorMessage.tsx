export default function ErrorMessage({ error }: { error?: string }) {
  return <p className="error-message">{error}</p>;
}
