export default function Page() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20%",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2em", marginBottom: "0.5em" }}>
        Please use a desktop to access this page.
      </h1>
      <p style={{ fontSize: "1em" }}>
        This content is not available on mobile devices.
      </p>
    </div>
  );
}
