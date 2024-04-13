type AuthorizedProps = {
  uid: string;
  setUid: (uid: string) => void;
};

export const Authorized = ({ uid, setUid }: AuthorizedProps) => {
  const handleLogout = async () => {
    setUid("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Token: {uid}</p>
      <button
        style={{
          background: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          margin: "10px",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
