"use client";

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="text-sm text-red-400"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
    >
      Logout
    </button>
  );
}
