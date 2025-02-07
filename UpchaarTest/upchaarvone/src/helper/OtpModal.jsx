import React from "react";

const OtpModal = ({
  isOpen,
  setOpen,
  email,
  otp,
  setOtp,
  isLoading,
  errorMessage,
  successMessage,
  handleOtpSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-4">
          A verification code was sent to: {email}
        </p>

        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleOtpSubmit}
          className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit OTP"}
        </button>
        <button
          onClick={onClose}
          className="w-full p-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
