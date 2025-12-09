import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import api from "../api/axios";

export default function InvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyInvite = async () => {
      try {
        const { data } = await api.get(`/invite/verify?token=${token}`);
        setInvite(data.invite);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "This invitation is invalid or has expired."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyInvite();
    else {
      setError("No invitation token found.");
      setLoading(false);
    }
  }, [token]);

  const handleContinue = () => {
    navigate(`/invite/confirm?token=${token}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE] px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#EAE7DC] p-8 text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-[#708D81]">
            <Loader2 size={32} className="animate-spin" />
            <p className="font-medium">Verifying your invitation...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 text-[#A63C3C]">
            <AlertTriangle size={40} />
            <h2 className="text-lg font-semibold">Invitation Issue</h2>
            <p className="text-sm text-gray-600">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-5 py-2 bg-[#708D81] text-white rounded-md hover:bg-[#5B7267] transition"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 size={48} className="text-[#708D81]" />
            <h2 className="text-2xl font-bold text-[#2F2F2F]">
              Invitation Verified
            </h2>
            <p className="text-gray-600 text-sm">
              You’ve been invited to join <strong>TaskManager</strong>.
            </p>

            <div className="bg-[#F9F8F4] border border-[#EAE7DC] rounded-lg w-full mt-4 p-4 text-left">
              <p className="text-sm text-[#2F2F2F]">
                <span className="font-semibold">Email:</span> {invite.email}
              </p>
              <p className="text-sm text-[#2F2F2F] mt-1">
                <span className="font-semibold">Speciality:</span>{" "}
                {invite.speciality}
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 w-full bg-[#556B2F] hover:bg-[#445726] text-white font-medium py-2.5 rounded-lg transition"
            >
              Continue to Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
