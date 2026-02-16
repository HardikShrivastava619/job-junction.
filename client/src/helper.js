import socket from "./socket.js";

export function convertUTCToIST(utcDateStr) {
  const utcDate = new Date(utcDateStr);

  const istDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  const nowIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  const isSameDate =
    istDate.getDate() === nowIST.getDate() &&
    istDate.getMonth() === nowIST.getMonth() &&
    istDate.getFullYear() === nowIST.getFullYear();

  const timeStr = istDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isSameDate) {
    return `Today, ${timeStr}`;
  } else {
    return istDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
}

export function getPreciseDateOldness(utcDateString) {
  const inputDate = new Date(utcDateString);
  const today = new Date();

  let years = today.getFullYear() - inputDate.getFullYear();
  let months = today.getMonth() - inputDate.getMonth();
  let days = today.getDate() - inputDate.getDate();

  // Adjust for negative day difference
  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  // Adjust for negative month difference
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Build the result string
  let result = [];
  if (years > 0) result.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) result.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0 || result.length === 0)
    result.push(`${days} day${days !== 1 ? "s" : ""}`);

  return result.join(", ") + " ago";
}

export const convertName = (name) => {
  try {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } catch (error) {
    console.log(error);
    return name;
  }
};

export const handleCreateNotification = async ({
  sid,
  rid,
  eid,
  type,
  action,
}) => {
  try {
    const res = await fetch(
      `https://job-junction-dpvo.onrender.com/api/notf/addNotif`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid, rid, eid, type, action }),
      },
    );

    const data = await res.json();

    socket.emit("sendNotf", data?.newNotifc);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetNotification = async (uid) => {
  try {
    const res = await fetch(
      `https://job-junction-dpvo.onrender.com/api/notf/getNotif/${uid}`,
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
