import { useEffect, useState } from "react";
import axios from "../api/axios"; // make sure this path is correct

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true; // track component mount status
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });

        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error(error);
        }
      }
    };

    getUsers();

    // cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>

      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}
