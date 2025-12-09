export default function UserTable({ invitations }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#556B2F]/10 text-[#2F2F2F] uppercase tracking-wide text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Speciality</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Invited On</th>
          </tr>
        </thead>
        <tbody>
          {invitations.length > 0 ? (
            invitations.map((inv) => (
              <tr
                key={inv._id}
                className="border-t border-[#EAE7DC] hover:bg-[#F9F8F4] transition"
              >
                <td className="px-4 py-3 font-medium">{inv.email}</td>
                <td className="px-4 py-3 text-[#444]">{inv.speciality}</td>
                <td className="px-4 py-3">
                  {inv.status === "accepted" ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Accepted
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#666]">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center text-gray-500 py-6 italic"
              >
                No invitations yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
