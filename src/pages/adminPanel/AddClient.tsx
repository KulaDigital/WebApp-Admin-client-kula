import { useEffect, useState } from "react";
import Button from "../../components/Button";

type Plan = "starter" | "professional" | "enterprise";
type Billing = "monthly" | "yearly";
type Position = "bottom-right" | "bottom-left";

export default function AddClient({ close }) {
    const [selectedPlan, setSelectedPlan] = useState<Plan>("professional");
    const [billing, setBilling] = useState<Billing>("monthly");
    const [position, setPosition] = useState<Position>("bottom-right");
    const [trialEnabled, setTrialEnabled] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [mockupOpen, setMockupOpen] = useState(false);

    const [form, setForm] = useState({
        companyName: "",
        website: "",
        industry: "",
        contactName: "",
        email: "",
        phone: "",
        status: "trial",
        greetoName: "Greeto Assistant",
        color: "#635BFF",
        message: "Hi! 👋 I'm Greeto, your AI assistant. How can I help you today?",
    });

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 14);

        setStartDate(today.toISOString().split("T")[0]);
        setEndDate(end.toISOString().split("T")[0]);
    }, []);

    function submitForm() {
        const payload = {
            ...form,
            plan: selectedPlan,
            billing,
            position,
            trialEnabled,
            startDate,
            endDate,
        };
        console.log(payload);
        alert("Check console for payload");
    }

    return (
        <div className="flex flex-col gap-5">
            {/* HEADER */}
            <div>
                <h1>Add New Client</h1>
            </div>

            {/* COMPANY */}
            <Card title="Company Information">
                <Input
                    label="Company Name"
                    required
                    value={form.companyName}
                    onChange={(v) => setForm({ ...form, companyName: v })}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label="Website"
                        required
                        value={form.website}
                        onChange={(v) => setForm({ ...form, website: v })}
                    />

                    <Select
                        label="Industry"
                        value={form.industry}
                        onChange={(v) => setForm({ ...form, industry: v })}
                        options={[
                            "Real Estate",
                            "Education",
                            "Healthcare",
                            "E-commerce",
                            "SaaS",
                        ]}
                    />
                </div>
            </Card>

            {/* CONTACT */}
            <Card title="Primary Contact">
                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label="Contact Name"
                        required
                        value={form.contactName}
                        onChange={(v) => setForm({ ...form, contactName: v })}
                    />

                    <Input
                        label="Email"
                        required
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                    />
                </div>

                <Input
                    label="Phone"
                    required
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                />
            </Card>

            {/* PLAN */}
            <Card title="Plan & Billing">
                <div className="grid md:grid-cols-3 gap-4">
                    {["starter", "professional", "enterprise"].map((p) => (
                        <PlanCard
                            key={p}
                            active={selectedPlan === p}
                            name={p}
                            onClick={() => setSelectedPlan(p as Plan)}
                        />
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <Radio
                        label="Monthly"
                        active={billing === "monthly"}
                        onClick={() => setBilling("monthly")}
                    />
                    <Radio
                        label="Yearly (Save 20%)"
                        active={billing === "yearly"}
                        onClick={() => setBilling("yearly")}
                    />
                </div>

                <div
                    className="mt-6 flex items-start gap-3 p-4 bg-indigo-50 rounded-lg cursor-pointer"
                    onClick={() => setTrialEnabled(!trialEnabled)}
                >
                    <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${trialEnabled ? "bg-indigo-600 text-white" : ""
                            }`}
                    >
                        ✓
                    </div>
                    <div>
                        <p className="font-medium">Enable 14-day trial</p>
                        <p className="text-sm text-gray-500">
                            Client can test Greeto free
                        </p>
                    </div>
                </div>
            </Card>

            {/* WIDGET */}
            <Card title="Widget Configuration">
                <div className="grid md:grid-cols-2 gap-4">
                    <Position
                        name="Bottom Right"
                        active={position === "bottom-right"}
                        onClick={() => setPosition("bottom-right")}
                    />
                    <Position
                        name="Bottom Left"
                        active={position === "bottom-left"}
                        onClick={() => setPosition("bottom-left")}
                    />
                </div>

                <Input
                    label="Greeto Name"
                    value={form.greetoName}
                    onChange={(v) => setForm({ ...form, greetoName: v })}
                />

                <Input
                    label="Primary Color"
                    value={form.color}
                    onChange={(v) => setForm({ ...form, color: v })}
                />

                <textarea
                    className="w-full border rounded-lg p-3 mt-4"
                    value={form.message}
                    onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                    }
                />

                <button
                    onClick={() => setPreviewOpen(true)}
                    className="mt-4 border px-4 py-2 rounded text-indigo-600 hover:bg-indigo-50"
                >
                    👁 Preview Widget
                </button>
            </Card>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 sticky bottom-0 bg-white">
                <Button label={'Cancel'} onClick={close} />
                <Button
                    onClick={submitForm}
                    label={'Add Client'}
                />
            </div>

            {/* PREVIEW */}
            {previewOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={() => setPreviewOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl p-6 w-[400px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-bold mb-4">Widget Preview</h3>

                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer"
                            style={{ background: form.color }}
                            onClick={() => setMockupOpen(!mockupOpen)}
                        >
                            💬
                        </div>

                        {mockupOpen && (
                            <div className="mt-4 border rounded-xl">
                                <div
                                    className="p-3 text-white rounded-t-xl"
                                    style={{ background: form.color }}
                                >
                                    {form.greetoName}
                                </div>
                                <div className="p-3">
                                    {form.message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ----------------- SMALL COMPONENTS ---------------- */

function Card({
    title,
    children,
}: {
    title: string;
    children: any;
}) {
    return (
        <div className="bg-white border rounded-xl p-8 space-y-6">
            <h2 className="font-semibold text-lg">{title}</h2>
            {children}
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
    required,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label} {required && "*"}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg p-3"
            />
        </div>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg p-3"
            >
                <option value="">Select</option>
                {options.map((o: string) => (
                    <option key={o}>{o}</option>
                ))}
            </select>
        </div>
    );
}

function PlanCard({
    name,
    active,
    onClick,
}: any) {
    return (
        <div
            onClick={onClick}
            className={`border rounded-xl p-6 cursor-pointer ${active
                ? "border-indigo-600 bg-indigo-50"
                : "hover:border-indigo-400"
                }`}
        >
            <h3 className="font-semibold capitalize">{name}</h3>
        </div>
    );
}

function Radio({ label, active, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`border p-3 rounded-lg cursor-pointer flex gap-2 ${active ? "border-indigo-600" : ""
                }`}
        >
            <div
                className={`w-4 h-4 rounded-full border ${active ? "bg-indigo-600" : ""
                    }`}
            />
            {label}
        </div>
    );
}

function Position({
    name,
    active,
    onClick,
}: any) {
    return (
        <div
            onClick={onClick}
            className={`border p-6 rounded-xl text-center cursor-pointer ${active
                ? "border-indigo-600 bg-indigo-50"
                : ""
                }`}
        >
            {name}
        </div>
    );
}
