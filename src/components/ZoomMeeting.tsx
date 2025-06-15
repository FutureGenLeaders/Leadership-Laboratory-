
import React, { useEffect, useRef } from "react";

// Please note: This is a placeholder for the Zoom Web SDK integration.
// For security, generating a Zoom meeting signature must be done on the backend.

interface ZoomMeetingProps {
  meetingNumber: string;
  password: string;
  userName: string;
  signature: string;
  apiKey: string;
  leaveUrl: string;
  onClose: () => void;
}

const ZoomMeeting: React.FC<ZoomMeetingProps> = ({
  meetingNumber,
  password,
  userName,
  signature,
  apiKey,
  leaveUrl,
  onClose,
}) => {
  const zoomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder: You would load the Zoom Web SDK and join the meeting here.
    // https://github.com/zoom/videosdk-web-sample
    // For this example, we show a message only.

    if (zoomDivRef.current) {
      zoomDivRef.current.innerHTML = `
        <div class='text-center'>
          <p class='text-lg font-semibold mb-2'>Zoom meeting would embed here:</p>
          <p class='mb-1'><b>Meeting ID:</b> ${meetingNumber}</p>
          <p class='mb-1'><b>User Name:</b> ${userName}</p>
          <p class='mb-1'><b>Password:</b> ${password}</p>
          <p class='text-sm text-red-400'>[Full Zoom Web SDK integration not included in this demo]</p>
        </div>
      `;
    }
  }, [meetingNumber, password, userName]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div ref={zoomDivRef} />
        <button
          className="mt-6 px-6 py-2 rounded bg-red-600 text-white font-semibold w-full"
          onClick={onClose}
        >
          Leave Meeting
        </button>
      </div>
    </div>
  );
};

export default ZoomMeeting;
