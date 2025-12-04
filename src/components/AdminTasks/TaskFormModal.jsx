import { useState, useEffect } from "react";
import { createTask } from "../../api/taskApi";
import { getUsers } from "../../api/userApi";
import { X } from "lucide-react";

export default function TaskFormModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [subtask, setSubtask] = useState("");

  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        attachments: file ? [file.name] : [],
      };
      await createTask(data);
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded p-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="border rounded p-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="border rounded p-2"
              required
            />
          </div>

          {/* Assign Users */}
          <div>
            <label className="font-medium text-sm mb-2 block">Assign To:</label>
            <select
              multiple
              className="border rounded p-2 w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  assignedTo: [...e.target.selectedOptions].map((o) => o.value),
                })
              }
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Checklist */}
          <div>
            <label className="font-medium text-sm mb-2 block">Checklist:</label>
            <div className="flex gap-2">
              <input
                value={subtask}
                onChange={(e) => setSubtask(e.target.value)}
                placeholder="Subtask..."
                className="border rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (subtask.trim()) {
                    setForm({
                      ...form,
                      todoChecklist: [
                        ...form.todoChecklist,
                        { text: subtask, completed: false },
                      ],
                    });
                    setSubtask("");
                  }
                }}
                className="bg-[#708D81] text-[#F4F1DE] px-3 rounded"
              >
                +
              </button>
            </div>

            <ul className="mt-2 space-y-1 text-sm">
              {form.todoChecklist.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.text}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        todoChecklist: form.todoChecklist.filter(
                          (_, idx) => idx !== i
                        ),
                      })
                    }
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Attachment */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#708D81] text-[#F4F1DE] px-5 py-2 rounded hover:bg-[#5D7A6E]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
