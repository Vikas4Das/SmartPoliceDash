import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../utils/auth";

export default function EntryForm() {
  const auth = useAuth();

  const [form, setForm] = useState({
    district: "",
    period: "",
    nbwPending: 0,
    nbwExecuted: 0,
    nbwDisposed: 0,
    firearmsCases: 0,
    firearmsArrested: 0,
    ipcConvictions: 0,
    sllConvictions: 0,
    drunkenConvictions: 0,
    detections: "",
  });

  const [files, setFiles] = useState([]);

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function handleFileUpload(e) {
    const uploads = Array.from(e.target.files);

    // Convert files → base64 (for preview + storage)
    const converted = await Promise.all(
      uploads.map((file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({ name: file.name, data: reader.result });
          reader.readAsDataURL(file);
        })
      )
    );

    setFiles([...files, ...converted]);
  }

  function submit(e) {
    e.preventDefault();

    // Load previous entries
    const entries = JSON.parse(localStorage.getItem("sp_entries") || "[]");

    // Create new entry
    const newEntry = {
      id: Date.now(),
      officerId: auth.user.uid,
      officerName: auth.user.name,
      date: new Date().toLocaleString(),
      status: "pending", // VERY IMPORTANT

      ...form,
      files,
    };

    // Save new entry
    const updated = [...entries, newEntry];
    localStorage.setItem("sp_entries", JSON.stringify(updated));

    alert("Entry submitted successfully and sent for approval!");

    // Reset form
    setForm({
      district: "",
      period: "",
      nbwPending: 0,
      nbwExecuted: 0,
      nbwDisposed: 0,
      firearmsCases: 0,
      firearmsArrested: 0,
      ipcConvictions: 0,
      sllConvictions: 0,
      drunkenConvictions: 0,
      detections: "",
    });
    setFiles([]);
  }

  return (
    <div className="p-10 bg-[#fdf8ee] min-h-screen">

      <h1 className="text-3xl font-bold text-[#9A1B1B]">Good Work Data Entry</h1>
      <p className="text-gray-600 mt-2">
        Enter data for the CCTNS "Good Work Done" module.
      </p>

      <div className="h-[1px] bg-gray-300 my-6" />

      <form onSubmit={submit} className="space-y-12">

        {/* PART 1 – SPECIAL DRIVES */}
        <div>
          <h2 className="text-2xl font-semibold text-[#9A1B1B]">Part 1: Special Drives</h2>
          <div className="h-[2px] bg-gray-300 mt-2 mb-6" />

          <div className="grid grid-cols-2 gap-6">
            <InputBoxSelect
              label="District"
              field="district"
              value={form.district}
              update={updateField}
              options={["Ganjam", "Khordha", "Cuttack"]}
            />

            <InputBoxDate
              label="Reporting Period"
              field="period"
              value={form.period}
              update={updateField}
            />
          </div>

          <h3 className="text-lg font-semibold mt-10 mb-2">Warrant Drive</h3>
          <div className="grid grid-cols-3 gap-6">
            <InputBox label="NBW Pending (Start)" field="nbwPending" form={form} update={updateField} />
            <InputBox label="NBW Executed" field="nbwExecuted" form={form} update={updateField} />
            <InputBox label="NBW Otherwise Disposed" field="nbwDisposed" form={form} update={updateField} />
          </div>

          <h3 className="text-lg font-semibold mt-10 mb-2">Drive Against Illegal Firearms</h3>
          <div className="grid grid-cols-2 gap-6">
            <InputBox label="Cases Registered" field="firearmsCases" form={form} update={updateField} />
            <InputBox label="Persons Arrested" field="firearmsArrested" form={form} update={updateField} />
          </div>
        </div>

        {/* PART 2 – CONVICTIONS */}
        <div>
          <h2 className="text-2xl font-semibold text-[#9A1B1B]">Part 2: Convictions</h2>
          <div className="h-[2px] bg-gray-300 mt-2 mb-6" />

          <div className="grid grid-cols-3 gap-6">
            <InputBox label="IPC/BNS Convictions" field="ipcConvictions" form={form} update={updateField} />
            <InputBox label="SLL Convictions" field="sllConvictions" form={form} update={updateField} />
            <InputBox label="Drunken Driving Convictions" field="drunkenConvictions" form={form} update={updateField} />
          </div>
        </div>

        {/* PART 3 – DETECTIONS */}
        <div>
          <h2 className="text-2xl font-semibold text-[#9A1B1B]">Part 3: Important Detections</h2>
          <div className="h-[2px] bg-gray-300 mt-2 mb-6" />

          <textarea
            className="w-full p-4 border rounded-xl bg-white shadow-sm h-40"
            placeholder="Describe important detections..."
            value={form.detections}
            onChange={(e) => updateField("detections", e.target.value)}
          />
        </div>

        {/* PART 4 – FILE UPLOAD */}
        <div>
          <h2 className="text-2xl font-semibold text-[#9A1B1B]">Upload Supporting Documents</h2>

          <div className="mt-6 border-2 border-dashed border-[#6a7bff] rounded-2xl bg-[#f4f7ff] p-12 flex flex-col items-center text-center">
            <label className="cursor-pointer">
              <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#5aa8ff] to-[#1da1f2] text-white text-lg font-semibold shadow-md hover:scale-105 transition">
                Select Files
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {files.length > 0 && (
              <div className="mt-6 text-gray-700 text-sm">
                <p className="font-semibold">Uploaded Files:</p>
                {files.map((f, i) => (
                  <p key={i}>• {f.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="w-full py-4 mt-6 bg-gradient-to-r from-green-400 to-teal-400 text-white text-lg font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition">
          <CheckCircle size={20} />
          Submit Data & Earn Points
        </button>
      </form>
    </div>
  );
}

/* INPUT COMPONENTS */

function InputBox({ label, field, form, update }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input
        type="number"
        className="p-3 border rounded-xl bg-white shadow-sm"
        value={form[field]}
        onChange={(e) => update(field, e.target.value)}
      />
    </div>
  );
}

function InputBoxDate({ label, field, value, update }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input
        type="date"
        className="p-3 border rounded-xl bg-white shadow-sm"
        value={value}
        onChange={(e) => update(field, e.target.value)}
      />
    </div>
  );
}

function InputBoxSelect({ label, field, value, update, options }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <select
        className="p-3 border rounded-xl bg-white shadow-sm"
        value={value}
        onChange={(e) => update(field, e.target.value)}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
