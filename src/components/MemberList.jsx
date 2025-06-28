import React, { useEffect, useState } from 'react';
import MemberListResponse from './MemberListResponse';
import bgImage from './images/Background.jpg'; // Make sure path is valid

function MemberList() {
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:8080/member-list");

        if (!response.ok) {
          throw new Error("Failed to fetch member list.");
        }

        const membersData = await response.json();
        if (membersData.length === 0) {
          alert("No members found.");
        } else {
          setMembers(membersData);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        alert("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {loading ? (
        <p className="text-white text-xl">Loading members...</p>
      ) : members ? (
        <MemberListResponse members={members} />
      ) : (
        <p className="text-white text-xl">No members found.</p>
      )}
    </div>
  );
}

export default MemberList;
