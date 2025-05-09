import { useEffect, useState } from "react";

export type User = {
  userId: number;
  firstName: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  // Add any other fields your User object contains
};

const defaultUser: User = {
  userId: 0,
  firstName: "",
  surname: "",
  username: "",
  password: "",
  email: "",
};

const EditFields = ({
  user,
}: {
  user: { username: string; userId: number };
}) => {
  const [userData, setUserData] = useState(defaultUser);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserInfo(user.userId);

      setUserData(data);
    };

    getUser();
  });

  if (!user) {
    return <div className="text-white">Loading user data...</div>;
  }
  const refreshData = async () => {
    const res = await fetch(
      `http://localhost:8080/auth/${user.userId}/all`,
      {}
    );
    const updated = await res.json();
    setUserData(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-white">Edit Profile Fields</h2>

      <EditableField
        label="First Name"
        name="firstName"
        value={userData.firstName}
        username={user.username}
        onUpdate={refreshData}
      />
      <EditableField
        label="Surname"
        name="surname"
        value={userData.surname}
        username={user.username}
        onUpdate={refreshData}
      />
      <EditableField
        label="Username"
        name="username"
        value={userData.username}
        username={user.username}
        onUpdate={refreshData}
      />
      <EditableField
        label="Email"
        name="email"
        value={userData.email}
        username={user.username}
        onUpdate={refreshData}
      />

      <PasswordField username={user.username} onUpdate={refreshData} />
    </div>
  );
};

export default EditFields;

type PasswordFieldProps = {
  username: string;
  onUpdate: () => void;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  username,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/auth/${username}/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Update failed");
      }

      setEditing(false);
      setOldPassword("");
      setNewPassword("");
      setStatus("Password updated successfully!");
      onUpdate();
    } catch (err: any) {
      setStatus(err.message || "Update failed.");
    }
  };

  return (
    <div className="flex flex-col gap-1 text-white">
      <label className="font-semibold">Password</label>
      {editing ? (
        <>
          <input
            className="p-2 bg-gray-700 rounded"
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            className="p-2 bg-gray-700 rounded mt-2"
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </>
      ) : (
        <p className="p-2 bg-gray-700 rounded">********</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className={`px-4 py-1 mt-1 rounded ${
            editing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editing ? "Save" : "Edit"}
        </button>

        {editing && (
          <button
            onClick={() => {
              setEditing(false);
              setOldPassword("");
              setNewPassword("");
              setStatus("");
            }}
            className="px-4 py-1 mt-1 rounded bg-red-600 hover:bg-red-700"
          >
            Cancel
          </button>
        )}
      </div>

      {status && <span className="text-sm text-gray-300">{status}</span>}
    </div>
  );
};

type EditableFieldProps = {
  label: string;
  name: string;
  value: string | undefined;
  username: string;
  onUpdate: () => void;
};

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  name,
  value,
  username,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/auth/${username}/update-${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [name]: inputValue }),
        }
      );

      if (!res.ok) throw new Error("Update failed");
      setEditing(false);
      setStatus("Updated successfully!");
      onUpdate();
    } catch (err) {
      setStatus("Update failed.");
    }
  };

  return (
    <div className="flex flex-col gap-1 text-white">
      <label className="font-semibold">{label}</label>
      {editing ? (
        <input
          className="p-2 bg-gray-700 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <p className="p-2 bg-gray-700 rounded">
          {value ? value : "no name exists"}
        </p>
      )}
      <div className="flex gap-2">
        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className={`px-4 py-1 mt-1 rounded ${
            editing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editing ? "Save" : "Edit"}
        </button>

        {editing && (
          <button
            onClick={() => {
              setInputValue(value); // revert changes
              setEditing(false);
              setStatus("");
            }}
            className="px-4 py-1 mt-1 rounded bg-red-600 hover:bg-red-700"
          >
            Cancel
          </button>
        )}
      </div>

      {status && <span className="text-sm text-gray-300">{status}</span>}
    </div>
  );
};

const fetchUserInfo = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:8080/auth/${userId}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
};
